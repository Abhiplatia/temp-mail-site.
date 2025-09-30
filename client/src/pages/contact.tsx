import { Link } from 'wouter';
import { ArrowLeft, Mail, MessageSquare, Bug, Lightbulb, HelpCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Contact() {
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
        <h1 className="text-4xl font-bold text-foreground mb-8" data-testid="heading-contact">Contact Us</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg">
            We're here to help! Whether you have questions, feedback, or need assistance, we'd love to hear from you.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">How Can We Help?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">General Questions</h3>
                </div>
                <p className="text-sm mb-4">
                  Have questions about how our service works, features, or capabilities? Check our <Link href="/faq"><a className="text-primary hover:underline">FAQ page</a></Link> for quick answers to common questions.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <Bug className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Report a Bug</h3>
                </div>
                <p className="text-sm mb-4">
                  Encountered a technical issue or something not working as expected? Let us know so we can fix it quickly and improve the service for everyone.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Feature Suggestions</h3>
                </div>
                <p className="text-sm mb-4">
                  Have an idea for a new feature or improvement? We're always looking for ways to make QuickTempMail.live better. Share your suggestions with us!
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">General Feedback</h3>
                </div>
                <p className="text-sm mb-4">
                  We value your feedback! Let us know about your experience using QuickTempMail.live - what you like, what could be better, or any other thoughts.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Get in Touch</h2>
            
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Email Us</h3>
                  <p className="text-sm text-muted-foreground">We typically respond within 24-48 hours</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-foreground mb-2">General Inquiries:</p>
                  <a 
                    href="mailto:contact@quicktempmail.live" 
                    className="text-primary hover:underline text-lg"
                    data-testid="link-email-general"
                  >
                    contact@quicktempmail.live
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Technical Support:</p>
                  <a 
                    href="mailto:support@quicktempmail.live" 
                    className="text-primary hover:underline text-lg"
                    data-testid="link-email-support"
                  >
                    support@quicktempmail.live
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Bug Reports & Feature Requests:</p>
                  <a 
                    href="mailto:feedback@quicktempmail.live" 
                    className="text-primary hover:underline text-lg"
                    data-testid="link-email-feedback"
                  >
                    feedback@quicktempmail.live
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Before You Contact Us</h2>
            <p>
              To help us assist you more efficiently, please:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Check our <Link href="/faq"><a className="text-primary hover:underline">FAQ page</a></Link> - your question might already be answered</li>
              <li>Include specific details about any issues you're experiencing</li>
              <li>Mention your browser type and version if reporting a technical problem</li>
              <li>Describe the steps that led to the issue so we can reproduce it</li>
              <li>Include screenshots if relevant (make sure to remove any sensitive information)</li>
              <li>Let us know if you're comfortable being contacted for follow-up questions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">What to Expect</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Acknowledgment</h4>
                  <p className="text-sm">We'll acknowledge receipt of your message within 24 hours</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Investigation</h4>
                  <p className="text-sm">For technical issues, we'll investigate and may ask for additional information</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Resolution</h4>
                  <p className="text-sm">We'll work to resolve your issue or address your feedback promptly</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Follow-up</h4>
                  <p className="text-sm">We'll keep you updated on the status and any actions taken</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Common Issues & Quick Fixes</h2>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-3">Before contacting support, try these:</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>Email not receiving:</strong> Wait a few minutes - some emails take time to arrive. Check if the sender supports temporary email domains.</li>
                <li><strong>"Service busy" error:</strong> Wait 30 seconds before trying again. We have rate limits to prevent abuse.</li>
                <li><strong>Session expired:</strong> Sessions last 10 minutes. You can extend once for an additional 10 minutes. After expiration, data cannot be recovered.</li>
                <li><strong>Page not loading:</strong> Try refreshing the page, clearing your browser cache, or using a different browser.</li>
                <li><strong>Email disappeared:</strong> Emails are automatically deleted after session expiration. This is by design for privacy protection.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Response Time</h2>
            <p>
              We strive to respond to all inquiries within:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Critical bugs:</strong> Within 24 hours</li>
              <li><strong>General support:</strong> Within 24-48 hours</li>
              <li><strong>Feature requests:</strong> Within 48-72 hours</li>
              <li><strong>General feedback:</strong> Within 3-5 business days</li>
            </ul>
            <p className="mt-3 text-sm">
              Please note: Response times may vary during weekends and holidays. We appreciate your patience!
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Privacy & Data</h2>
            <p>
              When you contact us, we collect only the information you provide (your email address and message content). This information is used solely to respond to your inquiry and is not shared with third parties. For more information, please review our <Link href="/privacy-policy"><a className="text-primary hover:underline">Privacy Policy</a></Link>.
            </p>
          </section>

          <div className="bg-card border border-border rounded-lg p-6 mt-8 text-center">
            <p className="text-lg font-semibold text-foreground mb-2">
              We're Here to Help!
            </p>
            <p className="text-sm mb-4">
              Your feedback and questions help us improve QuickTempMail.live for everyone. Don't hesitate to reach out!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/faq">
                <a className="inline-block bg-secondary text-secondary-foreground px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors">
                  View FAQ
                </a>
              </Link>
              <Link href="/">
                <a className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Back to Home
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