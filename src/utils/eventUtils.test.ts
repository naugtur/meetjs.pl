import { describe, it, expect } from 'vitest';
import { getEventDateRange } from '@/utils/eventUtils';

describe('getEventDateRange', () => {
  it('parses single HH:MM time and defaults end to +3 hours', () => {
    const range = getEventDateRange({ date: '16.04.2025', time: '18:00' });

    expect(range).not.toBeNull();
    expect(range?.start.getFullYear()).toBe(2025);
    expect(range?.start.getMonth()).toBe(3); // April (0-indexed)
    expect(range?.start.getDate()).toBe(16);
    expect(range?.start.getHours()).toBe(18);
    expect(range?.start.getMinutes()).toBe(0);
    expect(range?.end.getHours()).toBe(21);
    expect(range?.end.getMinutes()).toBe(0);
  });

  it('parses HH:MM-HH:MM time range and respects explicit end time', () => {
    const range = getEventDateRange({
      date: '16.04.2025',
      time: '18:00-21:30',
    });

    expect(range).not.toBeNull();
    expect(range?.start.getHours()).toBe(18);
    expect(range?.start.getMinutes()).toBe(0);
    expect(range?.end.getHours()).toBe(21);
    expect(range?.end.getMinutes()).toBe(30);
  });

  it('handles empty time string without producing Invalid Date', () => {
    const range = getEventDateRange({ date: '16.04.2025', time: '' });

    expect(range).not.toBeNull();
    expect(Number.isNaN(range?.start.getTime())).toBe(false);
    expect(Number.isNaN(range?.end.getTime())).toBe(false);
  });

  it('returns null for invalid dates', () => {
    expect(getEventDateRange({ date: 'invalid', time: '18:00' })).toBeNull();
    expect(getEventDateRange({ date: '99.99.2025', time: '18:00' })).toBeNull();
  });
});
