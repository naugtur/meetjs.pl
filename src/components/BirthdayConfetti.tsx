import { createSignal, onCleanup, onSettled, Show } from 'solid-js';
import { isServer } from '@solidjs/web';
import confetti from 'canvas-confetti';

export const BirthdayConfetti = () => {
  const [showConfetti, setShowConfetti] = createSignal(false);
  let canvas: HTMLCanvasElement | undefined;

  onSettled(() => {
    if (isServer) return;
    if (isServer || !canvas) return;
    setShowConfetti(true);

    const fire = confetti.create(canvas, { resize: true });
    fire({
      particleCount: 200,
      colors: [
        '#FFD700',
        '#FF6B6B',
        '#4ECDC4',
        '#45B7D1',
        '#96CEB4',
        '#FFEEAD',
      ],
      gravity: 0.3,
      ticks: 500,
      startVelocity: 15,
      scalar: 1,
      drift: 0.5,
    });
    const end = Date.now() + 10_000;
    const interval = setInterval(() => {
      if (Date.now() > end) return;
      fire({
        particleCount: 30,
        spread: 120,
        startVelocity: 15,
        gravity: 0.3,
        colors: [
          '#FFD700',
          '#FF6B6B',
          '#4ECDC4',
          '#45B7D1',
          '#96CEB4',
          '#FFEEAD',
        ],
        origin: { x: Math.random(), y: -0.1 },
      });
    }, 800);
    const confettiTimeout = setTimeout(() => {
      clearInterval(interval);
      setShowConfetti(false);
    }, 10_000);
    onCleanup(() => {
      clearInterval(interval);
      clearTimeout(confettiTimeout);
    });
  });

  return (
    <Show when={!isServer}>
      <div
        class="pointer-events-none fixed inset-0 z-[80]"
        style={{ display: showConfetti() ? 'block' : 'block' }}
      >
        <canvas ref={canvas} class="h-full w-full" />
      </div>
    </Show>
  );
};
