import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface MetaTagsConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
}

const routeMetaTags: Record<string, MetaTagsConfig> = {
  '/': {
    title: 'Temp Mail - Disposable Temporary Email | 10 Minute Mail | Free Email Generator',
    description: 'Free disposable temporary email service. Get instant temp mail, 10 minute mail, fake email addresses & disposable email accounts. Free email generator - no signup required!',
    keywords: 'temp mail, disposable temporary email, 10 minute mail, temporary disposable mail, disposable email, temp email, fake email, email generator, disposable addresses, free email, 10min email, disposable email accounts, mail disposable, fake emails, free emails',
    canonical: 'https://quicktempmail.live',
  },
  '/articles': {
    title: 'Temp Mail Articles - Guides & Tips for Disposable Email | QuickTempMail.live',
    description: 'Comprehensive guides on temporary email, disposable addresses, privacy protection, and how to use temp mail services effectively. Expert tips and best practices.',
    keywords: 'temp mail guides, disposable email articles, temporary email tips, email privacy guides',
    canonical: 'https://quicktempmail.live/articles',
  },
  '/privacy-policy': {
    title: 'Privacy Policy - QuickTempMail.live | Temp Mail Service',
    description: 'Privacy policy for QuickTempMail.live temporary email service. Learn how we protect your data and handle disposable email addresses.',
    canonical: 'https://quicktempmail.live/privacy-policy',
  },
  '/terms': {
    title: 'Terms & Conditions - QuickTempMail.live | Temp Mail Service',
    description: 'Terms and conditions for using QuickTempMail.live disposable temporary email service. Read our user agreement and service guidelines.',
    canonical: 'https://quicktempmail.live/terms',
  },
  '/about': {
    title: 'About Us - QuickTempMail.live | Free Disposable Email Service',
    description: 'Learn about QuickTempMail.live, our mission to provide free, secure temporary email addresses, and why we created this disposable email service.',
    canonical: 'https://quicktempmail.live/about',
  },
  '/contact': {
    title: 'Contact Us - QuickTempMail.live | Temp Mail Support',
    description: 'Contact QuickTempMail.live for support, questions, or feedback about our temporary email service. We\'re here to help with disposable email needs.',
    canonical: 'https://quicktempmail.live/contact',
  },
  '/faq': {
    title: 'FAQ - Temp Mail Questions & Answers | QuickTempMail.live',
    description: 'Frequently asked questions about temporary email, disposable addresses, 10 minute mail, and how to use our free email generator service.',
    keywords: 'temp mail faq, disposable email questions, temporary email help',
    canonical: 'https://quicktempmail.live/faq',
  },
};

export function useMetaTags() {
  const [location] = useLocation();

  useEffect(() => {
    const config = routeMetaTags[location] || routeMetaTags['/'];

    // Update title
    document.title = config.title;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Update description
    updateMeta('description', config.description);

    // Update keywords if available
    if (config.keywords) {
      updateMeta('keywords', config.keywords);
    }

    // Update Open Graph tags
    updateMeta('og:title', config.ogTitle || config.title, true);
    updateMeta('og:description', config.ogDescription || config.description, true);
    updateMeta('og:url', config.canonical || `https://quicktempmail.live${location}`, true);

    // Update Twitter Card tags
    updateMeta('twitter:title', config.ogTitle || config.title);
    updateMeta('twitter:description', config.ogDescription || config.description);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', config.canonical || `https://quicktempmail.live${location}`);
  }, [location]);
}
