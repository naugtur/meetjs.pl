import { createSignal, onSettled } from 'solid-js';
import type { JSX } from '@solidjs/web';

export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = createSignal(false);
  let observer: IntersectionObserver | undefined;

  const setRef = (el: HTMLElement | null) => {
    observer?.disconnect();
    if (!el) return;
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer?.unobserve(entry.target);
        }
      },
      { threshold },
    );
    observer.observe(el);
  };

  onSettled(() => () => observer?.disconnect());

  return { setRef, isVisible };
};

export const AnimatedSection = (props: {
  children: JSX.Element;
  class?: string;
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

  const animation = () => props.animation ?? 'fade-in-up';

  return (
    <div
      ref={setRef}
      class={`transition-all duration-700 ease-out ${animationClasses[animation()]} ${
        isVisible() ? visibleClasses[animation()] : ''
      } ${props.class ?? ''}`}
      style={{ 'transition-delay': `${props.delay ?? 0}ms` }}
    >
      {props.children}
    </div>
  );
};

export const AnimatedStats = (props: {
  children: JSX.Element;
  index: number;
}) => {
  const { setRef, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={setRef}
      class={`translate-y-8 opacity-0 transition-all duration-700 ease-out ${
        isVisible() ? 'translate-y-0 opacity-100' : ''
      }`}
      style={{ 'transition-delay': `${props.index * 100}ms` }}
    >
      {props.children}
    </div>
  );
};
