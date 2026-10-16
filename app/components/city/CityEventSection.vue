<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';

const props = defineProps<{ city: string }>();

const { t } = useTranslate();
const { data: upcomingEvents } = await useUpcomingEvents();

// Crossweb city names match exactly (Polish names with diacritics)
const cityEvents = computed(() =>
  upcomingEvents.value.filter((event) => event.city === props.city),
);
</script>

<template>
  <section class="flex flex-col items-center justify-center gap-12 pt-12">
    <h2 class="text-2xl font-bold">
      {{ t('events.upcoming_in_city') }} {{ city }}
    </h2>
    <EventsList v-if="cityEvents.length > 0" :events-list="cityEvents" />
    <p v-else>{{ t('events.no_events', { city }) }}</p>
  </section>
</template>
