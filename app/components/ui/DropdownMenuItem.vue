<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import {
  DropdownMenuItem,
  useForwardProps,
  type DropdownMenuItemProps,
} from 'reka-ui';

const props = defineProps<
  DropdownMenuItemProps & { class?: HTMLAttributes['class']; inset?: boolean }
>();

const delegatedProps = computed(() => {
  const { class: _, inset: __, ...rest } = props;
  return rest;
});
const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <DropdownMenuItem
    v-bind="forwarded"
    :class="
      cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.inset && 'pl-8',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuItem>
</template>
