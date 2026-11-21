import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { EventType } from '@/types/event';

const mockEvents: EventType[] = [
  {
    id: 1,
    date_add: 0,
    date: '10.12.2026',
    time: '17:30',
    name: 'meet.js Wrocław',
    type: 'Spotkanie',
    url: 'https://meetjs.pl/wroclaw',
    rsvp: 'https://meetup.com/wroclaw',
    city: 'Wrocław',
    address: 'Włodkowica 5',
    image: '',
    serie: 'meet.js',
    topic: ['JavaScript'],
  },
  {
    id: 2,
    date_add: 0,
    date: '12.12.2026',
    time: '09:00',
    name: 'JS Summit',
    type: 'Conference',
    url: 'https://summit.meetjs.pl',
    rsvp: 'https://summit.meetjs.pl',
    city: 'Warszawa',
    address: 'PGE Narodowy',
    image: '',
    serie: 'meet.js',
    topic: ['JavaScript'],
  },
];

describe('GET /api/events', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-21T12:00:00Z'));

    vi.doMock('@/utils/getUpcomingEvents', () => ({
      getUpcomingEvents: vi.fn(() => Promise.resolve(mockEvents)),
    }));
    vi.doMock('@/content/additionalEvents', () => ({
      ADDITIONAL_EVENTS: [],
    }));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('returns upcoming events JSON with public cache and CORS headers', async () => {
    const { GET } = await import('@/app/api/events/route');
    const res = await GET(new Request('https://meetjs.pl/api/events'));

    expect(res.status).toBe(200);
    expect(res.headers.get('access-control-allow-origin')).toBe('*');
    expect(res.headers.get('cache-control')).toContain('s-maxage=3600');

    const body = await res.json();
    expect(body.count).toBe(2);
    expect(body.events).toHaveLength(2);
    expect(typeof body.updatedAt).toBe('string');
  });

  it('filters by city diacritic-insensitively', async () => {
    const { GET } = await import('@/app/api/events/route');
    const res = await GET(
      new Request('https://meetjs.pl/api/events?city=wroclaw'),
    );

    const body = await res.json();
    expect(body.count).toBe(1);
    expect(body.events[0]?.city).toBe('Wrocław');
  });

  it('filters conferences via ?city=summit and by ?type=', async () => {
    const { GET } = await import('@/app/api/events/route');

    const summitRes = await GET(
      new Request('https://meetjs.pl/api/events?city=summit'),
    );
    const summitBody = await summitRes.json();
    expect(summitBody.count).toBe(1);
    expect(summitBody.events[0]?.name).toBe('JS Summit');

    const typeRes = await GET(
      new Request('https://meetjs.pl/api/events?type=spotkanie'),
    );
    const typeBody = await typeRes.json();
    expect(typeBody.count).toBe(1);
    expect(typeBody.events[0]?.name).toBe('meet.js Wrocław');
  });
});
