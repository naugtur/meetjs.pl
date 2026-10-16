<script setup lang="ts">
import type { City } from '~~/src/content/cities';

defineProps<{ status: City['status'] }>();

const statusColors: Record<string, string> = {
  active: 'bg-green',
  paused: 'bg-gray-400',
  'coming-soon': 'bg-yellow-400',
  new: 'bg-blue-400',
  typescript: 'bg-blue-600',
};
</script>

<template>
  <span
    :class="`ml-2 inline-block h-2 w-2 rounded-full ${statusColors[status]}`"
  />
</template>
