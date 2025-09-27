import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
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
  const { toast } = useToast();

  const generateEmail = async (domain?: Domain) => {
    // Rate limiting: prevent rapid successive calls
    const now = Date.now();
    const timeSinceLastGeneration = now - lastGenerationTime;
    const minInterval = 3000; // 3 seconds minimum between generations

    if (timeSinceLastGeneration < minInterval && lastGenerationTime > 0) {
      const waitTime = Math.ceil((minInterval - timeSinceLastGeneration) / 1000);
      toast({
        title: "Please wait",
        description: `Wait ${waitTime} more seconds before generating a new email.`,
        variant: "default",
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setLastGenerationTime(now);

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
        const rateLimitMessage = 'Rate limit reached. Please wait a moment before generating a new email.';
        setError(rateLimitMessage);
        toast({
          title: "Rate limit reached",
          description: "The email service is temporarily unavailable. Please wait a few minutes and try again.",
          variant: "destructive",
        });
        trackEvent('email_generation', 'rate_limit', 'too_many_requests');
      } else {
        setError(errorMessage);
        toast({
          title: "Generation failed",
          description: errorMessage,
          variant: "destructive",
        });
        trackEvent('email_generation', 'error', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const initializeEmail = async () => {
    try {
      // Fetch available domains first
      const availableDomains = await mailAPI.fetchDomains();
      setDomains(availableDomains);
      
      // Generate initial email
      await generateEmail();
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

  const handleGenerateNew = () => {
    generateEmail();
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
            />

            {/* Generate New Email Button */}
            <div className="text-center mb-6">
              <button 
                onClick={handleGenerateNew}
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/80 transition-colors font-medium"
                data-testid="button-generate-fresh-mail"
              >
                Generate Fresh New Mail
              </button>
            </div>

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
