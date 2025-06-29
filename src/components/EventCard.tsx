import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { FaClock, FaLocationDot } from 'react-icons/fa6';
import type { EventType } from '@/types/event';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface EventCardProps {
  event: EventType;
}

export const EventCard = ({ event }: EventCardProps) => {
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

  return (
    <Card
      data-testid="event-card-wrapper"
      className={cn(
        'group flex min-h-60 min-w-full flex-col justify-between transition-all hover:shadow-lg',
        isInProgress && 'border-2 border-purple dark:border-green',
        isToday &&
          !isInProgress &&
          'border-2 border-yellow-500 dark:border-yellow-400',
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>
            <Link
              href={event.url}
              className="transition-colors hover:text-purple dark:hover:text-green"
            >
              {event.name}
            </Link>
          </CardTitle>
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

      <CardContent className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div className="flex flex-col gap-4">
          {(event.address || event.city) && (
            <div className="mt-3 flex items-center gap-2">
              <FaLocationDot className="h-4 w-4 flex-shrink-0" />
              {event.address ? (
                <div>
                  <div className="text-sm font-medium hover:underline">
                    {event.address}
                  </div>
                  {event.city && (
                    <div className="text-sm text-muted-foreground hover:underline">
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

          <div className="flex items-center gap-2">
            <FaClock className="h-4 w-4 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium">{event.date}</div>
              <div className="text-sm text-muted-foreground">{event.time}</div>
            </div>
          </div>
        </div>

        {isUpcoming && event.rsvp && (
          <Link
            href={event.rsvp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({
                size: 'sm',
              }),
              'w-full bg-purple text-white transition-colors hover:bg-purple/90 md:w-auto dark:bg-green dark:hover:bg-green/90',
            )}
          >
            RSVP
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
