import Link from 'next/link';
import type { Route } from 'next';
import { City } from '@/content/cities';
import { Event } from '@/components/FeaturedEvents';
import { ADDITIONAL_EVENTS } from '@/content/additionalEvents';
import { getTranslate } from '@/tolgee/server';

type MapProps = {
  cities: City[];
  events?: Event[];
};

function getCityFillColor(status: City['status']): string {
  switch (status) {
    case 'active':
    case 'new':
      return '#219eab';
    case 'coming-soon':
      return '#EAB308';
    case 'paused':
    default:
      return '#9CA3AF';
  }
}

function getCityTextFillColor(status: City['status']): string {
  switch (status) {
    case 'active':
    case 'coming-soon':
    case 'new':
      return '#2b1932';
    case 'paused':
    default:
      return '#6B7280';
  }
}

export const PolandMap = async ({ cities, events = [] }: MapProps) => {
  const t = await getTranslate();
  const now = new Date();

  const getCityEventStatus = (cityName: string) => {
    // Filter to only non-conference events for status indicator
    const cityEvents = events.filter(
      (event) =>
        event.city === cityName &&
        event.type?.toLowerCase() !== 'conference' &&
        event.type?.toLowerCase() !== 'konferencja' &&
        event.type?.toLowerCase() !== 'summit',
    );

    for (const event of cityEvents) {
      const [day, month, year] = event.date.split('.');
      const [hours, minutes] = event.time.split(':');

      const eventDate = new Date(+year, +month - 1, +day, +hours, +minutes);
      const eventEndDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000);

      if (now >= eventDate && now <= eventEndDate) {
        return 'in-progress';
      }
      if (now < eventDate) {
        return 'upcoming';
      }
    }
    return 'none';
  };

  const hasPartnershipEvent = (cityName: string) => {
    // Check if there are any additional events (partnerships) for this city that are also in the filtered events
    return events.some(
      (event) =>
        event.city === cityName &&
        ADDITIONAL_EVENTS.some(
          (additionalEvent) => additionalEvent.id === event.id,
        ) &&
        event.type !== 'Conference',
    );
  };

  const hasConferenceEvent = (cityName: string) => {
    return events.some(
      (event) =>
        event.city === cityName &&
        (event.type?.toLowerCase() === 'conference' ||
          event.type?.toLowerCase() === 'konferencja' ||
          event.type?.toLowerCase() === 'summit' ||
          event.serie?.toLowerCase().includes('summit') ||
          event.name?.toLowerCase().includes('summit')),
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 280 244"
          className="h-full w-full"
        >
          <polygon
            points="70.067,190.289 70.067,198.219 63.458,204.828 51.563,190.289 51.563,181.698 22.156,168.481 12.494,128.164 13.526,97.904 3.783,87.567 2,46.886 48.259,29.704 65.771,12.192 103.77,2.165 111.039,21.774 132.186,31.026 145.403,23.096 222.061,24.418 235.938,33.009 248.825,97.771 235.071,103.595 227.678,115.944 241.225,122.222 239.904,153.943 258,180.096 216.774,223.992 215.452,241.835 200.253,238.531 189.019,229.279 144.081,241.835 133.508,225.314 121.613,227.957 110.378,212.097"
            fill="#bcd35d"
            stroke="#2b1932"
            strokeWidth="2"
          />
          {cities.map((city, index) => {
            const eventStatus = getCityEventStatus(city.name);
            const hasPartnership = hasPartnershipEvent(city.name);
            const hasConference = hasConferenceEvent(city.name);

            return (
              <g key={index}>
                <Link href={city.href as Route}>
                  <g className="city-marker group">
                    {/* City dot - split if has partnership events and NO conference */}
                    {eventStatus !== 'none' &&
                    hasPartnership &&
                    !hasConference ? (
                      <foreignObject
                        x={city.pointPosition.x - 3}
                        y={city.pointPosition.y - 3}
                        width="6"
                        height="6"
                        className="cursor-pointer hover:opacity-80"
                      >
                        <div className="flex h-[6px] w-[6px]">
                          <div
                            className="h-[6px] w-[3px] rounded-l-full"
                            style={{
                              backgroundColor: getCityFillColor(city.status),
                            }}
                          />
                          <div className="h-[6px] w-[3px] rounded-r-full bg-[#9333ea]" />
                        </div>
                      </foreignObject>
                    ) : (
                      <circle
                        cx={city.pointPosition.x}
                        cy={city.pointPosition.y}
                        r="3"
                        fill={getCityFillColor(city.status)}
                        className="cursor-pointer hover:opacity-80"
                      />
                    )}

                    {/* Summit premium pinnacle - Vibrant Purple Hexagon with Glow */}
                    {hasConference && (
                      <g
                        transform={`translate(${city.pointPosition.x}, ${city.pointPosition.y})`}
                      >
                        {/* Vibrant Purple Halo */}
                        <circle
                          r="10"
                          fill="none"
                          stroke="#9333ea"
                          strokeWidth="2"
                          className="animate-pulse opacity-60"
                        />
                        {/* Vibrant Purple Hexagon Marker */}
                        <polygon
                          points="0,-5 4.33,-2.5 4.33,2.5 0,5 -4.33,2.5 -4.33,-2.5"
                          fill="#9333ea"
                          stroke="white"
                          strokeWidth="1.5"
                          className="cursor-pointer transition-transform hover:scale-125"
                        />
                      </g>
                    )}

                    {/* Event status circle (only for non-conferences) */}
                    {eventStatus !== 'none' && !hasConference && (
                      <circle
                        cx={city.pointPosition.x}
                        cy={city.pointPosition.y}
                        r="6"
                        fill="none"
                        stroke={
                          eventStatus === 'in-progress' ? '#9333ea' : '#219eab'
                        }
                        strokeWidth={eventStatus === 'in-progress' ? '2' : '1'}
                        className={
                          eventStatus === 'in-progress'
                            ? 'animate-pulse dark:stroke-green-500'
                            : ''
                        }
                      />
                    )}

                    {/* Coming soon dashed circle - only if no events/conferences */}
                    {city.status === 'coming-soon' &&
                      eventStatus === 'none' &&
                      !hasConference && (
                        <circle
                          cx={city.pointPosition.x}
                          cy={city.pointPosition.y}
                          r="6"
                          fill="none"
                          stroke="#EAB308"
                          strokeWidth="1"
                          strokeDasharray="2,1"
                        />
                      )}
                  </g>
                  <text
                    x={city.textPosition.x}
                    y={city.textPosition.y}
                    fontSize="10"
                    fill={getCityTextFillColor(city.status)}
                    className="cursor-pointer"
                  >
                    {city.name}
                  </text>
                </Link>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="relative flex h-4 items-center justify-center pt-1">
            <svg width="14" height="14" viewBox="-7 -7 14 14">
              <circle
                r="6"
                fill="none"
                stroke="#9333ea"
                strokeWidth="1.5"
                className="animate-pulse"
              />
              <polygon
                points="0,-4 3.46,-2 3.46,2 0,4 -3.46,2 -3.46,-2"
                fill="#9333ea"
                stroke="white"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          <span>{t('poland_map.conference')}</span>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#219eab]" />
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-[#219eab]" />
              <div className="absolute -inset-1 rounded-full border border-[#219eab]" />
            </div>
            <div className="relative">
              <div className="flex h-2 w-2">
                <div className="h-2 w-1 rounded-l-full bg-[#219eab]" />
                <div className="h-2 w-1 rounded-r-full bg-[#9333ea]" />
              </div>
              <div className="absolute -inset-1 animate-pulse rounded-full border-2 border-[#9333ea] dark:border-green-500" />
            </div>
          </div>
          <span>{t('poland_map.active_upcoming_progress')}</span>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-[#EAB308]" />
            <div
              className="absolute -inset-1 rounded-full border border-[#EAB308]"
              style={{ borderStyle: 'dashed' }}
            />
          </div>
          <span>{t('poland_map.coming_soon')}</span>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="h-2 w-2 rounded-full bg-[#9CA3AF]" />
          <Link
            href={'/how-to-become-an-organizer' as Route}
            className="hover:text-purple"
          >
            {t('poland_map.paused_join_organizer')}
          </Link>
        </div>
      </div>
    </div>
  );
};
