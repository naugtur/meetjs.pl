import { onSettled } from 'solid-js';
import { isServer } from '@solidjs/web';

import { cn } from '@/lib/utils';

// Spring-animated number ticker — a hand-rolled replacement for the original
// motion/react based version. Animates `value` once the element scrolls into
// view, easing toward the target with a critically-damped spring.
export default function NumberTicker(props: {
  value: number;
  direction?: 'up' | 'down';
  class?: string;
  delay?: number; // delay in s
}) {
  let ref: HTMLSpanElement | undefined;
  let frame = 0;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  onSettled(() => {
    if (isServer) return;
    if (!ref) return;
    const direction = props.direction ?? 'up';
    const from = direction === 'down' ? props.value : 0;
    const to = direction === 'down' ? 0 : props.value;

    const format = (latest: number) => {
      if (ref)
        ref.textContent = Intl.NumberFormat('pl-PL').format(
          Number(latest.toFixed(0)),
        );
    };
    format(from);

    const start = () => {
      const startTime = performance.now();
      const duration = 1200;
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        // ease-out spring feel
        const eased = 1 - Math.pow(1 - progress, 3);
        format(from + (to - from) * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          timeout = setTimeout(start, (props.delay ?? 0) * 1000);
        }
      },
      { rootMargin: '0px' },
    );
    observer.observe(ref);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  });

  return (
    <span
      class={cn('inline-block tabular-nums tracking-wider', props.class)}
      ref={ref}
    />
  );
}
