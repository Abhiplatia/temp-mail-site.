import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
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
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8" data-testid="heading-terms">Terms & Conditions / Disclaimer</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg">
            <strong>Effective Date:</strong> January 1, 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using QuickTempMail.live ("Service," "we," "our," or "us"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Service.
            </p>
            <p>
              These terms constitute a legally binding agreement between you and QuickTempMail.live. We reserve the right to modify these terms at any time, and your continued use of the Service following any changes constitutes acceptance of those changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Description of Service</h2>
            <p>
              QuickTempMail.live provides a free temporary email service that allows users to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Generate disposable email addresses that automatically expire after 10 minutes</li>
              <li>Receive emails at temporary addresses during the active session</li>
              <li>View and manage received emails through a web interface</li>
              <li>Extend email session duration by an additional 10 minutes (once per session)</li>
            </ul>
            <p className="mt-3">
              The Service is provided "as is" without warranties of any kind. We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Acceptable Use Policy</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.1 Permitted Uses</h3>
            <p>
              You may use our Service for legitimate purposes, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Testing website registration processes</li>
              <li>Protecting your primary email from spam</li>
              <li>Receiving verification codes and confirmations</li>
              <li>Temporary communications that don't require a permanent email address</li>
              <li>Privacy protection for one-time registrations</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.2 Prohibited Uses</h3>
            <p>
              You agree NOT to use our Service for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Illegal activities or purposes that violate local, state, national, or international law</li>
              <li>Sending spam, phishing attempts, or malicious content</li>
              <li>Harassing, threatening, or abusing others</li>
              <li>Fraud, scams, or deceptive practices</li>
              <li>Creating multiple accounts to bypass rate limits or abuse the Service</li>
              <li>Automated scraping or excessive API requests that burden our infrastructure</li>
              <li>Attempting to hack, compromise, or gain unauthorized access to our systems</li>
              <li>Distributing malware, viruses, or other harmful code</li>
              <li>Circumventing security measures or authentication systems</li>
              <li>Violating the rights of others, including intellectual property rights</li>
            </ul>
            <p className="mt-3">
              Violation of this Acceptable Use Policy may result in immediate termination of access to the Service and potential legal action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Service Limitations</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4.1 Session Duration</h3>
            <p>
              Temporary email addresses are active for 10 minutes from the time of generation. Users may extend the session by an additional 10 minutes once. After expiration, all email data is permanently deleted and cannot be recovered.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4.2 Rate Limiting</h3>
            <p>
              To prevent abuse and ensure service availability for all users, we implement rate limiting:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maximum of 30-second cooldown between email generation requests</li>
              <li>Service blocking after repeated failed attempts</li>
              <li>IP-based restrictions for excessive usage</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4.3 Email Delivery</h3>
            <p>
              We rely on third-party email infrastructure (Mail.tm). We cannot guarantee:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Delivery of all emails sent to temporary addresses</li>
              <li>Delivery speed or timing of emails</li>
              <li>Acceptance of temporary email addresses by all websites and services</li>
              <li>Availability of specific email domains</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4.4 Service Availability</h3>
            <p>
              We strive for high availability but do not guarantee uninterrupted service. The Service may be temporarily unavailable due to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Scheduled maintenance</li>
              <li>Technical issues or server problems</li>
              <li>Third-party service provider outages</li>
              <li>Security incidents or attacks</li>
              <li>Force majeure events beyond our control</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. User Responsibilities</h2>
            <p>
              As a user of our Service, you are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ensuring your use complies with all applicable laws and regulations</li>
              <li>Maintaining the confidentiality of any sensitive information received</li>
              <li>Not relying on temporary emails for important or time-sensitive communications</li>
              <li>Understanding that temporary emails are not suitable for account recovery purposes</li>
              <li>Using the Service at your own risk</li>
              <li>Not sharing temporary email credentials with others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Intellectual Property</h2>
            <p>
              All content, features, and functionality of QuickTempMail.live, including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, and software, are the exclusive property of QuickTempMail.live or its licensors and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service, except as incidental to normal web browsing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. DISCLAIMER OF WARRANTIES</h2>
            <p className="uppercase font-bold">
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </p>
            <p>
              To the fullest extent permitted by applicable law, we disclaim all warranties, express or implied, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy, reliability, or completeness of information</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Security or freedom from viruses or other harmful components</li>
            </ul>
            <p className="mt-3">
              We do not warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The Service will meet your requirements or expectations</li>
              <li>The Service will be available at any particular time or location</li>
              <li>Any defects or errors will be corrected</li>
              <li>The Service is free of viruses or other harmful components</li>
              <li>The results of using the Service will be accurate or reliable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. LIMITATION OF LIABILITY</h2>
            <p className="uppercase font-bold">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, QUICKTEMPMAIL.LIVE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
            </p>
            <p>
              In no event shall QuickTempMail.live, its officers, directors, employees, or agents be liable to you for any damages arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your use or inability to use the Service</li>
              <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
              <li>Any interruption or cessation of transmission to or from the Service</li>
              <li>Any bugs, viruses, trojan horses, or the like that may be transmitted through the Service by any third party</li>
              <li>Any errors or omissions in any content or for any loss or damage incurred as a result of your use of any content posted, emailed, transmitted, or otherwise made available through the Service</li>
              <li>Loss of data or email content</li>
              <li>Failure to receive expected emails</li>
              <li>Reliance on the Service for critical communications</li>
            </ul>
            <p className="mt-3 font-bold">
              YOU SPECIFICALLY ACKNOWLEDGE THAT QUICKTEMPMAIL.LIVE SHALL NOT BE LIABLE FOR USER SUBMISSIONS OR THE DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF ANY THIRD PARTY.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless QuickTempMail.live, its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your violation of these Terms and Conditions</li>
              <li>Your use or misuse of the Service</li>
              <li>Your violation of any rights of another person or entity</li>
              <li>Your violation of any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">10. Privacy and Data Protection</h2>
            <p>
              Your use of the Service is also governed by our <Link href="/privacy-policy"><a className="text-primary hover:underline">Privacy Policy</a></Link>. Please review our Privacy Policy to understand our practices regarding the collection and use of your information.
            </p>
            <p className="mt-3">
              <strong>Important Data Notices:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All temporary email data is automatically deleted after session expiration</li>
              <li>We do not store email content after the 10-minute session</li>
              <li>We cannot recover deleted emails or expired sessions</li>
              <li>Do not use temporary emails for important account recovery or sensitive communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">11. Third-Party Services</h2>
            <p>
              Our Service relies on third-party services, including Mail.tm for email infrastructure. We are not responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The availability, reliability, or performance of third-party services</li>
              <li>Changes to third-party service terms or policies</li>
              <li>Actions taken by third-party service providers</li>
              <li>Content or data processed by third-party services</li>
            </ul>
            <p className="mt-3">
              Your use of third-party services through our Service is at your own risk and subject to those third parties' terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">12. Governing Law and Jurisdiction</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which QuickTempMail.live operates, without regard to its conflict of law provisions.
            </p>
            <p>
              Any disputes arising from or relating to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of the jurisdiction, except where prohibited by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">13. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect and enforceable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">14. Waiver</h2>
            <p>
              The failure of QuickTempMail.live to enforce any right or provision of these Terms will not be considered a waiver of those rights. The waiver of any such right or provision will be effective only if in writing and signed by a duly authorized representative of QuickTempMail.live.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">15. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">16. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please visit our <Link href="/contact"><a className="text-primary hover:underline">Contact Us</a></Link> page.
            </p>
          </section>

          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-bold text-destructive mb-3">⚠️ Important Disclaimer</h3>
            <p className="text-sm text-foreground">
              <strong>USE AT YOUR OWN RISK:</strong> QuickTempMail.live is a free service provided without any guarantees. Do not use temporary emails for important accounts, sensitive communications, or where email reliability is critical. We are not responsible for any loss, damage, or consequences resulting from your use of this service.
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