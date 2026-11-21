import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { EventType } from '@/types/event';

const mockEvents: EventType[] = [
  {
    id: 101,
    date_add: 0,
    date: '01.12.2026',
    time: '18:00',
    name: 'pub.meet.js',
    type: 'Spotkanie',
    url: 'https://crossweb.pl/wydarzenia/pub-meet-js/',
    rsvp: 'https://crossweb.pl/wydarzenia/pub-meet-js/',
    city: 'Warszawa',
    address: 'Henryka Sienkiewicza 4',
    image: '',
    serie: 'meet.js',
    topic: ['JavaScript'],
  },
];

describe('GET /api/events.ics', () => {
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

  it('returns an RFC 5545 text/calendar feed with CORS headers', async () => {
    const { GET } = await import('@/app/api/events.ics/route');
    const res = await GET(new Request('https://meetjs.pl/api/events.ics'));

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe(
      'text/calendar; charset=utf-8',
    );
    expect(res.headers.get('content-disposition')).toBe(
      'inline; filename="meetjs-events.ics"',
    );
    expect(res.headers.get('access-control-allow-origin')).toBe('*');

    const text = await res.text();
    expect(text).toContain('BEGIN:VCALENDAR');
    expect(text).toContain('SUMMARY:pub.meet.js');
    expect(text).toContain('UID:event-101@meetjs.pl');
  });

  it('customizes calendar name and filename when filtered by city', async () => {
    const { GET } = await import('@/app/api/events.ics/route');
    const res = await GET(
      new Request('https://meetjs.pl/api/events.ics?city=Warszawa'),
    );

    expect(res.headers.get('content-disposition')).toBe(
      'inline; filename="meetjs-warszawa-events.ics"',
    );
    const text = await res.text();
    expect(text).toContain('X-WR-CALNAME:meet.js Warszawa Events');
  });
});
