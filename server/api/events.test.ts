import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ADDITIONAL_EVENTS } from '~~/src/content/additionalEvents';
import type { EventType } from '~~/src/types/event';

type Handler = (event: {
  query: Record<string, string>;
}) => Promise<EventType[]>;

const event = (id: number, date: string, name = `Event ${id}`): EventType => ({
  id,
  date_add: 0,
  date,
  time: '18:00',
  name,
  type: 'Meetup',
  url: 'https://example.com',
  rsvp: 'https://example.com',
  city: 'Wrocław',
  address: null,
  image: '',
  serie: 'test',
  topic: ['JavaScript'],
});

/**
 * Imports the handler with stubs for the Nitro auto-imports it uses;
 * `getEvents` returns the given Crossweb events.
 */
const loadHandler = async (crossweb: {
  upcoming: EventType[] | null;
  past: EventType[];
}) => {
  vi.stubGlobal('defineEventHandler', (handler: Handler) => handler);
  vi.stubGlobal('getQuery', (event: { query: Record<string, string> }) =>
    Object.fromEntries(Object.entries(event.query)),
  );
  vi.stubGlobal('getEvents', (kind: 'upcoming' | 'past') =>
    Promise.resolve(crossweb[kind]),
  );
  return (await import('./events.get')).default as unknown as Handler;
};

describe('GET /api/events', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-05-10T12:00:00+02:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('returns upcoming Crossweb events (today … +6 months) in date order', async () => {
    const handler = await loadHandler({
      upcoming: [
        event(1, '20.06.2026'),
        event(2, '09.05.2026'), // yesterday
        event(3, '10.05.2026'), // today
        event(4, '20.12.2026'), // more than 6 months ahead
      ],
      past: [],
    });

    const result = await handler({
      query: { when: 'upcoming', additional: '0' },
    });

    expect(result.map(({ id }) => id)).toEqual([3, 1]);
  });

  it('merges ADDITIONAL_EVENTS unless additional=0', async () => {
    // The day before the earliest additional event
    const first = ADDITIONAL_EVENTS.map((item) => {
      const [day, month, year] = item.date.split('.').map(Number);
      return new Date(year!, month! - 1, day!);
    }).sort((a, b) => a.getTime() - b.getTime())[0]!;
    vi.setSystemTime(new Date(first.getTime() - 24 * 60 * 60 * 1000));
    const handler = await loadHandler({ upcoming: [], past: [] });

    const withAdditional = await handler({ query: { when: 'upcoming' } });
    const crosswebOnly = await handler({
      query: { when: 'upcoming', additional: '0' },
    });

    expect(crosswebOnly).toEqual([]);
    expect(withAdditional.length).toBeGreaterThan(0);
    expect(
      withAdditional.every((item) =>
        ADDITIONAL_EVENTS.some(({ id }) => id === item.id),
      ),
    ).toBe(true);
  });

  it('treats unavailable upcoming events as an empty list', async () => {
    const handler = await loadHandler({ upcoming: null, past: [] });

    expect(
      await handler({ query: { when: 'upcoming', additional: '0' } }),
    ).toEqual([]);
  });

  it('returns past events newest first', async () => {
    const handler = await loadHandler({
      upcoming: [],
      past: [
        event(1, '01.02.2026'),
        event(2, '01.04.2026'),
        event(3, '15.01.2026'),
      ],
    });

    const result = await handler({ query: { when: 'past' } });

    expect(result.map(({ id }) => id)).toEqual([2, 1, 3]);
  });
});
