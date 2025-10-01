import { useEffect } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'horizontal' | 'rectangle' | 'auto';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdBanner({ 
  slot = 'XXXXXXXXX', 
  format = 'horizontal',
  className = '' 
}: AdBannerProps) {
  useEffect(() => {
    try {
      if (window.adsbygoogle && import.meta.env.VITE_GA_MEASUREMENT_ID) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      // Silently fail if AdSense initialization doesn't work
    }
  }, []);

  const getPlaceholderContent = () => {
    switch (format) {
      case 'horizontal':
        return '[AdSense Banner Ad - 728x90]';
      case 'rectangle':
        return '[AdSense Rectangle Ad - 300x250]';
      default:
        return '[AdSense Ad]';
    }
  };

  const getPlaceholderHeight = () => {
    switch (format) {
      case 'horizontal':
        return 'h-24';
      case 'rectangle':
        return 'h-32';
      default:
        return 'h-24';
    }
  };

  return (
    <div className={`text-center ${className}`}>
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="text-xs text-muted-foreground mb-2">Advertisement</div>
        
        {import.meta.env.VITE_GA_MEASUREMENT_ID ? (
          <ins 
            className="adsbygoogle block"
            style={{ display: 'block' }}
            data-ad-client={`ca-pub-${import.meta.env.VITE_GA_MEASUREMENT_ID}`}
            data-ad-slot={slot}
            data-ad-format={format === 'auto' ? 'auto' : undefined}
            data-full-width-responsive="true"
          />
        ) : (
          <div className={`bg-gradient-to-r from-muted via-accent to-muted ${getPlaceholderHeight()} rounded flex items-center justify-center text-muted-foreground text-sm`}>
            {getPlaceholderContent()}
          </div>
        )}
      </div>
    </div>
  );
}
