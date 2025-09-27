import { Link } from 'wouter';
import { ArrowLeft, Shield, Clock, Mail, Zap, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function About() {
  // Set page title and meta tags for SEO
  useEffect(() => {
    document.title = 'What is Disposable Temporary Email? | QuickTempMail.live';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about disposable temporary email services. QuickTempMail.live offers free anonymous temporary email addresses that expire automatically. Protect your privacy online.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Learn about disposable temporary email services. QuickTempMail.live offers free anonymous temporary email addresses that expire automatically. Protect your privacy online.';
      document.head.appendChild(meta);
    }

    // Set Open Graph tags
    const setOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    setOGTag('og:title', 'What is Disposable Temporary Email? | QuickTempMail.live');
    setOGTag('og:description', 'Learn about disposable temporary email services. QuickTempMail.live offers free anonymous temporary email addresses that expire automatically.');
    setOGTag('og:type', 'website');
    setOGTag('og:url', window.location.href);

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'QuickTempMail.live - Free Temporary Email Service';
    };
  }, []);
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-primary hover:text-primary/80"
              data-testid="link-back-home"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to QuickTempMail.live</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-bold text-foreground">
                QuickTempMail<span className="text-primary">.live</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            data-testid="heading-main-title"
          >
            What is Disposable Temporary E-mail?
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Disposable email is a free email service that allows you to receive emails at a temporary address that 
            automatically self-destructs after a certain time period. It's also known by names like: tempmail, 10minutemail, 
            10minmail, throwaway email, fake-mail, fake email generator, burner mail or trash-mail. Many forums, 
            Wi-Fi hotspots, websites and blogs require visitors to register before they can view content, post comments 
            or download files. QuickTempMail.live is the most advanced temporary email service that helps you avoid 
            spam and protect your privacy.
          </p>
        </div>

        {/* Tech Behind Section */}
        <section className="mb-12">
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
            <h2 
              className="text-2xl font-bold text-foreground mb-6 flex items-center"
              data-testid="heading-tech-behind"
            >
              <Shield className="w-6 h-6 text-primary mr-3" />
              The Tech behind Disposable Email Addresses
            </h2>
            
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
              
              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                So, what Is A Disposable Email Address?
              </h3>
              
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
        <section className="mb-12">
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
            <h2 
              className="text-2xl font-bold text-foreground mb-6 flex items-center"
              data-testid="heading-why-need"
            >
              <Zap className="w-6 h-6 text-primary mr-3" />
              Why would you need a disposable email address?
            </h2>
            
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
        <section className="mb-12">
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
            <h2 
              className="text-2xl font-bold text-foreground mb-6 flex items-center"
              data-testid="heading-how-choose"
            >
              <Clock className="w-6 h-6 text-primary mr-3" />
              How to Choose a Disposable Email?
            </h2>
            
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
        <section className="mb-12">
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
            <h2 
              className="text-2xl font-bold text-foreground mb-6"
              data-testid="heading-how-use"
            >
              How to Use QuickTempMail.live?
            </h2>
            
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

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-6">
              Create your free temporary email address now and start protecting your privacy online.
            </p>
            <Link 
              href="/?from=about"
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              data-testid="button-get-started"
            >
              <Mail className="w-4 h-4" />
              <span>Get Your Temp Email Now</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-12">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 QuickTempMail.live - Free Anonymous Temporary Email Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}