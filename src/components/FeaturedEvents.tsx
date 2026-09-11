import { createMemo, For, Show } from 'solid-js';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { buttonVariants } from '@/components/ui/button';
import { EventCard } from '@/components/EventCard';
import { EventsAPIPartner } from '@/components/EventsAPIPartner';
import { EmptyEventsAlert } from '@/components/EmptyEventsAlert';
import { getUpcomingEvents } from '@/data/queries';
import { filterUpcomingEvents } from '@/utils/eventUtils';
import { useTranslate } from '@/i18n';
import type { EventTypeName } from '@/types/event';

export interface Event {
  type: EventTypeName;
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

export const FeaturedEvents = () => {
  const { t } = useTranslate();
  const apiEvents = createMemo(() => getUpcomingEvents());

  const events = () => filterUpcomingEvents((apiEvents() || []) as Event[]);

  return (
    <section
      class="bg-branding-blue mx-auto flex w-full max-w-7xl snap-y scroll-mt-16 flex-col justify-between p-12 px-2 lg:px-8"
      id="events"
    >
      <div class="flex w-full flex-col gap-4 p-4">
        <h2 class="text-center text-3xl font-bold">
          {t('featured_events.title')}
        </h2>
        <p class="text-center">{t('featured_events.subtitle')}</p>
        <Show when={events().length > 0} fallback={<EmptyEventsAlert />}>
          <Carousel>
            <CarouselContent>
              <For each={events()}>
                {(event) => (
                  <CarouselItem class="basis-[85%] md:basis-[45%] lg:basis-[30%]">
                    <EventCard event={event} />
                  </CarouselItem>
                )}
              </For>
            </CarouselContent>
          </Carousel>
        </Show>

        <div class="mx-auto">
          <a
            href="/events"
            class={buttonVariants({
              class:
                'w-full bg-purple text-black hover:bg-purple/80 md:w-auto dark:bg-green dark:hover:bg-green/80',
            })}
          >
            {t('featured_events.all_events')}
          </a>
        </div>

        <EventsAPIPartner />
      </div>
    </section>
  );
};
