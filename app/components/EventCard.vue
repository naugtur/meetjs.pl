<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';
import { formatDistance } from 'date-fns';
import IconClock from '~icons/fa6-solid/clock';
import IconLocationDot from '~icons/fa6-solid/location-dot';
import IconMicrophoneLines from '~icons/fa6-solid/microphone-lines';
import type { EventType } from '~~/src/types/event';
import { getEventWeekDay, isConferenceEvent } from '~~/src/utils/eventUtils';

const props = defineProps<{ event: EventType }>();

const { t } = useTranslate();
const locale = useLocale();
const now = useRenderNow();

// Create date in local timezone
const eventDate = computed(() => {
  const [day, month, year] = props.event.date.split('.');
  const [hours, minutes] = props.event.time.split(':');
  return new Date(+year!, +month! - 1, +day!, +hours!, +minutes!);
});

// Calculate event end time (3 hours after start)
const eventEndDate = computed(
  () => new Date(eventDate.value.getTime() + 3 * 60 * 60 * 1000),
);

const isUpcoming = computed(() => now < eventDate.value);
const isInProgress = computed(
  () => now >= eventDate.value && now <= eventEndDate.value,
);
const isToday = computed(
  () =>
    now.getDate() === eventDate.value.getDate() &&
    now.getMonth() === eventDate.value.getMonth() &&
    now.getFullYear() === eventDate.value.getFullYear(),
);
const isConference = computed(() => isConferenceEvent(props.event.type));

// formatDistanceToNow with the render time, so SSR and hydration agree
const startsIn = computed(() => formatDistance(eventDate.value, now));

const statusText = computed(() =>
  isInProgress.value
    ? "🎉 Live now! Why aren't you here?"
    : isToday.value && isUpcoming.value
      ? `🎯 Today! Starts in ${startsIn.value}`
      : isUpcoming.value
        ? `Starts in ${startsIn.value}`
        : 'Event ended',
);
</script>

<template>
  <UiCard
    data-testid="event-card-wrapper"
    :class="
      cn(
        'group flex min-h-60 min-w-full flex-col justify-between transition-all hover:shadow-lg',
        isInProgress && 'border-2 border-purple dark:border-green',
        isToday &&
          !isInProgress &&
          'border-2 border-yellow-500 dark:border-yellow-400',
        isConference && 'border-2 border-amber-400 dark:border-amber-500',
      )
    "
  >
    <UiCardHeader>
      <div class="flex items-start justify-between gap-2">
        <UiCardTitle>
          <a
            :href="event.url"
            target="_blank"
            rel="noopener"
            class="transition-colors hover:text-purple dark:hover:text-green"
          >
            {{ event.name }}
          </a>
        </UiCardTitle>
        <div
          v-if="isConference"
          class="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
        >
          <IconMicrophoneLines class="h-3 w-3" />
          {{ t('event_card.conference') }}
        </div>
      </div>
      <p v-if="eventDate.getTime() > 0" class="text-sm text-muted-foreground">
        {{ statusText }}
      </p>
    </UiCardHeader>

    <UiCardContent class="flex flex-col gap-4">
      <div
        v-if="event.address || event.city"
        class="mt-3 flex items-center gap-2"
      >
        <IconLocationDot class="h-4 w-4 flex-shrink-0" />
        <div v-if="event.address">
          <div class="text-sm font-medium">{{ event.address }}</div>
          <div v-if="event.city" class="text-sm text-muted-foreground">
            {{ event.city }}
          </div>
        </div>
        <div v-else class="text-sm font-medium text-muted-foreground">
          Location TBA
        </div>
      </div>

      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <IconClock class="h-4 w-4 flex-shrink-0" />
          <div>
            <div class="text-sm font-medium">
              {{ event.date }} ({{ getEventWeekDay(event, locale) }})
            </div>
            <div class="text-sm text-muted-foreground">{{ event.time }}</div>
          </div>
        </div>

        <a
          v-if="isUpcoming && event.rsvp"
          :href="event.rsvp"
          target="_blank"
          rel="noopener"
          :class="
            cn(
              buttonVariants({ size: 'sm' }),
              isConference
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 dark:from-amber-500 dark:to-orange-500 dark:hover:from-amber-600 dark:hover:to-orange-600'
                : 'bg-purple text-white transition-colors hover:bg-purple/90 dark:bg-green dark:hover:bg-green/90',
            )
          "
        >
          {{ isConference ? t('event_card.register') : t('event_card.rsvp') }}
        </a>
      </div>
    </UiCardContent>
  </UiCard>
</template>
