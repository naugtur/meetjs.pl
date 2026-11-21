import type { Metadata } from 'next';
import { EventsAPIPartner } from '@/components/EventsAPIPartner';
import { FilterEvents } from '@/components/FilterEvents';
import { EmptyEventsAlert } from '@/components/EmptyEventsAlert';
import { getPastEvents, getUpcomingEvents } from '@/lib/crossweb';
import { ADDITIONAL_EVENTS } from '@/content/additionalEvents';
import { filterUpcomingEvents } from '@/utils/eventUtils';
import { getTranslate } from '@/tolgee/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslate();

  return {
    title: t('events_page.meta_title'),
    description: t('events_page.meta_description'),
  };
}

interface EventsPageProps {
  searchParams: Promise<{ city: string }>;
}

const EventsPage = async ({ searchParams }: EventsPageProps) => {
  const resolvedSearchParams = await searchParams;
  const city = resolvedSearchParams?.city ?? null;
  const upcomingEvents = await getUpcomingEvents();
  const pastEvents = await getPastEvents();
  const t = await getTranslate();

  // Merge additional events with upcomingEvents and filter by date
  const mergedEvents = [...(upcomingEvents || []), ...ADDITIONAL_EVENTS];
  const allUpcomingEvents = filterUpcomingEvents(mergedEvents);

  return (
    <>
      {/*<Summit2026Banner />*/}
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-6 p-5 px-5 sm:px-6 lg:px-8">
        <section className="flex w-full flex-col items-center justify-center gap-6">
          <h1 className="py-4 text-4xl font-bold">
            {t('events_page.page_title')}
          </h1>
          <p className="text-center text-lg">{t('events_page.subtitle')}</p>
          <EventsAPIPartner />
        </section>

        <section className="flex w-full flex-col items-center justify-center gap-6">
          <h2 className="text-2xl font-bold">
            {t('events_page.upcoming_events')}
          </h2>
          {allUpcomingEvents.length > 0 ? (
            <FilterEvents events={allUpcomingEvents} filter={city} />
          ) : (
            <EmptyEventsAlert />
          )}
        </section>

        <section className="flex w-full flex-col items-center justify-center gap-6">
          <h2 className="text-2xl font-bold">{t('events_page.past_events')}</h2>
          <FilterEvents events={pastEvents} filter={city} />
        </section>
      </main>
    </>
  );
};

export default EventsPage;
