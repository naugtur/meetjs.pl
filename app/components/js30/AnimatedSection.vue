<script setup lang="ts">
type Animation = 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale-in';

const props = withDefaults(
  defineProps<{ class?: string; animation?: Animation; delay?: number }>(),
  { class: '', animation: 'fade-in-up', delay: 0 },
);

const { target, isVisible } = useScrollAnimation(0.1);

const animationClasses: Record<Animation, string> = {
  'fade-in-up': 'opacity-0 translate-y-8',
  'fade-in-left': 'opacity-0 -translate-x-8',
  'fade-in-right': 'opacity-0 translate-x-8',
  'scale-in': 'opacity-0 scale-95',
};

const visibleClasses: Record<Animation, string> = {
  'fade-in-up': 'opacity-100 translate-y-0',
  'fade-in-left': 'opacity-100 translate-x-0',
  'fade-in-right': 'opacity-100 translate-x-0',
  'scale-in': 'opacity-100 scale-100',
};
</script>

<template>
  <div
    ref="target"
    :class="`transition-all duration-700 ease-out ${animationClasses[props.animation]} ${
      isVisible ? visibleClasses[props.animation] : ''
    } ${props.class}`"
    :style="{ transitionDelay: `${props.delay}ms` }"
  >
    <slot />
  </div>
</template>
