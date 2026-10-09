import { cacheLife } from 'next/cache';
import { env } from '@/env';
import { SpeakersSchema, SpeakerType } from '@/types/speaker';
import { isDevelopment } from '@/utils/isDevelopment';
import { MOCK_SPEAKERS } from '@/utils/speakersMock';

const isPlaceholderToken = (token: string | undefined): boolean => {
  if (!token) return true;
  return (
    token.includes('<') || token.includes('>') || token.startsWith('your_')
  );
};

export const getSpeakers = async (): Promise<SpeakerType[]> => {
  'use cache';
  const speakers = await fetchSpeakers();
  // Retry soon after a failed or empty response instead of caching it for an hour
  if (speakers.length > 0) {
    cacheLife('hours');
  } else {
    cacheLife('minutes');
  }
  return speakers;
};

const fetchSpeakers = async (): Promise<SpeakerType[]> => {
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
    const res = await fetch(env.SPEAKERS_API_URL, {
      headers: {
        Authorization: `Basic ${env.SPEAKERS_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      const body = await res.text();
      const isHtml =
        body.trimStart().toLowerCase().startsWith('<!doctype') ||
        body.includes('<html');

      if (isDevelopment()) {
        console.warn(
          `[getSpeakers] API returned ${res.status} ${res.statusText}. ` +
            (isHtml
              ? 'Response is HTML (likely Cloudflare/WAF challenge). '
              : '') +
            'Using mock data for development.',
        );
        return MOCK_SPEAKERS;
      }

      console.error(
        `[getSpeakers] API returned ${res.status} ${res.statusText}:`,
        body.slice(0, 200),
      );
      return [];
    }

    const json = await res.json();
    return SpeakersSchema.parse(json);
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
