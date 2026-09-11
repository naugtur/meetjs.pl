import 'server-only';
import { SpeakersSchema, type SpeakerType } from '@/types/speaker';
import { isDevelopment } from '@/utils/isDevelopment';
import { MOCK_SPEAKERS } from '@/utils/speakersMock';

const isPlaceholderToken = (token: string | undefined): boolean => {
  if (!token) return true;
  return (
    token.includes('<') || token.includes('>') || token.startsWith('your_')
  );
};

export const fetchSpeakers = async (
  apiUrl: string | undefined,
  apiToken: string | undefined,
): Promise<SpeakerType[]> => {
  if (!apiUrl || isPlaceholderToken(apiToken)) {
    if (isDevelopment()) {
      console.warn(
        '[fetchSpeakers] Missing or placeholder SPEAKERS_API_TOKEN, returning mock data for development',
      );
      return MOCK_SPEAKERS;
    }
    return [];
  }

  try {
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${apiToken}`,
      },
    });

    if (!res.ok) {
      const body = await res.text();
      const isHtml =
        body.trimStart().toLowerCase().startsWith('<!doctype') ||
        body.includes('<html');

      if (isDevelopment()) {
        console.warn(
          `[fetchSpeakers] API returned ${res.status} ${res.statusText}. ` +
            (isHtml
              ? 'Response is HTML (likely Cloudflare/WAF challenge). '
              : '') +
            'Using mock data for development.',
        );
        return MOCK_SPEAKERS;
      }

      console.error(
        `[fetchSpeakers] API returned ${res.status} ${res.statusText}:`,
        body.slice(0, 200),
      );
      return [];
    }

    const json = await res.json();
    return SpeakersSchema.parse(json);
  } catch (error) {
    if (isDevelopment()) {
      console.warn(
        '[fetchSpeakers] Failed to fetch or parse speakers, using mock data for development:',
        error,
      );
      return MOCK_SPEAKERS;
    }

    console.error('[fetchSpeakers] Failed to fetch or parse speakers:', error);
    return [];
  }
};
