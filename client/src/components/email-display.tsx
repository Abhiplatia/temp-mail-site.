import { useState } from 'react';
import { Copy, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CountdownTimer from './countdown-timer';

interface EmailDisplayProps {
  email: string;
  onExtendTime: () => void;
  onGenerateNew: (bypassRateLimit?: boolean) => void;
  isLoading?: boolean;
}

export default function EmailDisplay({ email, onExtendTime, onGenerateNew, isLoading = false }: EmailDisplayProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Email address copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy email to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleTimeUp = () => {
    toast({
      title: "Session expired",
      description: "Email session has expired. Refresh to generate a new one.",
      variant: "destructive",
    });
  };

  const handleExtend = () => {
    onExtendTime();
    toast({
      title: "Time extended",
      description: "Email has restart from 10 min",
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-8 animate-fade-in">
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground mb-2">Your temporary email address:</p>
        <div className="bg-muted/50 rounded-lg p-4 mb-4 border border-border/50">
          <p 
            className="text-xl sm:text-2xl font-sans font-normal text-foreground break-all"
            data-testid="text-email-address"
          >
            {email}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button 
            onClick={copyToClipboard}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            data-testid="button-copy-email"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>{copied ? 'Copied!' : 'Copy Email'}</span>
          </button>
          <button 
            onClick={() => onGenerateNew(false)}
            disabled={isLoading}
            className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-generate-fresh-mail"
          >
            {isLoading ? 'Generating...' : 'Generate Fresh New Mail'}
          </button>
        </div>
      </div>
      
      <CountdownTimer 
        initialTime={600}
        onTimeUp={handleTimeUp}
        onExtend={handleExtend}
      />
    </div>
  );
}
