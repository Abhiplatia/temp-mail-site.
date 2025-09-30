import { Link } from 'wouter';
import { ArrowLeft, Shield, Zap, Clock, Lock, Globe, Heart } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function About() {
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
        <h1 className="text-4xl font-bold text-foreground mb-8" data-testid="heading-about">About QuickTempMail.live</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Mission</h2>
            <p className="text-lg">
              QuickTempMail.live was created with a simple yet powerful mission: to protect your online privacy and keep your primary inbox clean from spam, promotional emails, and unwanted messages.
            </p>
            <p>
              In today's digital world, almost every website requires an email address for registration. This often leads to an inbox flooded with marketing emails, newsletters you never signed up for, and potential security risks. We believe you should be able to explore the internet freely without compromising your personal email security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Instant Generation</h3>
                </div>
                <p className="text-sm">
                  Generate temporary email addresses instantly with a single click. No registration, no forms, no waiting - just instant access to a disposable email.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">10-Minute Sessions</h3>
                </div>
                <p className="text-sm">
                  Each temporary email is active for 10 minutes, with the option to extend once. Perfect for quick verifications and one-time registrations.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Privacy First</h3>
                </div>
                <p className="text-sm">
                  We automatically delete all email data after session expiration. Your privacy is our top priority - we don't store, track, or sell your data.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">No Registration</h3>
                </div>
                <p className="text-sm">
                  Start using temporary emails immediately without creating an account. We don't collect your personal information or require sign-ups.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">100% Free</h3>
                </div>
                <p className="text-sm">
                  Completely free to use with no hidden fees, premium plans, or paywalls. Privacy protection should be accessible to everyone.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">User-Friendly</h3>
                </div>
                <p className="text-sm">
                  Clean, intuitive interface designed for ease of use. Get what you need quickly without complicated features or confusing navigation.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Why Choose QuickTempMail.live?</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">🎯 Built for Speed</h3>
                <p>
                  Unlike other temporary email services that require multiple steps or load slowly, QuickTempMail.live is optimized for instant access. Generate an email and start receiving messages in seconds.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">🔒 Privacy by Design</h3>
                <p>
                  We don't use invasive tracking, we don't collect unnecessary data, and we automatically delete everything after your session ends. Your temporary emails truly disappear.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">🌐 Always Available</h3>
                <p>
                  Our service is accessible 24/7 from any device with a web browser. No apps to download, no software to install - just visit our website and start using temporary emails.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">⚡ Modern Technology</h3>
                <p>
                  Built with modern web technologies for a fast, responsive experience on desktop, tablet, and mobile devices. Clean design that works seamlessly in both light and dark modes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">🛡️ Spam Protection</h3>
                <p>
                  Keep your primary inbox clean and professional. Use temporary emails for website trials, forum registrations, one-time downloads, and any situation where you want to avoid future spam.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Common Use Cases</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Website Testing:</strong> Test registration and email verification flows without cluttering your inbox</li>
              <li><strong>Free Trials:</strong> Sign up for free trials without committing your personal email</li>
              <li><strong>Forum Participation:</strong> Register on forums and discussion boards anonymously</li>
              <li><strong>File Downloads:</strong> Access content that requires email verification</li>
              <li><strong>Newsletter Testing:</strong> Preview newsletters before subscribing with your real email</li>
              <li><strong>Contest Entries:</strong> Enter contests and promotions without spam consequences</li>
              <li><strong>Privacy Protection:</strong> Maintain anonymity when you don't want to share your real email</li>
              <li><strong>Spam Avoidance:</strong> Protect yourself from websites that sell email lists to marketers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">How It Works</h2>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Generate Email</h4>
                  <p className="text-sm">Click the "Generate New Email" button to instantly create a random temporary email address</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Use Anywhere</h4>
                  <p className="text-sm">Copy the temporary email and use it for registrations, verifications, or any purpose you need</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Receive Messages</h4>
                  <p className="text-sm">Emails arrive in real-time in your inbox. Read, view attachments, or perform any needed actions</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Auto-Delete</h4>
                  <p className="text-sm">After 10 minutes (or 20 with extension), everything is automatically and permanently deleted</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Commitment</h2>
            <p>
              At QuickTempMail.live, we're committed to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Privacy:</strong> Never selling, sharing, or monetizing your data</li>
              <li><strong>Transparency:</strong> Being clear about how our service works and what we collect</li>
              <li><strong>Simplicity:</strong> Keeping the service simple, fast, and easy to use</li>
              <li><strong>Accessibility:</strong> Providing free access to everyone without barriers</li>
              <li><strong>Reliability:</strong> Maintaining uptime and service quality</li>
              <li><strong>Security:</strong> Implementing best practices to protect our infrastructure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Technology Stack</h2>
            <p>
              QuickTempMail.live is built with modern, reliable technologies:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Frontend:</strong> React with TypeScript for a fast, type-safe user interface</li>
              <li><strong>Email Infrastructure:</strong> Integration with Mail.tm's public API for temporary email functionality</li>
              <li><strong>Security:</strong> HTTPS encryption, rate limiting, and abuse prevention</li>
              <li><strong>Design:</strong> Responsive design that works on all devices and screen sizes</li>
              <li><strong>Performance:</strong> Optimized for fast load times and minimal resource usage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Limitations & Important Notes</h2>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6">
              <p className="font-semibold text-foreground mb-3">⚠️ Please Note:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Temporary emails expire after 10 minutes (extendable once to 20 minutes total)</li>
                <li>All data is permanently deleted after expiration and cannot be recovered</li>
                <li>Not suitable for important accounts, financial services, or sensitive communications</li>
                <li>Some websites may block or not accept temporary email addresses</li>
                <li>Cannot be used for account recovery or password resets of important accounts</li>
                <li>Email delivery depends on third-party infrastructure and is not guaranteed</li>
                <li>Service availability may vary based on third-party API status</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Contact & Support</h2>
            <p>
              Have questions, feedback, or suggestions? We'd love to hear from you! Visit our <Link href="/contact"><a className="text-primary hover:underline">Contact Us</a></Link> page to get in touch.
            </p>
            <p className="mt-3">
              For common questions and answers, check out our <Link href="/faq"><a className="text-primary hover:underline">FAQ section</a></Link>.
            </p>
          </section>

          <div className="bg-card border border-border rounded-lg p-6 mt-8 text-center">
            <p className="text-lg font-semibold text-foreground mb-2">
              Thank you for choosing QuickTempMail.live!
            </p>
            <p className="text-sm">
              We're here to help you maintain your online privacy, one temporary email at a time.
            </p>
            <Link href="/">
              <a className="inline-block mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Start Using QuickTempMail →
              </a>
            </Link>
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