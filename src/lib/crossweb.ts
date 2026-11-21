import { cache } from 'react';
import { env } from '@/env';
import { EventSchema, type EventType } from '@/types/event';
import { SpeakerSchema, type SpeakerType } from '@/types/speaker';
import { changeCityName } from '@/utils/changeCityName';
import { sortEventsByDate } from '@/utils/eventUtils';
import { MOCK_PAST_EVENTS, MOCK_UPCOMING_EVENTS } from '@/utils/eventsMock';
import { isDevelopment } from '@/utils/isDevelopment';
import { MOCK_SPEAKERS } from '@/utils/speakersMock';

const CROSSWEB_TIMEOUT_MS = 10_000;
const EVENTS_REVALIDATE_SECONDS = 86_400; // 24 hours
const SPEAKERS_REVALIDATE_SECONDS = 3_600; // 1 hour

const isHtmlResponse = (body: string): boolean => {
  const normalized = body.trimStart().toLowerCase();
  return normalized.startsWith('<!doctype') || normalized.includes('<html');
};

const isPlaceholderToken = (token: string | undefined): boolean => {
  if (!token) return true;
  return (
    token.includes('<') || token.includes('>') || token.startsWith('your_')
  );
};

class CrosswebHttpError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly isHtml: boolean;
  readonly bodyPreview: string;

  constructor(status: number, statusText: string, body: string) {
    const isHtml = isHtmlResponse(body);
    const bodyPreview = body.slice(0, 200);
    super(
      `Crossweb API returned ${status} ${statusText}` +
        (isHtml ? ' (HTML response — likely Cloudflare/WAF challenge)' : ''),
    );
    this.name = 'CrosswebHttpError';
    this.status = status;
    this.statusText = statusText;
    this.isHtml = isHtml;
    this.bodyPreview = bodyPreview;
  }
}

const fetchCrosswebJson = async (
  url: URL | string,
  options: {
    revalidate: number;
    headers?: HeadersInit;
  },
): Promise<unknown> => {
  const response = await fetch(url, {
    headers: options.headers,
    next: { revalidate: options.revalidate },
    signal: AbortSignal.timeout(CROSSWEB_TIMEOUT_MS),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new CrosswebHttpError(response.status, response.statusText, body);
  }

  return response.json();
};

const logCrosswebError = (
  label: string,
  error: unknown,
  fallbackMessage: string,
): void => {
  if (isDevelopment()) {
    if (error instanceof CrosswebHttpError) {
      console.warn(`[${label}] ${error.message}. ${fallbackMessage}`);
    } else {
      console.warn(`[${label}] ${fallbackMessage}:`, error);
    }
    return;
  }

  if (error instanceof CrosswebHttpError) {
    console.error(`[${label}] ${error.message}`, error.bodyPreview);
  } else {
    console.error(`[${label}] Failed to fetch or parse:`, error);
  }
};

const parseCrosswebEvents = (
  raw: unknown,
  label: string,
): EventType[] | null => {
  if (raw === null) {
    return null;
  }

  if (typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error(`[${label}] Expected an object map of events or null`);
  }

  const entries = Object.entries(raw as Record<string, unknown>);
  if (entries.length === 0) {
    return [];
  }

  const validEvents: EventType[] = [];
  for (const [key, value] of entries) {
    const parsed = EventSchema.safeParse(value);
    if (parsed.success) {
      validEvents.push(changeCityName(parsed.data));
    } else {
      console.warn(
        `[${label}] Skipping invalid event "${key}":`,
        parsed.error.issues
          .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
          .join(', '),
      );
    }
  }

  if (validEvents.length === 0) {
    throw new Error(
      `[${label}] None of the ${entries.length} entries matched EventSchema`,
    );
  }

  return validEvents;
};

const parseCrosswebSpeakers = (raw: unknown, label: string): SpeakerType[] => {
  if (!Array.isArray(raw)) {
    throw new Error(`[${label}] Expected an array of speakers`);
  }

  if (raw.length === 0) {
    return [];
  }

  const validSpeakers: SpeakerType[] = [];
  for (let i = 0; i < raw.length; i++) {
    const parsed = SpeakerSchema.safeParse(raw[i]);
    if (parsed.success) {
      validSpeakers.push(parsed.data);
    } else {
      console.warn(
        `[${label}] Skipping invalid speaker at index ${i}:`,
        parsed.error.issues
          .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
          .join(', '),
      );
    }
  }

  if (validSpeakers.length === 0) {
    throw new Error(
      `[${label}] None of the ${raw.length} entries matched SpeakerSchema`,
    );
  }

  return validSpeakers;
};

export const getUpcomingEvents = cache(
  async (): Promise<EventType[] | null> => {
    try {
      const raw = await fetchCrosswebJson(new URL(env.EVENTS_API_URL), {
        revalidate: EVENTS_REVALIDATE_SECONDS,
      });
      return parseCrosswebEvents(raw, 'getUpcomingEvents');
    } catch (error) {
      logCrosswebError(
        'getUpcomingEvents',
        error,
        'Using mock events for development',
      );
      if (isDevelopment()) {
        return MOCK_UPCOMING_EVENTS.map(changeCityName);
      }
      return null;
    }
  },
);

export const getPastEvents = cache(async (): Promise<EventType[]> => {
  try {
    const url = new URL(env.EVENTS_API_URL);
    url.searchParams.set('old', '1');

    const raw = await fetchCrosswebJson(url, {
      revalidate: EVENTS_REVALIDATE_SECONDS,
    });
    const parsed = parseCrosswebEvents(raw, 'getPastEvents');
    return sortEventsByDate(parsed ?? [], false);
  } catch (error) {
    logCrosswebError(
      'getPastEvents',
      error,
      'Using mock past events for development',
    );
    if (isDevelopment()) {
      return sortEventsByDate(MOCK_PAST_EVENTS.map(changeCityName), false);
    }
    return [];
  }
});

export const getSpeakers = cache(async (): Promise<SpeakerType[]> => {
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
    const raw = await fetchCrosswebJson(env.SPEAKERS_API_URL, {
      headers: {
        Authorization: `Basic ${env.SPEAKERS_API_TOKEN}`,
      },
      revalidate: SPEAKERS_REVALIDATE_SECONDS,
    });
    return parseCrosswebSpeakers(raw, 'getSpeakers');
  } catch (error) {
    logCrosswebError(
      'getSpeakers',
      error,
      'Using mock speakers for development',
    );
    if (isDevelopment()) {
      return MOCK_SPEAKERS;
    }
    return [];
  }
});
