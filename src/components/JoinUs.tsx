import { CITIES } from '@/content/cities';
import { PolandMap } from './PolandMap';
import { getUpcomingEvents } from '@/utils/getUpcomingEvents';
import { Event } from '@/components/FeaturedEvents';
import { MessagesSquare } from 'lucide-react';
import { DiscordCommunity } from '@/components/DiscordCommunity';
import { ADDITIONAL_EVENTS } from '@/content/additionalEvents';
import { filterUpcomingEvents } from '@/utils/eventUtils';
import { getTranslate } from '@/tolgee/server';
import { OrganizerLink } from '@/components/OrganizerLink';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const JoinUs = async () => {
  const t = await getTranslate();

  const apiEvents: Event[] | null = await getUpcomingEvents();
  const allEvents: Event[] = [...(apiEvents || []), ...ADDITIONAL_EVENTS];

  const events = filterUpcomingEvents(allEvents);

  return (
    <section
      className="flex w-full snap-y scroll-mt-16 flex-col justify-between bg-slate-100/50 p-12 px-2 lg:px-8 dark:bg-slate-700/10"
      id="joinus"
    >
      <div className="flex w-full flex-col gap-4 p-4">
        <h2 className="text-center text-3xl font-bold">{t('join_us.title')}</h2>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col p-4 md:flex-row">
        <div className="w-full md:w-1/2">
          <PolandMap cities={CITIES} events={events} />
        </div>
        <div className="w-full p-4 md:w-1/2">
          <p className="pb-6">{t('join_us.description')}</p>
          <p className="pb-6">{t('join_us.click_city')}</p>
          <div className="rounded-xl border border-purple/10 bg-white p-5 text-purple">
            <h3 className="text-xl font-semibold">
              {t('join_us.organize_title')}
            </h3>
            <p className="mt-3 leading-relaxed">{t('join_us.start_local')}</p>
            <OrganizerLink
              source="map"
              className={cn(
                buttonVariants(),
                'mt-4 h-auto min-h-11 max-w-full whitespace-normal bg-green px-5 py-3 text-center text-purple hover:bg-green/80',
              )}
            >
              {t('join_us.organize_cta')}
            </OrganizerLink>
          </div>

          <div className="mt-4 border-t pt-6">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <MessagesSquare className="h-5 w-5 text-[#5865F2]" />
              {t('join_us.discord_title')}
            </h3>

            <DiscordCommunity />
          </div>
        </div>
      </div>
    </section>
  );
};
