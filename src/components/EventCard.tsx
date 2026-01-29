'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { FaClock, FaLocationDot, FaMicrophoneLines } from 'react-icons/fa6';
import type { EventType } from '@/types/event';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { getEventWeekDay, isConferenceEvent } from '@/utils/eventUtils';
import { useLocale } from '@/hooks/useLocale';
import { useTranslate } from '@tolgee/react';

interface EventCardProps {
  event: EventType;
}

export const EventCard = ({ event }: EventCardProps) => {
  const { locale } = useLocale();
  const { t } = useTranslate();
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
      className={cn(
        'group flex min-h-60 min-w-full flex-col justify-between transition-all hover:shadow-lg',
        isInProgress && 'border-2 border-purple dark:border-green',
        isToday &&
          !isInProgress &&
          'border-2 border-yellow-500 dark:border-yellow-400',
        isConference && 'border-2 border-amber-400 dark:border-amber-500',
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-purple dark:hover:text-green"
            >
              {event.name}
            </a>
          </CardTitle>
          {isConference && (
            <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
              <FaMicrophoneLines className="h-3 w-3" />
              {t('event_card.conference')}
            </div>
          )}
        </div>
        {eventDate.getTime() > 0 && (
          <p className="text-sm text-muted-foreground">
            {isInProgress
              ? "🎉 Live now! Why aren't you here?"
              : isToday && isUpcoming
                ? `🎯 Today! Starts in ${formatDistanceToNow(eventDate)}`
                : isUpcoming
                  ? `Starts in ${formatDistanceToNow(eventDate)}`
                  : 'Event ended'}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {(event.address || event.city) && (
          <div className="mt-3 flex items-center gap-2">
            <FaLocationDot className="h-4 w-4 flex-shrink-0" />
            {event.address ? (
              <div>
                <div className="text-sm font-medium">{event.address}</div>
                {event.city && (
                  <div className="text-sm text-muted-foreground">
                    {event.city}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm font-medium text-muted-foreground">
                Location TBA
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaClock className="h-4 w-4 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium">
                {event.date} ({getEventWeekDay(event, locale)})
              </div>
              <div className="text-sm text-muted-foreground">{event.time}</div>
            </div>
          </div>

          {isUpcoming && event.rsvp && (
            <a
              href={event.rsvp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};
