import { createMemo, Show } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import { Meta, Title } from '@solidjs/meta';

import { EventsAPIPartner } from '@/components/EventsAPIPartner';
import { FilterEvents } from '@/components/FilterEvents';
import { EmptyEventsAlert } from '@/components/EmptyEventsAlert';
import { getPastEvents, getUpcomingEvents } from '@/data/queries';
import { ADDITIONAL_EVENTS } from '@/content/additionalEvents';
import { filterUpcomingEvents } from '@/utils/eventUtils';
import { useTranslate } from '@/i18n';

const EventsPage = () => {
  const { t } = useTranslate();
  const [searchParams] = useSearchParams();
  const city = () => (searchParams.city as string | undefined) ?? null;

  const upcomingEvents = createMemo(() => getUpcomingEvents());
  const pastEvents = createMemo(() => getPastEvents());

  // Merge additional events with upcomingEvents and filter by date
  const allUpcomingEvents = () =>
    filterUpcomingEvents([...(upcomingEvents() || []), ...ADDITIONAL_EVENTS]);

  return (
    <>
      <Title>{t('events_page.meta_title')}</Title>
      <Meta name="description" content={t('events_page.meta_description')} />
      {/*<Summit2026Banner />*/}
      <main class="mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-6 p-5 px-5 sm:px-6 lg:px-8">
        <section class="flex w-full flex-col items-center justify-center gap-6">
          <h1 class="py-4 text-4xl font-bold">{t('events_page.page_title')}</h1>
          <p class="text-center text-lg">{t('events_page.subtitle')}</p>
          <EventsAPIPartner />
        </section>

        <section class="flex w-full flex-col items-center justify-center gap-6">
          <h2 class="text-2xl font-bold">{t('events_page.upcoming_events')}</h2>
          <Show
            when={allUpcomingEvents().length > 0}
            fallback={<EmptyEventsAlert />}
          >
            <FilterEvents events={allUpcomingEvents()} filter={city()} />
          </Show>
        </section>

        <section class="flex w-full flex-col items-center justify-center gap-6">
          <h2 class="text-2xl font-bold">{t('events_page.past_events')}</h2>
          <FilterEvents events={pastEvents() ?? null} filter={city()} />
        </section>
      </main>
    </>
  );
};

export default EventsPage;
