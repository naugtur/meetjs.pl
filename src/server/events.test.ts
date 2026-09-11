import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MOCK_UPCOMING_EVENTS } from '@/utils/eventsMock';
import type { EventType } from '@/types/event';
import { fetchUpcomingEvents } from './events';

const API_URL = 'http://localhost:3000/api/events';

const createFetchResponse = (overrides: Partial<Response> = {}): Response =>
  ({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    ...overrides,
  }) as Response;

describe('fetchUpcomingEvents', () => {
  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'development');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('returns parsed API data on success', async () => {
    const apiEvent: EventType = {
      id: 1,
      date_add: 0,
      date: '01.01.2030',
      time: '18:00',
      name: 'Real Meetup',
      type: 'Meetup',
      url: 'https://example.com',
      rsvp: 'https://example.com',
      city: 'Wrocław',
      address: null,
      image: '',
      serie: 'real.js',
      topic: ['JavaScript'],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve(
        createFetchResponse({
          json: () => Promise.resolve({ event1: apiEvent }),
        }),
      ),
    );

    const result = await fetchUpcomingEvents(API_URL);

    expect(result).toHaveLength(1);
    expect(result?.[0]?.name).toBe('Real Meetup');
  });

  it('returns mock events when API fails in development', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
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

    const result = await fetchUpcomingEvents(API_URL);

    expect(result).toHaveLength(MOCK_UPCOMING_EVENTS.length);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('using mock events for development'),
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

    const result = await fetchUpcomingEvents(API_URL);

    expect(result).toBeNull();
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error fetching upcoming events'),
      expect.any(Error),
    );
  });
});
