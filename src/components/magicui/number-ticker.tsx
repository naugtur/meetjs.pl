'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

import { cn } from '@/lib/utils';

export default function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  className,
}: {
  value: number;
  direction?: 'up' | 'down';
  className?: string;
  delay?: number; // delay in s
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 200,
  });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === 'down' ? 0 : value);
      }, delay * 1000);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat('pl-PL').format(
            Number(latest.toFixed(0)),
          );
        }
      }),
    [springValue],
  );

  return (
    <span
      className={cn('inline-block tabular-nums tracking-wider', className)}
      ref={ref}
    />
  );
}
