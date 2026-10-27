<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';

const { t } = useTranslate();
// Crossweb events only (ADDITIONAL_EVENTS are shown on the map and /events)
const { data: events } = await useUpcomingEvents({ additional: false });
</script>

<template>
  <section
    id="events"
    class="bg-branding-blue mx-auto flex w-full max-w-7xl snap-y scroll-mt-16 flex-col justify-between p-12 px-2 lg:px-8"
  >
    <div class="flex w-full flex-col gap-4 p-4">
      <h2 class="text-center text-3xl font-bold">
        {{ t('featured_events.title') }}
      </h2>
      <p class="text-center">{{ t('featured_events.subtitle') }}</p>
      <EmptyEventsAlert v-if="events.length === 0" />
      <UiCarousel v-else>
        <UiCarouselContent>
          <UiCarouselItem
            v-for="event in events"
            :key="event.id"
            class="basis-[85%] md:basis-[45%] lg:basis-[30%]"
          >
            <EventCard :event="event" />
          </UiCarouselItem>
        </UiCarouselContent>
      </UiCarousel>

      <div class="mx-auto">
        <NuxtLink
          to="/events"
          :class="
            buttonVariants({
              class:
                'w-full bg-purple text-black hover:bg-purple/80 md:w-auto dark:bg-green dark:hover:bg-green/80',
            })
          "
        >
          {{ t('featured_events.all_events') }}
        </NuxtLink>
      </div>

      <EventsAPIPartner />
    </div>
  </section>
</template>
