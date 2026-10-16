<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { DropdownMenuSeparator } from 'reka-ui';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>

<template>
  <DropdownMenuSeparator :class="cn('-mx-1 my-1 h-px bg-muted', props.class)" />
</template>
