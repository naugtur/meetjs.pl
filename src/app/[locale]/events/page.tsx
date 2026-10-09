import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { env } from '@/env';
import { EventsAPIPartner } from '@/components/EventsAPIPartner';
import { FilterEvents } from '@/components/FilterEvents';
import { EventsSchema } from '@/types/event';
import { EmptyEventsAlert } from '@/components/EmptyEventsAlert';
import { getUpcomingEvents } from '@/utils/getUpcomingEvents';
import { changeCityName } from '@/utils/changeCityName';
import { getMockPastEvents } from '@/utils/eventsMock';
import { isDevelopment } from '@/utils/isDevelopment';
import { ADDITIONAL_EVENTS } from '@/content/additionalEvents';
import { filterUpcomingEvents, sortEventsByDate } from '@/utils/eventUtils';
import { getTranslate } from '@/tolgee/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslate();

  return {
    title: t('events_page.meta_title'),
    description: t('events_page.meta_description'),
  };
}

const getPastEvents = async () => {
  'use cache';
  const events = await fetchPastEvents();
  // Retry soon after a failed or empty response instead of caching it for a day
  if (events.length > 0) {
    cacheLife('days');
  } else {
    cacheLife('minutes');
  }
  return events;
};

const fetchPastEvents = async () => {
  try {
    const url = new URL(env.EVENTS_API_URL);
    url.searchParams.set('old', '1');

    const pastEventsRes = await fetch(url);

    if (!pastEventsRes.ok) {
      const body = await pastEventsRes.text();
      if (isDevelopment()) {
        console.warn(
          `[getPastEvents] API returned ${pastEventsRes.status} ${pastEventsRes.statusText}, using mock past events for development.`,
        );
        return sortEventsByDate(getMockPastEvents().map(changeCityName), false); // false = descending order
      }
      throw new Error(
        `Events API returned ${pastEventsRes.status}: ${pastEventsRes.statusText}\n${body.slice(0, 200)}`,
      );
    }

    const pastEventsJson = await pastEventsRes.json();
    const data = EventsSchema.parse(pastEventsJson);

    const pastEvents = Object.values(data ?? {}).map(changeCityName);
    return sortEventsByDate(pastEvents, false); // false = descending order
  } catch (error) {
    if (isDevelopment()) {
      console.warn(
        '[getPastEvents] Failed to fetch or parse past events, using mock data for development:',
        error,
      );
      return sortEventsByDate(getMockPastEvents().map(changeCityName), false);
    }

    console.error('Error fetching past events:', error);
    return [];
  }
};

interface EventsPageProps {
  searchParams: Promise<{ city: string }>;
}

const EventsPage = async ({ searchParams }: EventsPageProps) => {
  const t = await getTranslate();

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

        {/* The city filter comes from the query string, so the lists stream in
            at request time while the header above is prerendered */}
        <Suspense>
          <EventLists searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
};

const EventLists = async ({ searchParams }: EventsPageProps) => {
  // Always render per request: "upcoming" is relative to the current time
  await connection();
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
    </>
  );
};

export default EventsPage;
