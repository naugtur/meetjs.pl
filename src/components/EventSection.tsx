import { getUpcomingEvents } from '@/utils/getUpcomingEvents';
import { EventsList } from './EventsList';
import { ADDITIONAL_EVENTS } from '@/content/additionalEvents';
import { filterUpcomingEvents } from '@/utils/eventUtils';
import { getTranslate } from '@/tolgee/server';

interface EventSectionProps {
  city: string;
}

export async function EventSection({ city }: EventSectionProps) {
  const t = await getTranslate();

  const apiEvents = await getUpcomingEvents();
  const allEvents = [...(apiEvents || []), ...ADDITIONAL_EVENTS];

  // Filter out past events and events too far in the future, then filter by city
  const upcomingEvents = filterUpcomingEvents(allEvents);
  const cityEvents = upcomingEvents.filter((event) => event.city === city);

  return (
    <section className="flex flex-col items-center justify-center gap-12 pt-12">
      <h2 className="text-2xl font-bold">
        {t('events.upcoming_in_city')} {city}
      </h2>
      {cityEvents && cityEvents.length > 0 ? (
        <EventsList eventsList={cityEvents} />
      ) : (
        <p>{t('events.no_events', { city })}</p>
      )}
    </section>
  );
}
