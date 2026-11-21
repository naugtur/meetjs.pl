import { describe, it, expect } from 'vitest';
import { buildEventsIcal, escapeIcalText, foldIcalLine } from '@/lib/ical';
import type { EventType } from '@/types/event';

const sampleEvent: EventType = {
  id: 60579,
  date_add: 1700000000,
  date: '10.12.2026',
  time: '17:30',
  name: 'meet.js Wrocław — Christmas, Edition; #50',
  type: 'Spotkanie',
  url: 'https://crossweb.pl/wydarzenia/meet-js-wroclaw/',
  rsvp: 'https://www.meetup.com/meet-js-wroclaw/events/123/',
  city: 'Wrocław',
  address: 'Włodkowica 5\nFloor 2',
  image: '',
  serie: 'meet.js',
  topic: ['JavaScript', 'TypeScript'],
};

describe('ical helpers', () => {
  it('escapes RFC 5545 special characters', () => {
    expect(escapeIcalText('A, B; C\\D\nLine 2')).toBe(
      'A\\, B\\; C\\\\D\\nLine 2',
    );
  });

  it('folds lines exceeding 75 UTF-8 octets with CRLF + space', () => {
    const longLine = `SUMMARY:${'A'.repeat(100)}`;
    const folded = foldIcalLine(longLine);
    const segments = folded.split('\r\n');

    expect(segments.length).toBeGreaterThan(1);
    expect(new TextEncoder().encode(segments[0]).length).toBeLessThanOrEqual(
      75,
    );
    expect(segments[1]?.startsWith(' ')).toBe(true);
  });

  it('builds a valid VCALENDAR with CRLF endings and default +3h duration', () => {
    const ics = buildEventsIcal([sampleEvent], {
      now: new Date('2026-11-21T18:00:00Z'),
    });

    expect(ics.endsWith('\r\n')).toBe(true);
    expect(ics).toContain('BEGIN:VCALENDAR\r\n');
    expect(ics).toContain('VERSION:2.0\r\n');
    expect(ics).toContain('UID:event-60579@meetjs.pl\r\n');
    expect(ics).toContain('DTSTAMP:20261121T180000Z\r\n');
    expect(ics).toContain('DTSTART;TZID=Europe/Warsaw:20261210T173000\r\n');
    expect(ics).toContain('DTEND;TZID=Europe/Warsaw:20261210T203000\r\n');
    expect(ics).toContain('CATEGORIES:JavaScript,TypeScript\r\n');
    expect(ics).toContain('END:VEVENT\r\nEND:VCALENDAR\r\n');
  });

  it('respects explicit HH:MM-HH:MM end times and skips invalid dates', () => {
    const rangedEvent: EventType = {
      ...sampleEvent,
      id: 2,
      date: '15.12.2026',
      time: '18:00-21:45',
    };
    const invalidEvent: EventType = {
      ...sampleEvent,
      id: 3,
      date: 'invalid',
    };

    const ics = buildEventsIcal([rangedEvent, invalidEvent], {
      now: new Date('2026-11-21T18:00:00Z'),
    });

    expect(ics).toContain('DTSTART;TZID=Europe/Warsaw:20261215T180000\r\n');
    expect(ics).toContain('DTEND;TZID=Europe/Warsaw:20261215T214500\r\n');
    expect(ics).not.toContain('UID:event-3@meetjs.pl');
  });
});
