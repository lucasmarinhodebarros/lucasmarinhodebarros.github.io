import { useState, useEffect } from 'react';

interface RotatingTextProps {
  phrases: string[];
  interval?: number;
}

export function RotatingText({ phrases, interval = 2000 }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        setIsAnimating(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  return (
    <div className="h-8 md:h-10 flex items-center justify-center overflow-hidden">
      <span
        className={`transition-all duration-300 ${
          isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {phrases[currentIndex]}
      </span>
    </div>
  );
}
