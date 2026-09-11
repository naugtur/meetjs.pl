import { For, Show } from 'solid-js';
import { City } from '@/content/cities';
import { Event } from '@/components/FeaturedEvents';
import { ADDITIONAL_EVENTS } from '@/content/additionalEvents';
import { useTranslate } from '@/i18n';

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

export const PolandMap = (props: MapProps) => {
  const { t } = useTranslate();
  const now = new Date();
  const events = () => props.events ?? [];

  const getCityEventStatus = (cityName: string) => {
    const cityEvents = events().filter((event) => event.city === cityName);

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
    return events().some(
      (event) =>
        event.city === cityName &&
        ADDITIONAL_EVENTS.some(
          (additionalEvent) => additionalEvent.id === event.id,
        ),
    );
  };

  return (
    <div class="flex flex-col gap-2">
      <div class="relative h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 280 244"
          class="h-full w-full"
        >
          <polygon
            points="70.067,190.289 70.067,198.219 63.458,204.828 51.563,190.289 51.563,181.698 22.156,168.481 12.494,128.164 13.526,97.904 3.783,87.567 2,46.886 48.259,29.704 65.771,12.192 103.77,2.165 111.039,21.774 132.186,31.026 145.403,23.096 222.061,24.418 235.938,33.009 248.825,97.771 235.071,103.595 227.678,115.944 241.225,122.222 239.904,153.943 258,180.096 216.774,223.992 215.452,241.835 200.253,238.531 189.019,229.279 144.081,241.835 133.508,225.314 121.613,227.957 110.378,212.097"
            fill="#bcd35d"
            stroke="#2b1932"
            stroke-width="2"
          />
          <For each={props.cities}>
            {(city) => {
              const eventStatus = getCityEventStatus(city.name);
              const hasPartnership = hasPartnershipEvent(city.name);

              return (
                <g>
                  <a href={city.href}>
                    <g class="city-marker group">
                      {/* City dot - split if has partnership events */}
                      <Show
                        when={eventStatus !== 'none' && hasPartnership}
                        fallback={
                          <circle
                            cx={city.pointPosition.x}
                            cy={city.pointPosition.y}
                            r="3"
                            fill={getCityFillColor(city.status)}
                            class="cursor-pointer hover:opacity-80"
                          />
                        }
                      >
                        <foreignObject
                          x={city.pointPosition.x - 3}
                          y={city.pointPosition.y - 3}
                          width="6"
                          height="6"
                          class="cursor-pointer hover:opacity-80"
                        >
                          <div class="flex h-[6px] w-[6px]">
                            <div
                              class="h-[6px] w-[3px] rounded-l-full"
                              style={{
                                'background-color': getCityFillColor(
                                  city.status,
                                ),
                              }}
                            />
                            <div class="h-[6px] w-[3px] rounded-r-full bg-[#9333ea]" />
                          </div>
                        </foreignObject>
                      </Show>

                      {/* Event status circle */}
                      <Show when={eventStatus !== 'none'}>
                        <circle
                          cx={city.pointPosition.x}
                          cy={city.pointPosition.y}
                          r="6"
                          fill="none"
                          stroke={
                            eventStatus === 'in-progress'
                              ? '#9333ea'
                              : '#219eab'
                          }
                          stroke-width={
                            eventStatus === 'in-progress' ? '2' : '1'
                          }
                          class={
                            eventStatus === 'in-progress'
                              ? 'animate-pulse dark:stroke-green-500'
                              : ''
                          }
                        />
                      </Show>

                      {/* Coming soon dashed circle */}
                      <Show
                        when={
                          city.status === 'coming-soon' &&
                          eventStatus === 'none'
                        }
                      >
                        <circle
                          cx={city.pointPosition.x}
                          cy={city.pointPosition.y}
                          r="6"
                          fill="none"
                          stroke="#EAB308"
                          stroke-width="1"
                          stroke-dasharray="2,1"
                        />
                      </Show>
                    </g>
                    <text
                      x={city.textPosition.x}
                      y={city.textPosition.y}
                      font-size="10"
                      fill={getCityTextFillColor(city.status)}
                      class="cursor-pointer"
                    >
                      {city.name}
                    </text>
                  </a>
                </g>
              );
            }}
          </For>
        </svg>
      </div>

      <div class="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
        <div class="flex items-center gap-2 whitespace-nowrap">
          <div class="flex items-center gap-3">
            <div class="h-2 w-2 rounded-full bg-[#219eab]" />
            <div class="relative">
              <div class="h-2 w-2 rounded-full bg-[#219eab]" />
              <div class="absolute -inset-1 rounded-full border border-[#219eab]" />
            </div>
            <div class="relative">
              <div class="flex h-2 w-2">
                <div class="h-2 w-1 rounded-l-full bg-[#219eab]" />
                <div class="h-2 w-1 rounded-r-full bg-[#9333ea]" />
              </div>
              <div class="absolute -inset-1 animate-pulse rounded-full border-2 border-[#9333ea] dark:border-green-500" />
            </div>
          </div>
          <span>{t('poland_map.active_upcoming_progress')}</span>
        </div>
        <div class="flex items-center gap-2 whitespace-nowrap">
          <div class="relative">
            <div class="h-2 w-2 rounded-full bg-[#EAB308]" />
            <div
              class="absolute -inset-1 rounded-full border border-[#EAB308]"
              style={{ 'border-style': 'dashed' }}
            />
          </div>
          <span>{t('poland_map.coming_soon')}</span>
        </div>
        <div class="flex items-center gap-2 whitespace-nowrap">
          <div class="h-2 w-2 rounded-full bg-[#9CA3AF]" />
          <a href="/how-to-become-an-organizer" class="hover:text-purple">
            {t('poland_map.paused_join_organizer')}
          </a>
        </div>
      </div>
    </div>
  );
};
