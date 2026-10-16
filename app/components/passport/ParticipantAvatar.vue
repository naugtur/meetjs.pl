<script setup lang="ts">
import type { Participant } from '~~/src/types/passport';

const props = withDefaults(
  defineProps<{
    participant: Participant;
    gradient: string;
    size: number;
    class?: string;
  }>(),
  { class: '' },
);
</script>

<template>
  <div
    :class="`relative overflow-hidden rounded-full bg-gray-100 ${props.class}`"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <AppImage
      v-if="participant.image"
      :src="participant.image"
      :alt="participant.displayName"
      fill
      :sizes="`${size}px`"
      class="scale-110 rounded-full object-cover"
    />
    <div
      v-else
      :class="`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br font-bold text-white ${gradient}`"
      :style="{ fontSize: `${size / 2.8}px` }"
    >
      {{ getInitials(participant.displayName) }}
    </div>
  </div>
</template>
