import { CITIES } from '@/content/cities';
import { PolandMap } from './PolandMap';
import { getUpcomingEvents } from '@/utils/getUpcomingEvents';
import { Event } from '@/components/FeaturedEvents';
import { MessagesSquare } from 'lucide-react';
import { DiscordCommunity } from '@/components/DiscordCommunity';
import { ADDITIONAL_EVENTS } from '@/content/additionalEvents';
import { filterUpcomingEvents } from '@/utils/eventUtils';

export const JoinUs = async () => {
  const apiEvents: Event[] | null = await getUpcomingEvents();
  const allEvents: Event[] = [...(apiEvents || []), ...ADDITIONAL_EVENTS];

  const events = filterUpcomingEvents(allEvents);

  return (
    <section
      className="flex w-full snap-y scroll-mt-16 flex-col justify-between bg-slate-100/50 p-12 px-2 lg:px-8 dark:bg-slate-700/10"
      id="joinus"
    >
      <div className="flex w-full flex-col gap-4 p-4">
        <h2 className="text-center text-3xl font-bold">Join Us</h2>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col p-4 md:flex-row">
        <div className="w-full md:w-1/2">
          <PolandMap cities={CITIES} events={events} />
        </div>
        <div className="w-full p-4 md:w-1/2">
          <p className="pb-6">
            <strong>meet.js</strong> is a family of local meetups all around
            Poland. They&apos;re for-community and by-community, non-commercial
            and organized by passionate individuals. Free to attend or
            for-charity. With the main goal of getting the Web Developers
            community together and facilitating knowledge exchange and
            camraderie.
          </p>
          <p className="pb-6">
            <strong>Click your city</strong> to learn how to join your local
            event as an attendee, spekaer or sponsor.
          </p>
          <p className="pb-6">
            If you don&apos;t see your city on the map, consider starting a
            local meet.js!
          </p>

          <div className="mt-4 border-t pt-6">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <MessagesSquare className="h-5 w-5 text-[#5865F2]" />
              Join our Discord Community
            </h3>

            <DiscordCommunity />
          </div>
        </div>
      </div>
    </section>
  );
};
