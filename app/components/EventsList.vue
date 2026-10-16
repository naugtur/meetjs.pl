<script setup lang="ts">
import type { EventType } from '~~/src/types/event';

defineProps<{ eventsList: EventType[] }>();
</script>

<template>
  <ul class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <li v-for="event in eventsList" :key="event.id">
      <EventCard :event="event" />
    </li>
  </ul>
</template>
