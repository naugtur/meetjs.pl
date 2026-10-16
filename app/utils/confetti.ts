// Confetti animation ported from react-confetti 6 (MIT) — same particle
// model and defaults, without React.

export interface ConfettiOptions {
  numberOfPieces: number;
  friction: number;
  wind: number;
  gravity: number;
  initialVelocityX: number;
  initialVelocityY: number;
  colors: string[];
  opacity: number;
  recycle: boolean;
  tweenDuration: number;
}

const DEFAULT_FRAME_TIME = 1000 / 60;

const randomRange = (min: number, max: number) =>
  min + Math.random() * (max - min);
const randomInt = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max - min + 1));
const degreesToRads = (degrees: number) => (degrees * Math.PI) / 180;

// tween-functions easeInOutQuad
const easeInOutQuad = (t: number, b: number, end: number, d: number) => {
  const c = end - b;
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
};

class Particle {
  x: number;
  y: number;
  w = randomRange(5, 20);
  h = randomRange(5, 20);
  radius = randomRange(5, 10);
  vx: number;
  vy: number;
  shape = randomInt(0, 2);
  angle = degreesToRads(randomRange(0, 360));
  angularSpin = randomRange(-0.2, 0.2);
  color: string;
  rotateY = randomRange(0, 1);
  rotationDirection = randomRange(0, 1) ? 1 : -1;

  constructor(
    private context: CanvasRenderingContext2D,
    private options: ConfettiOptions,
    x: number,
    y: number,
  ) {
    this.x = x;
    this.y = y;
    this.vx = randomRange(-options.initialVelocityX, options.initialVelocityX);
    this.vy = randomRange(-options.initialVelocityY, 0);
    this.color =
      options.colors[Math.floor(Math.random() * options.colors.length)]!;
  }

  update(elapsed: number) {
    const { gravity, wind, friction, opacity } = this.options;
    const frameTimeMultiplier = elapsed / DEFAULT_FRAME_TIME;
    this.x += this.vx * frameTimeMultiplier;
    this.y += this.vy * frameTimeMultiplier;
    this.vy += gravity * frameTimeMultiplier;
    this.vx += wind * frameTimeMultiplier;
    this.vx *= friction ** frameTimeMultiplier;
    this.vy *= friction ** frameTimeMultiplier;
    if (this.rotateY >= 1 && this.rotationDirection === 1) {
      this.rotationDirection = -1;
    } else if (this.rotateY <= -1 && this.rotationDirection === -1) {
      this.rotationDirection = 1;
    }
    this.rotateY += 0.1 * this.rotationDirection * frameTimeMultiplier;
    this.angle += this.angularSpin;

    const context = this.context;
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.scale(1, this.rotateY);
    context.rotate(this.angle);
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.globalAlpha = opacity;
    context.lineCap = 'round';
    context.lineWidth = 2;
    if (this.shape === 0) {
      context.beginPath();
      context.arc(0, 0, this.radius, 0, 2 * Math.PI);
      context.fill();
    } else if (this.shape === 1) {
      context.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    } else {
      context.fillRect(-this.w / 6, -this.h / 2, this.w / 3, this.h);
    }
    context.closePath();
    context.restore();
  }
}

/** Starts the animation on `canvas`; returns a function that stops it. */
export const startConfetti = (
  canvas: HTMLCanvasElement,
  options: ConfettiOptions,
): (() => void) => {
  const context = canvas.getContext('2d');
  if (!context) return () => {};

  const particles: Particle[] = [];
  let particlesGenerated = 0;
  let tweenProgress = 0;
  let lastFrameTime = 0;
  let frame = 0;

  const newParticle = () =>
    new Particle(context, options, randomRange(0, canvas.width), 0);

  const animate = (elapsed: number) => {
    const nP = particles.length;
    const activeCount = options.recycle ? nP : particlesGenerated;
    if (activeCount < options.numberOfPieces) {
      tweenProgress = Math.min(
        options.tweenDuration,
        Math.max(0, tweenProgress + elapsed),
      );
      const tweened = easeInOutQuad(
        tweenProgress,
        0,
        options.numberOfPieces,
        options.tweenDuration,
      );
      const toAdd = Math.round(tweened - activeCount);
      for (let i = 0; i < toAdd; i++) particles.push(newParticle());
      particlesGenerated += toAdd;
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]!;
      particle.update(elapsed);
      if (
        particle.y > canvas.height ||
        particle.y < -100 ||
        particle.x > canvas.width + 100 ||
        particle.x < -100
      ) {
        if (options.recycle && activeCount <= options.numberOfPieces) {
          particles[i] = newParticle();
        } else {
          particles.splice(i, 1);
        }
      }
    }
    return nP > 0 || activeCount < options.numberOfPieces;
  };

  const update = (timestamp = 0) => {
    const elapsed = Math.min(timestamp - lastFrameTime, 50);
    lastFrameTime = timestamp;
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (animate(elapsed)) frame = requestAnimationFrame(update);
  };
  update();

  return () => cancelAnimationFrame(frame);
};
