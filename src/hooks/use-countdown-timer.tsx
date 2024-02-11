import {useEffect, useState} from 'react';

interface CountdownHookResult {
  timeRemaining: string;
  percentageRemaining: number;
  isTimeout: boolean;
}

const useCountdownTimer = (initialTime: number): CountdownHookResult => {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          setIsTimeout(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const percentageRemaining = Math.floor((timeRemaining / initialTime) * 100);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return {
    timeRemaining: formatTime(timeRemaining),
    percentageRemaining,
    isTimeout,
  };
};

export default useCountdownTimer;
