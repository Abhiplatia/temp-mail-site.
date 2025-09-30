import { Link } from 'wouter';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string | JSX.Element;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-card hover:bg-accent/50 transition-colors flex items-center justify-between gap-4"
        data-testid={`faq-question-${question.substring(0, 20)}`}
      >
        <span className="font-semibold text-foreground">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-card text-muted-foreground border-t border-border">
          {typeof answer === 'string' ? <p>{answer}</p> : answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
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
        <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="heading-faq">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Find quick answers to common questions about QuickTempMail.live
        </p>
        
        <div className="space-y-4">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">General Questions</h2>
            <div className="space-y-3">
              <FAQItem
                question="What is QuickTempMail.live?"
                answer="QuickTempMail.live is a free temporary email service that provides disposable email addresses that automatically expire after 10 minutes. It's perfect for protecting your primary inbox from spam, testing website registrations, or any situation where you need a temporary email address."
              />

              <FAQItem
                question="Is QuickTempMail.live really free?"
                answer="Yes! QuickTempMail.live is 100% free to use with no hidden fees, premium plans, or paywalls. We believe privacy protection should be accessible to everyone."
              />

              <FAQItem
                question="Do I need to create an account or register?"
                answer="No! You don't need to create an account, register, or provide any personal information. Simply visit the website and start using temporary emails immediately."
              />

              <FAQItem
                question="How is QuickTempMail.live different from other temporary email services?"
                answer={
                  <div className="space-y-2">
                    <p>QuickTempMail.live stands out with:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>No registration required - instant access</li>
                      <li>Clean, modern interface that works on all devices</li>
                      <li>Real privacy - we automatically delete all data after 10 minutes</li>
                      <li>Fast and responsive - optimized for speed</li>
                      <li>Dark mode support for comfortable viewing</li>
                      <li>Session extension capability (one-time 10-minute extension)</li>
                    </ul>
                  </div>
                }
              />
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">How It Works</h2>
            <div className="space-y-3">
              <FAQItem
                question="How do I get a temporary email address?"
                answer='Simply click the "Generate New Email" button on the homepage. A random temporary email address will be created instantly and displayed on your screen.'
              />

              <FAQItem
                question="How long does a temporary email last?"
                answer="Each temporary email address is active for 10 minutes from the moment it's created. You can extend the session once for an additional 10 minutes, giving you a maximum of 20 minutes total. After expiration, the email and all messages are permanently deleted."
              />

              <FAQItem
                question="Can I extend my email session?"
                answer='Yes! You can extend your session once by clicking the "Extend Time" button. This adds an additional 10 minutes to your session. After the extension, you cannot extend again - the email will expire after the total 20 minutes.'
              />

              <FAQItem
                question="How do I receive emails?"
                answer="Once you generate a temporary email address, any emails sent to that address will appear automatically in your inbox on the website. The inbox updates in real-time, so you'll see new messages as they arrive."
              />

              <FAQItem
                question="Can I send emails from a temporary address?"
                answer="No, QuickTempMail.live is designed for receiving emails only. You cannot send emails from temporary addresses. This is by design to prevent spam and abuse."
              />

              <FAQItem
                question="Can I choose my own email address?"
                answer="No, temporary email addresses are randomly generated for security and privacy reasons. This ensures each session is unique and prevents conflicts or predictability."
              />
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Privacy & Security</h2>
            <div className="space-y-3">
              <FAQItem
                question="Is QuickTempMail.live safe to use?"
                answer="Yes! We use HTTPS encryption for all connections, implement rate limiting to prevent abuse, and automatically delete all data after your session expires. However, remember that temporary emails are public by nature - don't use them for sensitive communications."
              />

              <FAQItem
                question="Do you store my emails or personal data?"
                answer={
                  <div className="space-y-2">
                    <p>We take privacy seriously:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>All temporary emails and messages are automatically deleted after 10 minutes (or 20 with extension)</li>
                      <li>We don't collect or store your personal information</li>
                      <li>We don't track individual users</li>
                      <li>We use minimal analytics (Google Analytics) only for service improvement</li>
                      <li>We never sell or share your data with third parties</li>
                    </ul>
                  </div>
                }
              />

              <FAQItem
                question="Can I recover deleted emails?"
                answer="No. Once your session expires, all emails and data are permanently deleted and cannot be recovered. This is by design for privacy protection. Make sure to save any important information before your session ends."
              />

              <FAQItem
                question="Who can see my emails?"
                answer="Only you can see the emails during your active session (10-20 minutes). After that, everything is permanently deleted. However, remember that email communication itself is not inherently secure - the sender can see what they sent you."
              />

              <FAQItem
                question="Do you read my emails?"
                answer="No. We do not read, scan, or analyze the content of emails received at temporary addresses. Your emails are processed only for delivery to your browser and are automatically deleted after expiration."
              />
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Common Issues</h2>
            <div className="space-y-3">
              <FAQItem
                question="Why is email generation taking longer than usual?"
                answer="During high traffic periods, email generation may take a bit longer as our system automatically handles requests to ensure reliable service for all users. The page will continue loading and your email will be ready shortly."
              />

              <FAQItem
                question="Why isn't my email arriving?"
                answer={
                  <div className="space-y-2">
                    <p>There are several reasons why an email might not arrive:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Delivery delay:</strong> Some emails take a few minutes to arrive. Wait up to 5 minutes.</li>
                      <li><strong>Blocked domain:</strong> Some websites block temporary email domains. Try a different service if this happens.</li>
                      <li><strong>Sender issues:</strong> The sender's email server might have problems or might not support temporary emails.</li>
                      <li><strong>Session expired:</strong> If your session expired, you won't receive new emails. Generate a new address.</li>
                      <li><strong>Service outage:</strong> Rarely, our email provider might have temporary issues.</li>
                    </ul>
                  </div>
                }
              />

              <FAQItem
                question="Why does my session say it expired?"
                answer="Sessions expire automatically after 10 minutes (or 20 if extended). This is a core feature of the service for privacy and security. Once expired, you need to generate a new temporary email address."
              />

              <FAQItem
                question="Can I use the same email address again?"
                answer="No. Once a temporary email expires, it's permanently deleted and cannot be reused. You'll need to generate a new random email address for each session."
              />

              <FAQItem
                question="Why can't I generate a new email?"
                answer="If you're unable to generate a new email, you might have hit the rate limit (30-second cooldown). Wait 30 seconds and try again. If the problem persists, try refreshing the page or clearing your browser cache."
              />
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Usage & Limitations</h2>
            <div className="space-y-3">
              <FAQItem
                question="What can I use temporary email for?"
                answer={
                  <div className="space-y-2">
                    <p>Great uses for temporary email:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Website testing and development</li>
                      <li>Free trial sign-ups</li>
                      <li>Forum and community registrations</li>
                      <li>Newsletter previews</li>
                      <li>File download access requiring email verification</li>
                      <li>Contest entries</li>
                      <li>Protecting your primary email from spam</li>
                      <li>One-time registrations you don't want to maintain</li>
                    </ul>
                  </div>
                }
              />

              <FAQItem
                question="What should I NOT use temporary email for?"
                answer={
                  <div className="space-y-2">
                    <p className="font-semibold text-amber-600 dark:text-amber-400">Important: DO NOT use temporary email for:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Important account registrations (banking, work, government)</li>
                      <li>Financial services or payment accounts</li>
                      <li>Social media accounts you want to keep</li>
                      <li>Email accounts for password recovery</li>
                      <li>Sensitive or confidential communications</li>
                      <li>Long-term communications or relationships</li>
                      <li>Legal or official documents</li>
                      <li>Anything requiring reliable email access beyond 20 minutes</li>
                    </ul>
                  </div>
                }
              />

              <FAQItem
                question="Do all websites accept temporary email addresses?"
                answer="No. Some websites actively block temporary email domains to prevent abuse. If a website doesn't accept your temporary email, you'll need to use a permanent email address or try a different temporary email service."
              />

              <FAQItem
                question="How many temporary emails can I create?"
                answer="You can create as many temporary emails as you need, but we implement rate limiting (30-second cooldown between generations) to prevent abuse. This ensures the service remains available and responsive for all users."
              />

              <FAQItem
                question="Can I use temporary email on my phone?"
                answer="Yes! QuickTempMail.live works on all devices with a web browser - desktop computers, laptops, tablets, and smartphones. The interface is fully responsive and optimized for mobile use."
              />
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Technical Questions</h2>
            <div className="space-y-3">
              <FAQItem
                question="Which browsers are supported?"
                answer="QuickTempMail.live works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version of your browser for the best experience."
              />

              <FAQItem
                question="Do I need to enable cookies or JavaScript?"
                answer="Yes. QuickTempMail.live requires JavaScript to function properly. We use minimal cookies for session management and theme preferences. All cookies are essential for service functionality."
              />

              <FAQItem
                question="Does QuickTempMail.live work with VPNs?"
                answer="Yes, you can use QuickTempMail.live with VPNs or proxy services. However, some VPN IPs might be rate-limited if they've been used excessively by others."
              />

              <FAQItem
                question="What email domains are available?"
                answer="We use multiple domains provided by our email infrastructure partner (Mail.tm). The available domains may change over time. You'll see the domain when you generate your temporary email address."
              />

              <FAQItem
                question="Is there an API available?"
                answer="Currently, QuickTempMail.live is a web-only service without a public API. We focus on providing a great user experience through our website interface."
              />
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Support & Contact</h2>
            <div className="space-y-3">
              <FAQItem
                question="How do I report a bug or issue?"
                answer={
                  <div>
                    <p>If you encounter a bug or technical issue, please visit our <Link href="/contact"><a className="text-primary hover:underline">Contact Us</a></Link> page and send us an email with details about:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>What happened (describe the issue)</li>
                      <li>What you expected to happen</li>
                      <li>Your browser type and version</li>
                      <li>Steps to reproduce the problem</li>
                      <li>Any error messages you saw</li>
                    </ul>
                  </div>
                }
              />

              <FAQItem
                question="Can I suggest a new feature?"
                answer={
                  <div>
                    <p>Absolutely! We love hearing from users. Visit our <Link href="/contact"><a className="text-primary hover:underline">Contact Us</a></Link> page to share your feature ideas and suggestions. While we can't implement every request, we carefully consider all feedback.</p>
                  </div>
                }
              />

              <FAQItem
                question="How do I contact support?"
                answer={
                  <div>
                    <p>For any questions, issues, or feedback, please visit our <Link href="/contact"><a className="text-primary hover:underline">Contact Us</a></Link> page. We typically respond within 24-48 hours.</p>
                  </div>
                }
              />
            </div>
          </section>

          <div className="bg-card border border-border rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              If you couldn't find the answer you were looking for, we're here to help!
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/contact">
                <a className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Contact Us
                </a>
              </Link>
              <Link href="/">
                <a className="inline-block bg-secondary text-secondary-foreground px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors">
                  Try QuickTempMail
                </a>
              </Link>
            </div>
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