import { Show, untrack } from 'solid-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import {
  FaSolidClock,
  FaSolidLocationDot,
  FaSolidMicrophoneLines,
} from 'solid-icons/fa';
import type { EventType } from '@/types/event';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { getEventWeekDay, isConferenceEvent } from '@/utils/eventUtils';
import { useLocale, useTranslate } from '@/i18n';

interface EventCardProps {
  event: EventType;
}

export const EventCard = (props: EventCardProps) => {
  const i18n = useLocale();
  const { t } = useTranslate();
  // One-time snapshot: the card renders a fixed event, so read it untracked.
  const event = untrack(() => props.event);
  const now = new Date();
  const [day, month, year] = event.date.split('.');
  const [hours, minutes] = event.time.split(':');

  // Create date in local timezone
  const eventDate = new Date(+year, +month - 1, +day, +hours, +minutes);

  // Calculate event end time (3 hours after start)
  const eventEndDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000);

  const isUpcoming = now < eventDate;
  const isInProgress = now >= eventDate && now <= eventEndDate;
  const isToday =
    now.getDate() === eventDate.getDate() &&
    now.getMonth() === eventDate.getMonth() &&
    now.getFullYear() === eventDate.getFullYear();

  const isConference = isConferenceEvent(event.type);

  return (
    <Card
      data-testid="event-card-wrapper"
      class={cn(
        'group flex min-h-60 min-w-full flex-col justify-between transition-all hover:shadow-lg',
        isInProgress && 'border-2 border-purple dark:border-green',
        isToday &&
          !isInProgress &&
          'border-2 border-yellow-500 dark:border-yellow-400',
        isConference && 'border-2 border-amber-400 dark:border-amber-500',
      )}
    >
      <CardHeader>
        <div class="flex items-start justify-between gap-2">
          <CardTitle>
            <a
              href={event.url}
              target="_blank"
              rel="noopener"
              class="transition-colors hover:text-purple dark:hover:text-green"
            >
              {event.name}
            </a>
          </CardTitle>
          <Show when={isConference}>
            <div class="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
              <FaSolidMicrophoneLines class="h-3 w-3" />
              {t('event_card.conference')}
            </div>
          </Show>
        </div>
        <Show when={eventDate.getTime() > 0}>
          <p class="text-sm text-muted-foreground">
            {isInProgress
              ? "🎉 Live now! Why aren't you here?"
              : isToday && isUpcoming
                ? `🎯 Today! Starts in ${formatDistanceToNow(eventDate)}`
                : isUpcoming
                  ? `Starts in ${formatDistanceToNow(eventDate)}`
                  : 'Event ended'}
          </p>
        </Show>
      </CardHeader>

      <CardContent class="flex flex-col gap-4">
        <Show when={event.address || event.city}>
          <div class="mt-3 flex items-center gap-2">
            <FaSolidLocationDot class="h-4 w-4 flex-shrink-0" />
            <Show
              when={event.address}
              fallback={
                <div class="text-sm font-medium text-muted-foreground">
                  Location TBA
                </div>
              }
            >
              <div>
                <div class="text-sm font-medium">{event.address}</div>
                <Show when={event.city}>
                  <div class="text-sm text-muted-foreground">{event.city}</div>
                </Show>
              </div>
            </Show>
          </div>
        </Show>

        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <FaSolidClock class="h-4 w-4 flex-shrink-0" />
            <div>
              <div class="text-sm font-medium">
                {event.date} ({getEventWeekDay(event, i18n.locale)})
              </div>
              <div class="text-sm text-muted-foreground">{event.time}</div>
            </div>
          </div>

          <Show when={isUpcoming && event.rsvp}>
            <a
              href={event.rsvp}
              target="_blank"
              rel="noopener"
              class={cn(
                buttonVariants({
                  size: 'sm',
                }),
                isConference
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 dark:from-amber-500 dark:to-orange-500 dark:hover:from-amber-600 dark:hover:to-orange-600'
                  : 'bg-purple text-white transition-colors hover:bg-purple/90 dark:bg-green dark:hover:bg-green/90',
              )}
            >
              {isConference ? t('event_card.register') : t('event_card.rsvp')}
            </a>
          </Show>
        </div>
      </CardContent>
    </Card>
  );
};
