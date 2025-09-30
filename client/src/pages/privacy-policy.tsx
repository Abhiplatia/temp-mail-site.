import { Link } from 'wouter';
import { Home, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 sticky top-0 z-50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity" data-testid="link-home">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </a>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8" data-testid="heading-privacy">Privacy Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg">
            <strong>Effective Date:</strong> January 1, 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to QuickTempMail.live ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our temporary email service.
            </p>
            <p>
              By using QuickTempMail.live, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.1 Temporary Email Data</h3>
            <p>
              When you generate a temporary email address through our service, we temporarily process the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The temporary email address generated for your session</li>
              <li>Emails received at the temporary address during the active session</li>
              <li>Metadata associated with received emails (sender, subject, timestamp)</li>
            </ul>
            <p className="mt-3">
              <strong>Important:</strong> All temporary email data is automatically deleted after 10 minutes or when you close your browser session. We do not store any email content beyond this period.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.2 Analytics and Usage Data</h3>
            <p>
              To improve our service, we collect anonymous usage statistics through Google Analytics:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser type and version</li>
              <li>Device information (desktop, mobile, tablet)</li>
              <li>Approximate geographic location (country/city level)</li>
              <li>Pages visited and time spent on the service</li>
              <li>Actions taken (email generation, refresh, etc.)</li>
            </ul>
            <p className="mt-3">
              This data is aggregated and anonymized. It cannot be used to identify individual users.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.3 Technical Data</h3>
            <p>
              Our servers automatically collect certain technical information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address (for rate limiting and security purposes)</li>
              <li>Browser user agent</li>
              <li>Referral source (how you arrived at our website)</li>
              <li>Access times and dates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. How We Use Your Information</h2>
            <p>
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Delivery:</strong> To provide and maintain the temporary email functionality</li>
              <li><strong>Security:</strong> To detect and prevent abuse, spam, and fraudulent activity</li>
              <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our service</li>
              <li><strong>Rate Limiting:</strong> To prevent service abuse through excessive requests</li>
              <li><strong>Technical Support:</strong> To troubleshoot technical issues when they occur</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Data Retention and Deletion</h2>
            <p>
              We take data minimization seriously:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Temporary Emails:</strong> Automatically deleted after 10 minutes</li>
              <li><strong>Email Content:</strong> Deleted immediately when the session expires</li>
              <li><strong>Analytics Data:</strong> Retained in aggregated form for up to 26 months (Google Analytics default)</li>
              <li><strong>Server Logs:</strong> Automatically rotated and deleted after 30 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Third-Party Services</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">5.1 Mail.tm API</h3>
            <p>
              We use Mail.tm's public API to provide temporary email functionality. When you use our service, you are also subject to Mail.tm's privacy policy and terms of service. Mail.tm is a third-party service provider responsible for email delivery infrastructure.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">5.2 Google Analytics</h3>
            <p>
              We use Google Analytics to understand how users interact with our service. Google Analytics uses cookies and similar technologies to collect and analyze information about service usage. This information is shared with Google and may be combined with other data Google has collected. For more information, please review Google's Privacy Policy.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">5.3 Hosting Provider</h3>
            <p>
              Our service is hosted on secure servers. While we implement appropriate security measures, your data passes through our hosting provider's infrastructure. We select hosting providers that maintain appropriate security certifications and compliance standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Cookies and Tracking</h2>
            <p>
              We use the following types of cookies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for basic service functionality (session management)</li>
              <li><strong>Analytics Cookies:</strong> Google Analytics cookies to understand usage patterns</li>
              <li><strong>Preference Cookies:</strong> To remember your theme selection (dark/light mode)</li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. However, disabling certain cookies may limit service functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>HTTPS encryption for all data transmission</li>
              <li>Secure server infrastructure with regular security updates</li>
              <li>Rate limiting to prevent abuse and DDoS attacks</li>
              <li>Regular security audits and monitoring</li>
              <li>Automatic data deletion after session expiration</li>
            </ul>
            <p className="mt-3">
              While we strive to use commercially acceptable means to protect your information, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request access to the data we hold about you</li>
              <li><strong>Deletion:</strong> Request deletion of your data (note: temporary emails auto-delete)</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Opt-out:</strong> Opt-out of analytics tracking using browser settings or extensions</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, please contact us using the information provided in the Contact section.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. Children's Privacy</h2>
            <p>
              Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. By using our service, you consent to the transfer of your information to countries outside of your country of residence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">11. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please visit our <Link href="/contact"><a className="text-primary hover:underline">Contact Us</a></Link> page.
            </p>
          </section>

          <div className="bg-card border border-border rounded-lg p-6 mt-8">
            <p className="text-sm">
              <strong>Summary:</strong> QuickTempMail.live is designed with privacy in mind. We automatically delete all temporary email data after 10 minutes, use minimal tracking for service improvement, and never sell your data to third parties. Your temporary emails are truly temporary.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 QuickTempMail.live - Free Temporary Email Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}