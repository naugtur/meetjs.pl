import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MOCK_PAST_EVENTS, MOCK_UPCOMING_EVENTS } from '@/utils/eventsMock';
import { MOCK_SPEAKERS } from '@/utils/speakersMock';
import type { EventType } from '@/types/event';
import type { SpeakerType } from '@/types/speaker';

const createFetchResponse = (overrides: Partial<Response> = {}): Response =>
  ({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    ...overrides,
  }) as Response;

const sampleEvent: EventType = {
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

const sampleSpeaker: SpeakerType = {
  id: 1,
  name: 'John',
  surname: 'Doe',
  slug: 'john-doe',
  image: 'https://example.com/john.jpg',
  events_count: 5,
  url: 'https://example.com',
};

const mockEnv = (overrides: Record<string, string | undefined> = {}) => ({
  env: {
    EVENTS_API_URL: 'http://localhost:3000/api/events',
    SPEAKERS_API_URL: 'https://api.example.com/speakers',
    SPEAKERS_API_TOKEN: 'real-token',
    ...overrides,
  },
});

describe('Crossweb API client', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('NODE_ENV', 'development');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  describe('getUpcomingEvents', () => {
    it('returns parsed API data with normalized city names and passes AbortSignal', async () => {
      const fetchSpy = vi.fn(() =>
        Promise.resolve(
          createFetchResponse({
            json: () => Promise.resolve({ event1: sampleEvent }),
          }),
        ),
      );
      global.fetch = fetchSpy;
      vi.doMock('@/env', () => mockEnv());

      const { getUpcomingEvents } = await import('@/lib/crossweb');
      const result = await getUpcomingEvents();

      expect(result).toHaveLength(1);
      expect(result?.[0]?.name).toBe('Real Meetup');
      expect(result?.[0]?.city).toBe('Gdańsk');
      expect(fetchSpy).toHaveBeenCalledWith(
        new URL('http://localhost:3000/api/events'),
        expect.objectContaining({
          signal: expect.any(AbortSignal),
          next: { revalidate: 3_600 },
        }),
      );
    });

    it('skips malformed individual events without dropping valid ones', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      global.fetch = vi.fn(() =>
        Promise.resolve(
          createFetchResponse({
            json: () =>
              Promise.resolve({
                good: sampleEvent,
                bad: { id: 'not-a-number', type: 'UnknownType' },
              }),
          }),
        ),
      );
      vi.doMock('@/env', () => mockEnv());

      const { getUpcomingEvents } = await import('@/lib/crossweb');
      const result = await getUpcomingEvents();

      expect(result).toHaveLength(1);
      expect(result?.[0]?.id).toBe(1);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Skipping invalid event "bad"'),
        expect.any(String),
      );
    });

    it('treats all-invalid non-empty object as payload error', async () => {
      vi.unstubAllEnvs();
      vi.stubEnv('NODE_ENV', 'production');
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      global.fetch = vi.fn(() =>
        Promise.resolve(
          createFetchResponse({
            json: () => Promise.resolve({ error: 'invalid api key' }),
          }),
        ),
      );
      vi.doMock('@/env', () => mockEnv());

      const { getUpcomingEvents } = await import('@/lib/crossweb');
      const result = await getUpcomingEvents();

      expect(result).toBeNull();
      expect(errorSpy).toHaveBeenCalled();
    });

    it('returns empty array for {} and null for null', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve(
          createFetchResponse({
            json: () => Promise.resolve({}),
          }),
        ),
      );
      vi.doMock('@/env', () => mockEnv());

      const { getUpcomingEvents } = await import('@/lib/crossweb');
      expect(await getUpcomingEvents()).toEqual([]);

      vi.resetModules();
      global.fetch = vi.fn(() =>
        Promise.resolve(
          createFetchResponse({
            json: () => Promise.resolve(null),
          }),
        ),
      );
      vi.doMock('@/env', () => mockEnv());

      const { getUpcomingEvents: getUpcomingNull } =
        await import('@/lib/crossweb');
      expect(await getUpcomingNull()).toBeNull();
    });

    it('detects HTML/Cloudflare 403 responses and falls back to mock events in dev', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      global.fetch = vi.fn(() =>
        Promise.resolve(
          createFetchResponse({
            ok: false,
            status: 403,
            statusText: 'Forbidden',
            text: () =>
              Promise.resolve('<!DOCTYPE html><html>Just a moment...</html>'),
          }),
        ),
      );
      vi.doMock('@/env', () => mockEnv());

      const { getUpcomingEvents } = await import('@/lib/crossweb');
      const result = await getUpcomingEvents();

      expect(result).toHaveLength(MOCK_UPCOMING_EVENTS.length);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Cloudflare/WAF'),
      );
    });

    it('returns null when API fails in production', async () => {
      vi.unstubAllEnvs();
      vi.stubEnv('NODE_ENV', 'production');
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      global.fetch = vi.fn(() =>
        Promise.resolve(
          createFetchResponse({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
            text: () => Promise.resolve('server error'),
          }),
        ),
      );
      vi.doMock('@/env', () => mockEnv());

      const { getUpcomingEvents } = await import('@/lib/crossweb');
      const result = await getUpcomingEvents();

      expect(result).toBeNull();
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[getUpcomingEvents]'),
        'server error',
      );
    });
  });

  describe('getPastEvents', () => {
    it('fetches with ?old=1 and sorts past events descending by date', async () => {
      const fetchSpy = vi.fn(() =>
        Promise.resolve(
          createFetchResponse({
            json: () =>
              Promise.resolve({
                older: { ...sampleEvent, id: 1, date: '01.01.2024' },
                newer: { ...sampleEvent, id: 2, date: '15.06.2025' },
              }),
          }),
        ),
      );
      global.fetch = fetchSpy;
      vi.doMock('@/env', () => mockEnv());

      const { getPastEvents } = await import('@/lib/crossweb');
      const result = await getPastEvents();

      expect(fetchSpy).toHaveBeenCalledWith(
        new URL('http://localhost:3000/api/events?old=1'),
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        }),
      );
      expect(result.map((e) => e.id)).toEqual([2, 1]);
    });

    it('returns sorted mock past events in development on API failure', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      global.fetch = vi.fn(() =>
        Promise.resolve(
          createFetchResponse({
            ok: false,
            status: 503,
            statusText: 'Service Unavailable',
            text: () => Promise.resolve('unavailable'),
          }),
        ),
      );
      vi.doMock('@/env', () => mockEnv());

      const { getPastEvents } = await import('@/lib/crossweb');
      const result = await getPastEvents();

      expect(result).toHaveLength(MOCK_PAST_EVENTS.length);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Using mock past events for development'),
      );
    });

    it('returns empty array on failure in production', async () => {
      vi.unstubAllEnvs();
      vi.stubEnv('NODE_ENV', 'production');
      vi.spyOn(console, 'error').mockImplementation(() => {});
      global.fetch = vi.fn(() =>
        Promise.resolve(
          createFetchResponse({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
            text: () => Promise.resolve('boom'),
          }),
        ),
      );
      vi.doMock('@/env', () => mockEnv());

      const { getPastEvents } = await import('@/lib/crossweb');
      expect(await getPastEvents()).toEqual([]);
    });
  });

  describe('getSpeakers', () => {
    it('returns parsed API speakers with Basic auth header', async () => {
      const fetchSpy = vi.fn(() =>
        Promise.resolve(
          createFetchResponse({
            json: () => Promise.resolve([sampleSpeaker]),
          }),
        ),
      );
      global.fetch = fetchSpy;
      vi.doMock('@/env', () => mockEnv());

      const { getSpeakers } = await import('@/lib/crossweb');
      const result = await getSpeakers();

      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe('John');
      expect(fetchSpy).toHaveBeenCalledWith(
        'https://api.example.com/speakers',
        expect.objectContaining({
          headers: { Authorization: 'Basic real-token' },
          signal: expect.any(AbortSignal),
          next: { revalidate: 3_600 },
        }),
      );
    });

    it('skips malformed individual speakers without dropping valid ones', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      global.fetch = vi.fn(() =>
        Promise.resolve(
          createFetchResponse({
            json: () => Promise.resolve([sampleSpeaker, { id: 'broken' }]),
          }),
        ),
      );
      vi.doMock('@/env', () => mockEnv());

      const { getSpeakers } = await import('@/lib/crossweb');
      const result = await getSpeakers();

      expect(result).toHaveLength(1);
      expect(result[0]?.slug).toBe('john-doe');
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Skipping invalid speaker at index 1'),
        expect.any(String),
      );
    });

    it('returns mock speakers when token is placeholder in development', async () => {
      vi.doMock('@/env', () => mockEnv({ SPEAKERS_API_TOKEN: '<your_token>' }));
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const { getSpeakers } = await import('@/lib/crossweb');
      const result = await getSpeakers();

      expect(result).toEqual(MOCK_SPEAKERS);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('returning mock data for development'),
      );
    });

    it('returns empty array when token is placeholder in production', async () => {
      vi.unstubAllEnvs();
      vi.stubEnv('NODE_ENV', 'production');
      vi.doMock('@/env', () => mockEnv({ SPEAKERS_API_TOKEN: '<your_token>' }));

      const { getSpeakers } = await import('@/lib/crossweb');
      expect(await getSpeakers()).toEqual([]);
    });

    it('returns mock speakers on HTML (Cloudflare) response in development', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      global.fetch = vi.fn(() =>
        Promise.resolve(
          createFetchResponse({
            ok: false,
            status: 403,
            statusText: 'Forbidden',
            text: () => Promise.resolve('<!DOCTYPE html><html>...</html>'),
          }),
        ),
      );
      vi.doMock('@/env', () => mockEnv());

      const { getSpeakers } = await import('@/lib/crossweb');
      const result = await getSpeakers();

      expect(result).toEqual(MOCK_SPEAKERS);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Cloudflare/WAF'),
      );
    });

    it('returns empty array on API error in production', async () => {
      vi.unstubAllEnvs();
      vi.stubEnv('NODE_ENV', 'production');
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      global.fetch = vi.fn(() =>
        Promise.resolve(
          createFetchResponse({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
            text: () => Promise.resolve('server error'),
          }),
        ),
      );
      vi.doMock('@/env', () => mockEnv());

      const { getSpeakers } = await import('@/lib/crossweb');
      expect(await getSpeakers()).toEqual([]);
      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
