<script setup lang="ts">
defineProps<{ index: number }>();

const { target, isVisible } = useScrollAnimation(0.1);
</script>

<template>
  <div
    ref="target"
    :class="`translate-y-8 opacity-0 transition-all duration-700 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : ''
    }`"
    :style="{ transitionDelay: `${index * 100}ms` }"
  >
    <slot />
  </div>
</template>
