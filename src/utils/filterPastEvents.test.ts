import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { filterPastEvents } from '@/utils/eventUtils';
import type { EventType } from '@/types/event';

const makeEvent = (overrides: Partial<EventType>): EventType => ({
  id: 1,
  date_add: 0,
  date: '01.01.2025',
  time: '18:00',
  name: 'Test Event',
  type: 'Meetup',
  url: 'https://meetjs.pl',
  rsvp: 'https://meetjs.pl',
  city: 'Warszawa',
  address: null,
  image: '',
  serie: 'meet.js',
  topic: ['JavaScript'],
  ...overrides,
});

describe('filterPastEvents', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-21T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('keeps only events strictly before today and sorts newest first', () => {
    const events = [
      makeEvent({ id: 1, date: '10.05.2025', name: 'Older' }),
      makeEvent({ id: 2, date: '21.11.2026', name: 'Today' }),
      makeEvent({ id: 3, date: '01.12.2026', name: 'Future' }),
      makeEvent({ id: 4, date: '15.10.2026', name: 'Recent Past' }),
    ];

    const result = filterPastEvents(events);

    expect(result.map((e) => e.name)).toEqual(['Recent Past', 'Older']);
  });

  it('deduplicates by id preserving the first occurrence', () => {
    const events = [
      makeEvent({ id: 42, date: '01.10.2026', name: 'From Crossweb' }),
      makeEvent({ id: 42, date: '01.10.2026', name: 'Duplicate Additional' }),
    ];

    const result = filterPastEvents(events);

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('From Crossweb');
  });

  it('skips events with invalid date formats safely', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const events = [
      makeEvent({ id: 1, date: 'not-a-date', name: 'Broken' }),
      makeEvent({ id: 2, date: '01.05.2026', name: 'Valid Past' }),
    ];

    const result = filterPastEvents(events);

    expect(result.map((e) => e.name)).toEqual(['Valid Past']);
    expect(warnSpy).toHaveBeenCalled();
  });
});
