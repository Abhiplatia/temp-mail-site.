import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  initialTime: number;
  onTimeUp: () => void;
  onExtend: () => void;
}

export default function CountdownTimer({ initialTime, onTimeUp, onExtend }: CountdownTimerProps) {
  const [remainingTime, setRemainingTime] = useState(initialTime);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const updateProgress = (): number => {
    return (remainingTime / initialTime) * 100;
  };

  useEffect(() => {
    if (remainingTime <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, onTimeUp]);

  const handleExtend = () => {
    setRemainingTime(600); // Reset to 10 minutes
    onExtend();
  };

  const percentage = updateProgress();
  const circumference = 175.929;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="relative w-16 h-16">
        <svg className="progress-ring w-16 h-16" viewBox="0 0 64 64">
          <circle 
            className="stroke-muted" 
            cx="32" 
            cy="32" 
            r="28" 
            fill="transparent" 
            strokeWidth="4"
          />
          <circle 
            className="progress-ring-circle stroke-primary" 
            cx="32" 
            cy="32" 
            r="28" 
            fill="transparent" 
            strokeWidth="4" 
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Clock className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold font-mono text-foreground" data-testid="countdown-display">
          {formatTime(remainingTime)}
        </p>
        <p className="text-sm text-muted-foreground">Time remaining</p>
        <button 
          onClick={handleExtend}
          className="mt-2 text-xs text-primary hover:text-primary/80 underline"
          data-testid="button-extend-time"
        >
          Extend
        </button>
      </div>
    </div>
  );
}
