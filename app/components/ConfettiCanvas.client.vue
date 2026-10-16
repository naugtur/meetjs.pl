<script setup lang="ts">
// Full-screen confetti (former react-confetti usage on /14-birthday).
const props = defineProps<{
  numberOfPieces: number;
  recycle: boolean;
  colors: string[];
  gravity: number;
  tweenDuration: number;
  initialVelocityY: number;
  wind: number;
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
const width = window.innerWidth;
const height = window.innerHeight;
let stop: (() => void) | undefined;

onMounted(() => {
  if (!canvas.value) return;
  stop = startConfetti(canvas.value, {
    friction: 0.99,
    initialVelocityX: 4,
    opacity: 1,
    ...props,
  });
});

onBeforeUnmount(() => stop?.());
</script>

<template>
  <canvas
    ref="canvas"
    :width="width"
    :height="height"
    style="
      z-index: 2;
      position: absolute;
      pointer-events: none;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    "
  />
</template>
