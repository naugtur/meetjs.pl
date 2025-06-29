'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});

export const BirthdayConfetti = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setIsClient(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const confettiTimeout = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(confettiTimeout);
    };
  }, []);

  return isClient && showConfetti ? (
    <div className="pointer-events-none fixed inset-0 z-50">
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={200}
        recycle={true}
        colors={[
          '#FFD700',
          '#FF6B6B',
          '#4ECDC4',
          '#45B7D1',
          '#96CEB4',
          '#FFEEAD',
        ]}
        gravity={0.3}
        tweenDuration={5000}
        initialVelocityY={15}
        wind={0.01}
      />
    </div>
  ) : null;
};
