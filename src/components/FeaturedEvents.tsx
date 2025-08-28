import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { buttonVariants } from '@/components/ui/button';
import { EventCard } from '@/components/EventCard';
import Link from 'next/link';
import { EventsAPIPartner } from '@/components/EventsAPIPartner';
import { EmptyEventsAlert } from '@/components/EmptyEventsAlert';
import { getUpcomingEvents } from '@/utils/getUpcomingEvents';
import { ADDITIONAL_EVENTS } from '@/content/additionalEvents';
import { filterUpcomingEvents } from '@/utils/eventUtils';

export interface Event {
  type: string;
  id: number;
  date_add: number;
  date: string;
  time: string;
  name: string;
  url: string;
  rsvp: string;
  city: string;
  address: string | null;
  image: string;
  serie: string;
  topic: string[];
}

export const FeaturedEvents = async () => {
  const apiEvents: Event[] | null = await getUpcomingEvents();
  const allEvents: Event[] = [...(apiEvents || []), ...ADDITIONAL_EVENTS];

  // Filter out past events and events too far in the future
  const events = filterUpcomingEvents(allEvents);

  return (
    <section
      className="bg-branding-blue mx-auto flex w-full max-w-7xl snap-y scroll-mt-16 flex-col justify-between p-12 px-2 lg:px-8"
      id="events"
    >
      <div className="flex w-full flex-col gap-4 p-4">
        <h2 className="text-center text-3xl font-bold">Upcoming Events</h2>
        <p className="text-center">Don&apos;t miss these!</p>
        {events.length === 0 ? (
          <EmptyEventsAlert />
        ) : (
          <Carousel>
            <CarouselContent>
              {events.map((event) => {
                return (
                  <CarouselItem
                    className="basis-full md:basis-1/2 lg:basis-1/3"
                    key={event.id}
                  >
                    <EventCard event={event} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        )}

        <div className="mx-auto">
          <Link
            href="/events"
            className={buttonVariants({
              className:
                'w-full bg-purple text-black hover:bg-purple/80 md:w-auto dark:bg-green dark:hover:bg-green/80',
            })}
          >
            All events
          </Link>
        </div>

        <EventsAPIPartner />
      </div>
    </section>
  );
};
