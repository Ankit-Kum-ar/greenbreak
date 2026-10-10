import { useState, useEffect } from "react";

interface UseBreakTimerProps {
  initialMinutes: number;
  isActive: boolean;
  onComplete?: () => void;
}

export function useBreakTimer({ initialMinutes, isActive, onComplete }: UseBreakTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    setSecondsLeft(initialMinutes * 60);
  }, [initialMinutes]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, onComplete]);

  const resetTimer = (minutes: number) => {
    setSecondsLeft(minutes * 60);
  };

  const formattedTime = () => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return {
    secondsLeft,
    formattedTime: formattedTime(),
    isCompleted: secondsLeft === 0,
    resetTimer,
  };
}
