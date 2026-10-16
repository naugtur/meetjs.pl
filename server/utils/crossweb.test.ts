import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { EventType } from '~~/src/types/event';
import type { SpeakerType } from '~~/src/types/speaker';
import {
  MOCK_PAST_EVENTS,
  MOCK_UPCOMING_EVENTS,
} from '~~/src/utils/eventsMock';
import { MOCK_SPEAKERS } from '~~/src/utils/speakersMock';
import type { ServerEnv } from './env';

const createFetchResponse = (overrides: Partial<Response> = {}): Response =>
  ({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    ...overrides,
  }) as Response;

const failedResponse = (status: number, statusText: string, body: string) =>
  createFetchResponse({
    ok: false,
    status,
    statusText,
    text: () => Promise.resolve(body),
  });

const ENV: ServerEnv = {
  EVENTS_API_URL: 'http://localhost:3000/api/events',
  SITE_URL: 'http://localhost:3000',
  DISCORD_SERVER_ID: '1',
  SPEAKERS_API_URL: 'https://api.example.com/speakers',
  SPEAKERS_API_TOKEN: 'real-token',
};

/**
 * Imports the module with stubs for the Nitro auto-imports it uses; cached
 * functions run uncached.
 */
const loadCrossweb = async (env: Partial<ServerEnv> = {}) => {
  vi.stubGlobal('defineCachedFunction', (fn: unknown) => fn);
  vi.stubGlobal('useServerEnv', () => ({ ...ENV, ...env }));
  return import('./crossweb');
};

const apiEvent: EventType = {
  id: 1,
  date_add: 0,
  date: '01.01.2030',
  time: '18:00',
  name: 'Real Meetup',
  type: 'Meetup',
  url: 'https://example.com',
  rsvp: 'https://example.com',
  city: 'Trójmiasto',
  address: null,
  image: '',
  serie: 'real.js',
  topic: ['JavaScript'],
};

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv('NODE_ENV', 'development');
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('getEvents', () => {
  it('returns parsed API data with normalized city names', async () => {
    const fetchMock = vi.fn((_input: string | URL) =>
      Promise.resolve(
        createFetchResponse({
          json: () => Promise.resolve({ event1: apiEvent }),
        }),
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    const { getEvents } = await loadCrossweb();
    const result = await getEvents('upcoming');

    expect(result).toHaveLength(1);
    expect(result?.[0]?.name).toBe('Real Meetup');
    expect(result?.[0]?.city).toBe('Gdańsk');
    expect(String(fetchMock.mock.calls[0]?.[0])).toBe(ENV.EVENTS_API_URL);
  });

  it('requests past events with ?old=1', async () => {
    const fetchMock = vi.fn((_input: string | URL) =>
      Promise.resolve(
        createFetchResponse({ json: () => Promise.resolve(null) }),
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    const { getEvents } = await loadCrossweb();
    const result = await getEvents('past');

    expect(result).toEqual([]);
    expect(String(fetchMock.mock.calls[0]?.[0])).toBe(
      `${ENV.EVENTS_API_URL}?old=1`,
    );
  });

  it('returns mock events when the API fails in development', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.stubGlobal('fetch', () =>
      Promise.resolve(failedResponse(500, 'Internal Server Error', 'error')),
    );

    const { getEvents } = await loadCrossweb();

    expect(await getEvents('upcoming')).toHaveLength(
      MOCK_UPCOMING_EVENTS.length,
    );
    expect(await getEvents('past')).toHaveLength(MOCK_PAST_EVENTS.length);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('using mock data for development'),
      expect.any(Error),
    );
  });

  it('returns mock events for an invalid payload in development', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.stubGlobal('fetch', () =>
      Promise.resolve(
        createFetchResponse({
          json: () => Promise.resolve({ event1: { name: 'Broken' } }),
        }),
      ),
    );

    const { getEvents } = await loadCrossweb();

    expect(await getEvents('upcoming')).toHaveLength(
      MOCK_UPCOMING_EVENTS.length,
    );
  });

  it('returns no events when the API fails in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('fetch', () =>
      Promise.resolve(failedResponse(500, 'Internal Server Error', 'error')),
    );

    const { getEvents } = await loadCrossweb();

    expect(await getEvents('upcoming')).toBeNull();
    expect(await getEvents('past')).toEqual([]);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error fetching events'),
      expect.any(Error),
    );
  });
});

describe('getSpeakers', () => {
  const apiSpeaker: SpeakerType = {
    id: 1,
    name: 'John',
    surname: 'Doe',
    slug: 'john-doe',
    image: 'https://example.com/john.jpg',
    events_count: 5,
    url: 'https://example.com',
  };

  it('returns parsed API data on success', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve(
        createFetchResponse({ json: () => Promise.resolve([apiSpeaker]) }),
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    const { getSpeakers } = await loadCrossweb();
    const result = await getSpeakers();

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('John');
    expect(fetchMock).toHaveBeenCalledWith(ENV.SPEAKERS_API_URL, {
      headers: { Authorization: 'Basic real-token' },
    });
  });

  it('returns mock speakers when the token is a placeholder in development', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const { getSpeakers } = await loadCrossweb({
      SPEAKERS_API_TOKEN: '<your_token>',
    });

    expect(await getSpeakers()).toEqual(MOCK_SPEAKERS);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('returning mock data for development'),
    );
  });

  it('returns an empty array when the token is a placeholder in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');

    const { getSpeakers } = await loadCrossweb({
      SPEAKERS_API_TOKEN: '<your_token>',
    });

    expect(await getSpeakers()).toEqual([]);
  });

  it('returns mock speakers on an HTML (Cloudflare) response in development', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.stubGlobal('fetch', () =>
      Promise.resolve(
        failedResponse(403, 'Forbidden', '<!DOCTYPE html><html>...</html>'),
      ),
    );

    const { getSpeakers } = await loadCrossweb();

    expect(await getSpeakers()).toEqual(MOCK_SPEAKERS);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('using mock data for development'),
      expect.objectContaining({
        message: expect.stringContaining('Cloudflare/WAF'),
      }),
    );
  });

  it('returns an empty array on an API error in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('fetch', () =>
      Promise.resolve(failedResponse(500, 'Internal Server Error', 'error')),
    );

    const { getSpeakers } = await loadCrossweb();

    expect(await getSpeakers()).toEqual([]);
    expect(errorSpy).toHaveBeenCalled();
  });
});
