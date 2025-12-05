'use client';

import { useEffect, useState } from 'react';

export const useScrollAnimation = (threshold = 0.1) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, threshold]);

  return { setRef, isVisible };
};

export const AnimatedSection = ({
  children,
  className = '',
  animation = 'fade-in-up',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale-in';
  delay?: number;
}) => {
  const { setRef, isVisible } = useScrollAnimation(0.1);

  const animationClasses = {
    'fade-in-up': 'opacity-0 translate-y-8',
    'fade-in-left': 'opacity-0 -translate-x-8',
    'fade-in-right': 'opacity-0 translate-x-8',
    'scale-in': 'opacity-0 scale-95',
  };

  const visibleClasses = {
    'fade-in-up': 'opacity-100 translate-y-0',
    'fade-in-left': 'opacity-100 translate-x-0',
    'fade-in-right': 'opacity-100 translate-x-0',
    'scale-in': 'opacity-100 scale-100',
  };

  return (
    <div
      ref={setRef}
      className={`transition-all duration-700 ease-out ${animationClasses[animation]} ${
        isVisible ? visibleClasses[animation] : ''
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const AnimatedStats = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  const { setRef, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={setRef}
      className={`translate-y-8 opacity-0 transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : ''
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {children}
    </div>
  );
};
