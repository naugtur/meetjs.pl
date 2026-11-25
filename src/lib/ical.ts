import type { EventType } from '@/types/event';

const DEFAULT_DURATION_MINUTES = 180;
const CALENDAR_TIMEZONE = 'Europe/Warsaw';
const MAX_OCTETS_PER_LINE = 75;

const pad2 = (value: number): string => String(value).padStart(2, '0');

export const escapeIcalText = (value: string): string =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\r|\n/g, '\\n');

/**
 * Folds an iCalendar content line per RFC 5545 Section 3.1 (<= 75 octets per line).
 */
export const foldIcalLine = (line: string): string => {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= MAX_OCTETS_PER_LINE) {
    return line;
  }

  const parts: string[] = [];
  let current = '';
  let currentBytes = 0;

  for (const char of line) {
    const charBytes = encoder.encode(char).length;
    const limit =
      parts.length === 0 ? MAX_OCTETS_PER_LINE : MAX_OCTETS_PER_LINE - 1;
    if (currentBytes + charBytes > limit && current.length > 0) {
      parts.push(current);
      current = char;
      currentBytes = charBytes;
    } else {
      current += char;
      currentBytes += charBytes;
    }
  }

  if (current.length > 0) {
    parts.push(current);
  }

  return parts.join('\r\n ');
};

const formatLocalDateTime = (
  year: number,
  month: number,
  day: number,
  totalMinutes: number,
): string => {
  // Handle rollover past midnight (e.g. 22:00 + 3h = 01:00 next day)
  const dt = new Date(
    Date.UTC(
      year,
      month - 1,
      day,
      Math.floor(totalMinutes / 60),
      totalMinutes % 60,
    ),
  );
  return (
    `${dt.getUTCFullYear()}${pad2(dt.getUTCMonth() + 1)}${pad2(dt.getUTCDate())}` +
    `T${pad2(dt.getUTCHours())}${pad2(dt.getUTCMinutes())}00`
  );
};

const formatUtcTimestamp = (date: Date): string =>
  `${date.getUTCFullYear()}${pad2(date.getUTCMonth() + 1)}${pad2(date.getUTCDate())}` +
  `T${pad2(date.getUTCHours())}${pad2(date.getUTCMinutes())}${pad2(date.getUTCSeconds())}Z`;

const parseEventDateTimeParts = (
  event: Pick<EventType, 'date' | 'time'>,
): { start: string; end: string } | null => {
  const [day, month, year] = event.date.split('.').map(Number);
  if (!day || !month || !year || day > 31 || month > 12) {
    return null;
  }

  const [startPart, endPart] = event.time.split('-').map((s) => s.trim());

  let startMinutes = 18 * 60; // default 18:00 if time missing
  if (startPart) {
    const [h, m] = startPart.split(':').map(Number);
    if (!Number.isNaN(h)) {
      startMinutes = h * 60 + (Number.isNaN(m) ? 0 : m);
    }
  }

  let endMinutes = startMinutes + DEFAULT_DURATION_MINUTES;
  if (endPart) {
    const [h, m] = endPart.split(':').map(Number);
    if (!Number.isNaN(h)) {
      const parsedEnd = h * 60 + (Number.isNaN(m) ? 0 : m);
      if (parsedEnd > startMinutes) {
        endMinutes = parsedEnd;
      }
    }
  }

  return {
    start: formatLocalDateTime(year, month, day, startMinutes),
    end: formatLocalDateTime(year, month, day, endMinutes),
  };
};

export const buildEventsIcal = (
  events: EventType[],
  options: { calendarName?: string; now?: Date } = {},
): string => {
  const calendarName = options.calendarName || 'meet.js Poland Events';
  const dtstamp = formatUtcTimestamp(options.now ?? new Date());

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//meet.js Poland//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeIcalText(calendarName)}`,
    `X-WR-TIMEZONE:${CALENDAR_TIMEZONE}`,
    'REFRESH-INTERVAL;VALUE=DURATION:PT12H',
    'X-PUBLISHED-TTL:PT12H',
  ];

  for (const event of events) {
    const times = parseEventDateTimeParts(event);
    if (!times) {
      continue;
    }

    const locationParts = [event.address, event.city].filter(Boolean);
    const location = locationParts.join(', ');
    const eventUrl = event.rsvp || event.url;

    const descriptionParts: string[] = [];
    if (event.url) {
      descriptionParts.push(`Event page: ${event.url}`);
    }
    if (event.rsvp && event.rsvp !== event.url) {
      descriptionParts.push(`RSVP: ${event.rsvp}`);
    }
    if (event.topic.length > 0) {
      descriptionParts.push(`Topics: ${event.topic.join(', ')}`);
    }

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:event-${event.id}@meetjs.pl`);
    lines.push(`DTSTAMP:${dtstamp}`);
    lines.push(`DTSTART;TZID=${CALENDAR_TIMEZONE}:${times.start}`);
    lines.push(`DTEND;TZID=${CALENDAR_TIMEZONE}:${times.end}`);
    lines.push(`SUMMARY:${escapeIcalText(event.name)}`);

    if (location) {
      lines.push(`LOCATION:${escapeIcalText(location)}`);
    }
    if (eventUrl) {
      lines.push(`URL:${eventUrl}`);
    }
    if (descriptionParts.length > 0) {
      lines.push(`DESCRIPTION:${escapeIcalText(descriptionParts.join('\n'))}`);
    }
    if (event.topic.length > 0) {
      lines.push(`CATEGORIES:${event.topic.map(escapeIcalText).join(',')}`);
    }

    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');

  return `${lines.map(foldIcalLine).join('\r\n')}\r\n`;
};
