'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});

export const BirthdayConfetti = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const confettiTimeout = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => {
      clearTimeout(confettiTimeout);
    };
  }, []);

  return showConfetti ? (
    <div className="pointer-events-none fixed inset-0 z-[80]">
      <Confetti
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
