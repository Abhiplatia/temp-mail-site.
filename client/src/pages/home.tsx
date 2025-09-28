import { useState, useEffect } from 'react';
import { Mail, Shield, Clock, Zap, CheckCircle } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { mailAPI, Domain } from '@/lib/mail-api';
import { useToast } from '@/hooks/use-toast';
import EmailDisplay from '@/components/email-display';
import Inbox from '@/components/inbox';
import { ThemeToggle } from '@/components/theme-toggle';
import { DomainSelector } from '@/components/domain-selector';
import { trackEvent } from '@/lib/analytics';

export default function Home() {
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [lastGenerationTime, setLastGenerationTime] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [lastAttemptTime, setLastAttemptTime] = useState<number>(0);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [location] = useLocation();
  const { toast } = useToast();

  const generateEmail = async (domain?: Domain, bypassRateLimit?: boolean) => {
    // Prevent duplicate calls while already processing
    if (loading || isRetrying) {
      return;
    }
    
    // If we're blocked due to persistent rate limiting, don't allow any attempts
    if (isBlocked && !bypassRateLimit) {
      toast({
        title: "Service temporarily blocked",
        description: "Please wait several minutes before trying again. The email service needs time to reset.",
        variant: "destructive",
      });
      return;
    }
    
    const now = Date.now();
    const timeSinceLastAttempt = now - lastAttemptTime;
    
    // Aggressive cooldown to prevent hitting Mail.tm rate limits (30 seconds minimum between attempts)
    if (!bypassRateLimit && lastAttemptTime > 0 && timeSinceLastAttempt < 30000) {
      const remainingCooldown = Math.ceil((30000 - timeSinceLastAttempt) / 1000);
      toast({
        title: "Please wait",
        description: `Please wait ${remainingCooldown} more seconds before generating a new email.`,
        variant: "default",
      });
      return;
    }
    
    const timeSinceLastGeneration = now - lastGenerationTime;
    
    // Smart rate limiting: only prevent rapid spam clicking, not legitimate navigation
    // Allow bypassing rate limit for legitimate navigation (e.g., from about page)
    if (!bypassRateLimit && lastGenerationTime > 0) {
      // Very short interval for spam prevention (500ms) instead of 3 seconds
      const spamInterval = 500;
      
      // Count rapid clicks with proper state handling
      if (timeSinceLastGeneration < spamInterval) {
        setClickCount(prev => {
          const newCount = prev + 1;
          // Check threshold with updated value
          if (newCount >= 3) {
            toast({
              title: "Slow down",
              description: "Please wait a moment between email generations.",
              variant: "default",
            });
          }
          return newCount;
        });
        
        // Return early if already at threshold
        if (clickCount >= 2) { // Since we're about to increment
          return;
        }
      } else {
        // Reset click count after normal interval
        setClickCount(0);
      }
    }

    try {
      setLoading(true);
      setError(null);
      setLastGenerationTime(now);
      setLastAttemptTime(now); // Track attempt time for cooldown
      setClickCount(0); // Reset click count on successful generation

      // Track email generation attempt
      trackEvent('email_generation', 'user_action', 'generate_email');

      // Use current domains or fetch them if not available
      let availableDomains = domains;
      if (availableDomains.length === 0) {
        availableDomains = await mailAPI.fetchDomains();
        setDomains(availableDomains);
      }

      if (availableDomains.length === 0) {
        throw new Error('No email domains are currently available');
      }

      // Generate email with selected domain or random
      const domainToUse = domain || (selectedDomain === null ? undefined : selectedDomain);
      const { email, password } = mailAPI.generateRandomEmail(availableDomains, domainToUse);

      // Create account
      await mailAPI.createAccount(email, password);

      // Get authentication token
      await mailAPI.getAuthToken(email, password);

      setCurrentEmail(email);
      setRetryCount(0); // Reset retry count on success
      
      // Track successful email generation
      trackEvent('email_generated', 'success', 'email_created');
      
      toast({
        title: "Email ready!",
        description: `Your temporary email ${email} is active for 10 minutes.`,
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate email';
      
      // Check if it's a rate limiting error (429 or contains "rate" keywords)
      const isRateLimit = errorMessage.includes('429') || errorMessage.toLowerCase().includes('rate') || errorMessage.toLowerCase().includes('limit');
      
      if (isRateLimit) {
        // Activate blocking mechanism for persistent rate limiting
        const currentRetryCount = retryCount + 1;
        setRetryCount(currentRetryCount);
        
        // Block further attempts after 2 rate limit errors
        if (currentRetryCount >= 2) {
          setIsBlocked(true);
          // Unblock after 5 minutes
          setTimeout(() => {
            setIsBlocked(false);
            setRetryCount(0);
          }, 300000); // 5 minutes
          
          toast({
            title: "Service blocked temporarily",
            description: "Too many rate limit errors. Please wait 5 minutes before trying again.",
            variant: "destructive",
          });
          trackEvent('email_generation', 'rate_limit', 'service_blocked');
        } else {
          toast({
            title: "Service busy",
            description: "The email service is experiencing high traffic. Please wait a moment and try again manually.",
            variant: "default",
          });
          trackEvent('email_generation', 'rate_limit', `attempt_${currentRetryCount}`);
        }
        
        // NO AUTO-RETRY for rate limiting - user must manually retry
        setIsRetrying(false);
        setRetryCount(currentRetryCount);
      } else {
        // Other errors - don't block but show error
        setRetryCount(0);
        setIsRetrying(false);
        setError(errorMessage);
        toast({
          title: "Generation failed",
          description: errorMessage,
          variant: "destructive",
        });
        trackEvent('email_generation', 'error', errorMessage);
      }
    } finally {
      // Only set loading to false if not retrying
      if (!isRetrying) {
        setLoading(false);
      }
    }
  };

  const initializeEmail = async () => {
    try {
      // Fetch available domains first
      const availableDomains = await mailAPI.fetchDomains();
      setDomains(availableDomains);
      
      // Check if user came from about page - bypass rate limiting for smooth UX
      const urlParams = new URLSearchParams(window.location.search);
      const fromAbout = urlParams.get('from') === 'about';
      
      // Generate initial email with appropriate rate limiting
      await generateEmail(undefined, fromAbout);
      
      // Clean up URL parameter after use
      if (fromAbout) {
        window.history.replaceState({}, '', '/');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize email service';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleExtendTime = () => {
    trackEvent('extend_time', 'user_action', 'extend_session');
    setRefreshTrigger(prev => prev + 1);
  };

  const handleDomainSelect = (domain: Domain | null) => {
    setSelectedDomain(domain);
    trackEvent('domain_selection', 'user_action', domain?.domain || 'random');
  };

  const handleGenerateNew = (bypassRateLimit?: boolean) => {
    generateEmail(undefined, bypassRateLimit);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    initializeEmail();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 email-gradient rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">
                QuickTempMail<span className="text-primary">.live</span>
              </h1>
            </div>
            <div className="text-sm text-muted-foreground hidden sm:block">
              Free • Anonymous • No Signup
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12" data-testid="loading-state">
            <div className="inline-flex items-center space-x-2 text-muted-foreground">
              <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full"></div>
              <span className="loading-dots">Generating your temporary email</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12" data-testid="error-state">
            <div className="text-center text-destructive">
              <Mail className="w-8 h-8 mx-auto mb-2" />
              <p className="mb-4">{error}</p>
              <button 
                onClick={handleRefresh}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                data-testid="button-refresh"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Email Display */}
        {currentEmail && !loading && (
          <>
            <EmailDisplay 
              email={currentEmail} 
              onExtendTime={handleExtendTime}
              onGenerateNew={handleGenerateNew}
              isLoading={loading || isRetrying}
            />


            {/* Inbox Section */}
            <Inbox refreshTrigger={refreshTrigger} />

            {/* Educational Content Section */}
            <div className="mt-12 space-y-12">
              {/* What is Disposable Email Section */}
              <section>
                <div className="text-center mb-8">
                  <h2 
                    className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
                    data-testid="heading-main-title"
                  >
                    What is Disposable Temporary E-mail?
                  </h2>
                  <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Disposable email is a free email service that allows you to receive emails at a temporary address that 
                    automatically self-destructs after a certain time period. It's also known by names like: tempmail, 10minutemail, 
                    10minmail, throwaway email, fake-mail, fake email generator, burner mail or trash-mail. Many forums, 
                    Wi-Fi hotspots, websites and blogs require visitors to register before they can view content, post comments 
                    or download files. QuickTempMail.live is the most advanced temporary email service that helps you avoid 
                    spam and protect your privacy.
                  </p>
                </div>
              </section>

              {/* Tech Behind Section */}
              <section>
                <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
                  <h3 
                    className="text-xl font-bold text-foreground mb-6 flex items-center"
                    data-testid="heading-tech-behind"
                  >
                    <Shield className="w-5 h-5 text-primary mr-3" />
                    The Tech behind Disposable Email Addresses
                  </h3>
                  
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Everyone uses an email address daily for everything from work communications, connecting with business prospects, reaching out to friends and 
                      colleagues. Nearly 99% of all apps and services we sign up for today require an email address, including most 
                      shopping loyalty programs, contests, and promotional offers.
                    </p>
                    
                    <p>
                      While we all need email addresses, receiving tons of spam emails daily is frustrating. Furthermore, it's common for companies to 
                      have their databases compromised, leaving your personal email address at risk and more likely to end up on spam lists. Since nothing done online is 100% private, 
                      you need to protect your email identity - and this is best done using disposable email addresses.
                    </p>
                    
                    <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">
                      So, what Is A Disposable Email Address?
                    </h4>
                    
                    <p>
                      Disposable email addresses have become increasingly popular as users seek to protect their privacy online. More people are using temporary email services 
                      to maintain anonymity when signing up for services or websites.
                    </p>
                    
                    <p>
                      A Disposable Email Address (DEA) is a temporary email address that allows users to receive emails without revealing their real email identity. 
                      This service helps create valid email addresses that meet registration requirements for websites and services while keeping your true 
                      identity private.
                    </p>
                    
                    <p>
                      If a disposable email address is compromised or used in connection with unwanted communications, you can simply abandon it without affecting your 
                      other email accounts. With temporary mail services like QuickTempMail.live, you can receive emails at these temporary addresses for a 
                      specified time period. The temporary email address is simply a throwaway email that automatically expires and self-destructs.
                    </p>
                  </div>
                </div>
              </section>

              {/* Why Need Section */}
              <section>
                <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
                  <h3 
                    className="text-xl font-bold text-foreground mb-6 flex items-center"
                    data-testid="heading-why-need"
                  >
                    <Zap className="w-5 h-5 text-primary mr-3" />
                    Why would you need a disposable email address?
                  </h3>
                  
                  <div className="space-y-4 text-muted-foreground mb-6">
                    <p>
                      Many online services require email registration before you can access their content or features. While this is standard practice, 
                      it often results in unwanted promotional emails and potential privacy concerns.
                    </p>
                    
                    <p>
                      Online and offline retailers often request your email address to provide you with special offers and discounts. However, this frequently results in an unwanted flood of spam 
                      promotional emails that clutter your inbox. A temporary email address makes it easy to avoid these irritating messages.
                    </p>
                    
                    <p>
                      While some may associate temporary email addresses with questionable activities, there are many legitimate and practical reasons to use 
                      disposable email services for privacy protection.
                    </p>
                    
                    <p className="font-medium text-foreground">
                      If you are looking for legitimate reasons to use a disposable email address here's a few:
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Sign-Up For Store Loyalty Cards:</h4>
                        <p className="text-muted-foreground text-sm">
                          If you don't want to receive promotional emails from stores advertising new products, use a disposable email address instead of your personal email address 
                          to avoid spam. If the store's database gets compromised, your real email address remains protected.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Test Your Applications:</h4>
                        <p className="text-muted-foreground text-sm">
                          When developing web applications, you can use multiple disposable email addresses to create test accounts and thoroughly test your app's functionality 
                          before launch, rather than relying on external testers or using your personal email multiple times.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Create Multiple Accounts:</h4>
                        <p className="text-muted-foreground text-sm">
                          When you need to create multiple accounts for legitimate business purposes, such as managing different social media profiles or testing services, 
                          disposable email addresses from QuickTempMail.live provide a clean solution without cluttering your primary inbox.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Eliminate Spam:</h4>
                        <p className="text-muted-foreground text-sm">
                          Disposable email addresses are highly effective tools against spam, especially for users who frequently fill out web forms, participate in forums, and join discussion groups. 
                          You can reduce spam to an absolute minimum by using temporary email addresses.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* How to Choose Section */}
              <section>
                <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
                  <h3 
                    className="text-xl font-bold text-foreground mb-6 flex items-center"
                    data-testid="heading-how-choose"
                  >
                    <Clock className="w-5 h-5 text-primary mr-3" />
                    How to Choose a Disposable Email?
                  </h3>
                  
                  <p className="text-muted-foreground mb-6">The best temporary email provider should:</p>
                  
                  <div className="grid gap-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Allow users to create temporary email addresses at the click of a button.</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Require no registration or personal information from users.</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">The email address should remain anonymous.</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Offer more than one email address (as many as you may want).</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Offer temporary email storage (inbox available during the session).</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Provide a straightforward and functional design for easy email access.</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Generate random email addresses while allowing user preferences.</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    Thus stay spam free and save time with QuickTempMail.live your favorite email service.
                  </p>
                </div>
              </section>

              {/* How to Use Section */}
              <section>
                <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
                  <h3 
                    className="text-xl font-bold text-foreground mb-6"
                    data-testid="heading-how-use"
                  >
                    How to Use QuickTempMail.live?
                  </h3>
                  
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Some users try to create disposable email addresses by setting up new accounts with providers like Gmail, but this approach comes with 
                      many challenges including having to manage multiple email accounts and remember different login credentials.
                    </p>
                    
                    <p>
                      QuickTempMail.live offers a much simpler solution - you can use multiple temporary email addresses while managing everything from one convenient interface, 
                      without creating permanent accounts.
                    </p>
                    
                    <p>
                      The benefit of using QuickTempMail.live is that you can receive emails at temporary addresses without compromising your real email account. 
                      If a temporary address receives unwanted messages, you can simply let it expire, while important communications can be managed separately through 
                      your primary email address.
                    </p>
                  </div>
                </div>
              </section>
            </div>

          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">© 2025 QuickTempMail.live - Free Temporary Email Service</p>
            <p className="space-x-4">
              <span>Privacy-focused</span>
              <span>•</span>
              <span>No data stored</span>
              <span>•</span>
              <span>Open source friendly</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
