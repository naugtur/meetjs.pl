<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';
import { clsx } from 'clsx';
import { CITIES } from '~~/src/content/cities';
import type { EventType } from '~~/src/types/event';
import { isConferenceEvent } from '~~/src/utils/eventUtils';

const props = defineProps<{
  events: EventType[] | null;
  filter: string | null;
}>();

const { t } = useTranslate();

const linkClassNames = (city: string | null) =>
  clsx(
    badgeVariants({
      variant: props.filter === city ? 'default' : 'outline',
    }),
    props.filter === city ? '' : 'bg-transparent',
    'hover:text-black hover:bg-gray-100 hover:border-purple',
  );

const filteredEvents = computed(() => {
  const events = props.events ?? [];
  if (props.filter === 'summit') {
    return events.filter((event) => isConferenceEvent(event.type));
  }
  return props.filter
    ? events.filter((event) => event.city === props.filter)
    : events;
});

const countFor = (predicate: (event: EventType) => boolean) =>
  (props.events ?? []).filter(predicate).length;
</script>

<template>
  <div v-if="!events">{{ t('events_page.filter.events_not_found') }}</div>
  <template v-else>
    <div class="flex flex-col gap-2">
      <p class="text-center text-lg">
        {{ t('events_page.filter.filter_by_city') }}
      </p>
      <div class="flex max-w-4xl flex-wrap justify-center gap-2">
        <NuxtLink
          :to="{ path: '/events' }"
          replace
          :class="linkClassNames(null)"
        >
          {{ t('events_page.filter.all') }} ({{ events.length }})
        </NuxtLink>
        <NuxtLink
          :to="{ path: '/events', query: { city: 'summit' } }"
          replace
          :class="linkClassNames('summit')"
        >
          🎤 Summit ({{ countFor((event) => isConferenceEvent(event.type)) }})
        </NuxtLink>
        <NuxtLink
          :to="{ path: '/events', query: { city: 'On-line' } }"
          replace
          :class="linkClassNames('On-line')"
        >
          {{ t('events_page.filter.online') }} ({{
            countFor((event) => event.city === 'On-line')
          }})
        </NuxtLink>
        <NuxtLink
          v-for="city in CITIES"
          :key="city.name"
          :to="{ path: '/events', query: { city: city.name } }"
          replace
          :class="linkClassNames(city.name)"
        >
          {{ city.name }} ({{ countFor((event) => event.city === city.name) }})
        </NuxtLink>
      </div>
    </div>

    <EventsList :events-list="filteredEvents" />
  </template>
</template>
