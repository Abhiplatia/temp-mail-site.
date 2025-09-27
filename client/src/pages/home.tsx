import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { mailAPI } from '@/lib/mail-api';
import { useToast } from '@/hooks/use-toast';
import EmailDisplay from '@/components/email-display';
import Inbox from '@/components/inbox';
import AdBanner from '@/components/ad-banner';
import { trackEvent } from '@/lib/analytics';

export default function Home() {
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { toast } = useToast();

  const initializeEmail = async () => {
    try {
      setLoading(true);
      setError(null);

      // Track email generation attempt
      trackEvent('email_generation', 'user_action', 'generate_email');

      // Fetch available domains
      const domains = await mailAPI.fetchDomains();
      if (domains.length === 0) {
        throw new Error('No email domains are currently available');
      }

      // Generate random email and password
      const { email, password } = mailAPI.generateRandomEmail(domains);

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
      setError(errorMessage);
      
      // Track email generation failure
      trackEvent('email_generation', 'error', errorMessage);
      
      toast({
        title: "Generation failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExtendTime = () => {
    trackEvent('extend_time', 'user_action', 'extend_session');
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
