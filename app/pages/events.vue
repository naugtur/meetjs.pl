<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';

const { t } = useTranslate();
const siteUrl = useSiteUrl();
const route = useRoute();

useSiteMeta(() => ({
  title: t.value('events_page.meta_title'),
  description: t.value('events_page.meta_description'),
  canonical: siteUrl('/events'),
  openGraph: {
    title: 'Events | meet.js',
    description: 'Events for the meet.js community.',
    url: 'https://meetjs.pl/events',
    siteName: 'meet.js',
    images: [DEFAULT_OG_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
}));

const [{ data: upcomingEvents }, { data: pastEvents }] = await Promise.all([
  useUpcomingEvents(),
  usePastEvents(),
]);

const city = computed(() =>
  typeof route.query.city === 'string' ? route.query.city : null,
);
</script>

<template>
  <main
    class="mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-6 p-5 px-5 sm:px-6 lg:px-8"
  >
    <section class="flex w-full flex-col items-center justify-center gap-6">
      <h1 class="py-4 text-4xl font-bold">
        {{ t('events_page.page_title') }}
      </h1>
      <p class="text-center text-lg">{{ t('events_page.subtitle') }}</p>
      <EventsAPIPartner />
    </section>

    <section class="flex w-full flex-col items-center justify-center gap-6">
      <h2 class="text-2xl font-bold">
        {{ t('events_page.upcoming_events') }}
      </h2>
      <FilterEvents
        v-if="upcomingEvents.length > 0"
        :events="upcomingEvents"
        :filter="city"
      />
      <EmptyEventsAlert v-else />
    </section>

    <section class="flex w-full flex-col items-center justify-center gap-6">
      <h2 class="text-2xl font-bold">{{ t('events_page.past_events') }}</h2>
      <FilterEvents :events="pastEvents" :filter="city" />
    </section>
  </main>
</template>
