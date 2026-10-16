import type { DiscordServerData } from '~~/src/types/discord';
import type { EventType } from '~~/src/types/event';
import type { SpeakerType } from '~~/src/types/speaker';

// Server data shared by several components; the fixed keys make components on
// one page reuse a single request (and a single payload entry).

/**
 * Upcoming events (today … +6 months, in-progress first). With
 * `additional: false` only Crossweb events, as in the homepage carousel.
 */
export const useUpcomingEvents = ({ additional = true } = {}) =>
  useFetch<EventType[]>('/api/events', {
    key: additional ? 'events-upcoming' : 'events-upcoming-crossweb',
    query: additional
      ? { when: 'upcoming' }
      : { when: 'upcoming', additional: '0' },
    default: () => [],
  });

/** Past Crossweb events, newest first. */
export const usePastEvents = () =>
  useFetch<EventType[]>('/api/events', {
    key: 'events-past',
    query: { when: 'past' },
    default: () => [],
  });

export const useSpeakers = () =>
  useFetch<SpeakerType[]>('/api/speakers', {
    key: 'speakers',
    default: () => [],
  });

export const useDiscordServer = () =>
  useFetch<DiscordServerData | null>('/api/discord', {
    key: 'discord',
    default: () => null,
  });
