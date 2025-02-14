'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), {
    ssr: false,
});

export const BirthdayConfetti = () => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isClient, setIsClient] = useState(false);

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

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isClient ? (
        <div className="fixed inset-0 pointer-events-none z-50">
            <Confetti
                width={dimensions.width}
                height={dimensions.height}
                numberOfPieces={200}
                recycle={true}
                colors={['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']}
                gravity={0.3}
                tweenDuration={5000}
                initialVelocityY={15}
                wind={0.01}
            />
        </div>
    ) : null;
}; 