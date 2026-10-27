<script setup lang="ts">
type Variant = 'info' | 'success' | 'warning' | 'danger';

const props = withDefaults(defineProps<{ variant?: Variant }>(), {
  variant: 'info',
});

const VARIANT_STYLES: Record<Variant, string> = {
  info: 'bg-sky-50 border-sky-400',
  success: 'bg-emerald-50 border-emerald-400',
  warning: 'bg-yellow-50 border-yellow-400',
  danger: 'bg-red-50 border-red-400',
};
</script>

<template>
  <article
    :class="
      classNames('mb-8 border-l-4 p-4 shadow-sm', VARIANT_STYLES[props.variant])
    "
  >
    <slot />
  </article>
</template>
