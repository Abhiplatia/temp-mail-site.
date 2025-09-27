import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { mailAPI, Domain } from '@/lib/mail-api';
import { useToast } from '@/hooks/use-toast';
import EmailDisplay from '@/components/email-display';
import Inbox from '@/components/inbox';
import AdBanner from '@/components/ad-banner';
import { ThemeToggle } from '@/components/theme-toggle';
import { DomainSelector } from '@/components/domain-selector';
import { trackEvent } from '@/lib/analytics';

export default function Home() {
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [lastGenerationTime, setLastGenerationTime] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [location] = useLocation();
  const { toast } = useToast();

  const generateEmail = async (domain?: Domain, bypassRateLimit?: boolean) => {
    // Prevent duplicate calls while already processing
    if (loading || isRetrying) {
      return;
    }
    const now = Date.now();
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
      
      // Special handling for rate limiting
      if (errorMessage.includes('429')) {
        const currentRetryCount = retryCount + 1;
        setRetryCount(currentRetryCount);
        
        // Limit retries to prevent infinite loops
        if (currentRetryCount <= 3) {
          // Fixed backoff delays: 2s, 5s, 10s as specified
          const delays = [2000, 5000, 10000];
          const delay = delays[currentRetryCount - 1] || 10000;
          
          setIsRetrying(true);
          toast({
            title: "Service busy",
            description: `High traffic detected. Retrying in ${delay/1000} seconds... (${currentRetryCount}/3)`,
            variant: "default",
          });
          trackEvent('email_generation', 'rate_limit', `retry_${currentRetryCount}`);
          
          // Auto-retry with proper backoff
          setTimeout(() => {
            setIsRetrying(false);
            generateEmail(domain, true); // Bypass rate limit for retry
          }, delay);
          return; // Keep loading state active during retry
        } else {
          // Max retries reached - show helpful message and allow manual retry
          setRetryCount(0); // Reset for next manual attempt
          setIsRetrying(false);
          setError(null); // Don't set permanent error
          toast({
            title: "Service temporarily unavailable",
            description: "Please try again in a few minutes. The service is experiencing high traffic.",
            variant: "default",
          });
          trackEvent('email_generation', 'rate_limit', 'max_retries_reached');
        }
      } else {
        setError(errorMessage);
        setRetryCount(0); // Reset retry count on other errors
        setIsRetrying(false);
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
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground hidden sm:block">
                Free • Anonymous • No Signup
              </div>
              <Link 
                href="/about" 
                className="text-sm text-primary hover:text-primary/80 transition-colors"
                data-testid="link-about"
              >
                Learn More
              </Link>
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

            {/* Ad Placement */}
            <AdBanner 
              format="horizontal" 
              className="mb-8"
              slot="1234567890"
            />

            {/* Inbox Section */}
            <Inbox refreshTrigger={refreshTrigger} />

            {/* Additional Ad */}
            <AdBanner 
              format="rectangle" 
              className="mt-8"
              slot="0987654321"
            />
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
