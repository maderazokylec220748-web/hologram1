import { useState, useEffect, useCallback } from 'react';

interface UseIdleDetectionOptions {
  idleTime?: number; // in milliseconds
  events?: string[];
}

export function useIdleDetection(options: UseIdleDetectionOptions = {}) {
  const {
    idleTime = 30000, // default 30 seconds
    events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
  } = options;

  const [isIdle, setIsIdle] = useState(false);

  const handleActivity = useCallback(() => {
    setIsIdle(false);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsIdle(true);
      }, idleTime);
    };

    // Set up event listeners
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Initialize timer
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [idleTime, events]);

  return { isIdle, setIsIdle };
}
