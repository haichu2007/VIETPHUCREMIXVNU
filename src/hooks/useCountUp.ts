import { useState, useEffect } from 'react';

/**
 * Custom hook to animate numbers rolling up smoothly from 0 to endValue.
 * Provides micro-interaction tactile feedback on style score changes.
 */
export const useCountUp = (endValue: number, duration: number = 600): number => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const startValue = count;
    const change = endValue - startValue;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startValue + change * easeOut));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [endValue, duration]);

  return count;
};
