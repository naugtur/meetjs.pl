<script setup lang="ts">
// Counts up to `value` with a spring once the number scrolls into view
// (former magicui/number-ticker.tsx built on motion's useSpring).
const props = withDefaults(
  defineProps<{
    value: number;
    direction?: 'up' | 'down';
    delay?: number; // delay in s
    class?: string;
  }>(),
  { direction: 'up', delay: 0, class: undefined },
);

const element = ref<HTMLSpanElement | null>(null);

const STIFFNESS = 200;
const DAMPING = 40;
const MASS = 1;
const REST_DELTA = 0.01;
const REST_SPEED = 0.01;

const render = (value: number) => {
  if (element.value) {
    element.value.textContent = Intl.NumberFormat('pl-PL').format(
      Number(value.toFixed(0)),
    );
  }
};

let frame = 0;
let timeout: ReturnType<typeof setTimeout> | undefined;
let observer: IntersectionObserver | undefined;

const animate = () => {
  const target = props.direction === 'down' ? 0 : props.value;
  let position = props.direction === 'down' ? props.value : 0;
  let velocity = 0;
  let last = performance.now();

  const step = (time: number) => {
    // Integrate in small steps for a stable spring
    let elapsed = Math.min((time - last) / 1000, 0.064);
    last = time;
    while (elapsed > 0) {
      const dt = Math.min(elapsed, 1 / 240);
      const acceleration =
        (-STIFFNESS * (position - target) - DAMPING * velocity) / MASS;
      velocity += acceleration * dt;
      position += velocity * dt;
      elapsed -= dt;
    }
    if (
      Math.abs(target - position) < REST_DELTA &&
      Math.abs(velocity) < REST_SPEED
    ) {
      render(target);
      return;
    }
    render(position);
    frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
};

onMounted(() => {
  if (!element.value) return;
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      observer?.disconnect();
      timeout = setTimeout(animate, props.delay * 1000);
    },
    { rootMargin: '0px' },
  );
  observer.observe(element.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  clearTimeout(timeout);
  cancelAnimationFrame(frame);
});
</script>

<template>
  <span
    ref="element"
    :class="cn('inline-block tabular-nums tracking-wider', props.class)"
  />
</template>
