<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { DropdownMenuLabel } from 'reka-ui';

const props = defineProps<{
  class?: HTMLAttributes['class'];
  inset?: boolean;
}>();
</script>

<template>
  <DropdownMenuLabel
    :class="
      cn(
        'px-2 py-1.5 text-sm font-semibold',
        props.inset && 'pl-8',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuLabel>
</template>
