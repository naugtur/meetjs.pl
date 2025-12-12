import { badgeVariants } from '@/components/ui/badge';
import { CITIES } from '@/content/cities';
import { EventType } from '@/types/event';
import { clsx } from 'clsx';
import { Suspense } from 'react';
import { EventsList } from '@/components/EventsList';
import Link from 'next/link';
import { getTranslate } from '@/tolgee/server';

interface FilterEventsProps {
  events: EventType[] | null;
  filter: string | null;
}

const FilterEventsContent = async ({ events, filter }: FilterEventsProps) => {
  const t = await getTranslate();
  const linkClassNames = (city: string | null) =>
    clsx(
      badgeVariants({
        variant: filter === city ? 'default' : 'outline',
      }),
      filter === city ? '' : 'bg-transparent',
      'hover:text-black hover:bg-gray-100 hover:border-purple',
    );

  if (!events) {
    return <div>{t('events_page.filter.events_not_found')}</div>;
  }

  const filteredEvents = filter
    ? events.filter((event) => event.city === filter)
    : events;

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-center text-lg">
          {t('events_page.filter.filter_by_city')}
        </p>
        <div className="flex max-w-4xl flex-wrap justify-center gap-2">
          <Link
            href={{ pathname: '/events' }}
            scroll={false}
            replace
            className={linkClassNames(null)}
          >
            {t('events_page.filter.all')} ({events.length})
          </Link>
          <Link
            href={{
              pathname: '/events',
              query: {
                city: 'On-line',
              },
            }}
            replace
            scroll={false}
            className={linkClassNames('On-line')}
          >
            {t('events_page.filter.online')} (
            {events.filter((event) => event.city === 'On-line').length})
          </Link>
          {CITIES.map((city) => {
            return (
              <Link
                href={{
                  pathname: '/events',
                  query: { city: city.name },
                }}
                replace
                scroll={false}
                className={linkClassNames(city.name)}
                key={city.name}
              >
                {city.name} (
                {events.filter((event) => event.city === city.name).length})
              </Link>
            );
          })}
        </div>
      </div>

      {filteredEvents !== null && <EventsList eventsList={filteredEvents} />}
    </>
  );
};

export const FilterEvents = async ({ events, filter }: FilterEventsProps) => {
  const t = await getTranslate();
  return (
    <Suspense fallback={<div>{t('events_page.filter.loading')}</div>}>
      <FilterEventsContent events={events} filter={filter} />
    </Suspense>
  );
};
