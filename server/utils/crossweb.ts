import { EventsSchema, type EventType } from '~~/src/types/event';
import { SpeakersSchema, type SpeakerType } from '~~/src/types/speaker';
import { changeCityName } from '~~/src/utils/changeCityName';
import {
  MOCK_PAST_EVENTS,
  MOCK_UPCOMING_EVENTS,
} from '~~/src/utils/eventsMock';
import { isDevelopment } from '~~/src/utils/isDevelopment';
import { MOCK_SPEAKERS } from '~~/src/utils/speakersMock';

export type EventsKind = 'upcoming' | 'past';

const ONE_DAY = 60 * 60 * 24;
const ONE_HOUR = 60 * 60;

const isPlaceholderToken = (token: string | undefined): boolean =>
  !token ||
  token.includes('<') ||
  token.includes('>') ||
  token.startsWith('your_');

const looksLikeHtml = (body: string) =>
  body.trimStart().toLowerCase().startsWith('<!doctype') ||
  body.includes('<html');

/** Fetches and validates Crossweb events. Throws on any failure. */
export const fetchCrosswebEvents = async (
  eventsApiUrl: string,
  kind: EventsKind,
): Promise<EventType[]> => {
  const url = new URL(eventsApiUrl);
  if (kind === 'past') url.searchParams.set('old', '1');

  const response = await fetch(url);
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Events API returned ${response.status}: ${response.statusText}\n${body.slice(0, 200)}`,
    );
  }
  const data = EventsSchema.parse(await response.json());
  return Object.values(data ?? {}).map(changeCityName);
};

/** Fetches and validates Crossweb speakers. Throws on any failure. */
export const fetchCrosswebSpeakers = async (
  speakersApiUrl: string,
  speakersApiToken: string,
): Promise<SpeakerType[]> => {
  const response = await fetch(speakersApiUrl, {
    headers: { Authorization: `Basic ${speakersApiToken}` },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Speakers API returned ${response.status} ${response.statusText}` +
        (looksLikeHtml(body)
          ? ' (HTML response, likely a Cloudflare/WAF challenge)'
          : `: ${body.slice(0, 200)}`),
    );
  }
  return SpeakersSchema.parse(await response.json());
};

// Successful responses are cached (stale-while-revalidate); failures are not,
// and a failed refresh keeps serving the previous data.
const cachedEvents = defineCachedFunction(
  (kind: EventsKind) =>
    fetchCrosswebEvents(useServerEnv().EVENTS_API_URL, kind),
  {
    name: 'crossweb-events',
    maxAge: ONE_DAY,
    swr: true,
    getKey: (kind: EventsKind) => kind,
  },
);

const cachedSpeakers = defineCachedFunction(
  () => {
    const env = useServerEnv();
    return fetchCrosswebSpeakers(
      env.SPEAKERS_API_URL!,
      env.SPEAKERS_API_TOKEN!,
    );
  },
  {
    name: 'crossweb-speakers',
    maxAge: ONE_HOUR,
    swr: true,
    getKey: () => 'all',
  },
);

/**
 * Crossweb events with the fallbacks of the Next.js site: mock events in
 * development, no events (upcoming: null, past: []) in production.
 */
export const getEvents = async (
  kind: EventsKind,
): Promise<EventType[] | null> => {
  try {
    return await cachedEvents(kind);
  } catch (error) {
    if (isDevelopment()) {
      console.warn(
        `[getEvents:${kind}] Failed to fetch or parse events, using mock data for development:`,
        error,
      );
      return (kind === 'past' ? MOCK_PAST_EVENTS : MOCK_UPCOMING_EVENTS).map(
        changeCityName,
      );
    }
    console.error(`[getEvents:${kind}] Error fetching events:`, error);
    return kind === 'past' ? [] : null;
  }
};

/** Crossweb speakers; mock speakers in development, [] in production on failure. */
export const getSpeakers = async (): Promise<SpeakerType[]> => {
  const env = useServerEnv();
  if (!env.SPEAKERS_API_URL || isPlaceholderToken(env.SPEAKERS_API_TOKEN)) {
    if (isDevelopment()) {
      console.warn(
        '[getSpeakers] Missing or placeholder SPEAKERS_API_TOKEN, returning mock data for development',
      );
      return MOCK_SPEAKERS;
    }
    return [];
  }
  try {
    return await cachedSpeakers();
  } catch (error) {
    if (isDevelopment()) {
      console.warn(
        '[getSpeakers] Failed to fetch or parse speakers, using mock data for development:',
        error,
      );
      return MOCK_SPEAKERS;
    }
    console.error('[getSpeakers] Failed to fetch or parse speakers:', error);
    return [];
  }
};
