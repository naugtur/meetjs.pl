import type { EventType, EventTypeName } from '@/types/event';
import { EventTypeEnum } from '@/types/event';

/**
 * Type-safe function to check if event is a conference
 * Uses EventTypeEnum values instead of hardcoded strings
 */
export const isConferenceEvent = (eventType: EventTypeName): boolean => {
  const conferenceTypes: EventTypeName[] = [
    EventTypeEnum.enum.Conference,
    EventTypeEnum.enum.Konferencja,
  ];
  return conferenceTypes.includes(eventType);
};

/**
 * Parses a date string in DD.MM.YYYY format to a Date object
 */
const parseEventDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('.').map(Number);

  if (!day || !month || !year || day > 31 || month > 12) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }

  return new Date(year, month - 1, day); // month is 0-indexed in Date constructor
};

/**
 * Parses event time string and returns start and end times in minutes since midnight
 * Supports formats: "HH:MM", "HH:MM-HH:MM"
 */
const parseEventTime = (
  timeStr: string,
): { start: number; end: number | null } => {
  const timeRange = timeStr.split('-');
  const startTime = timeRange[0]?.trim();
  const endTime = timeRange[1]?.trim();

  if (!startTime) {
    return { start: 0, end: null };
  }

  const [startHour, startMin] = startTime.split(':').map(Number);
  const start = (startHour || 0) * 60 + (startMin || 0);

  let end: number | null = null;
  if (endTime) {
    const [endHour, endMin] = endTime.split(':').map(Number);
    end = (endHour || 0) * 60 + (endMin || 0);
  }

  return { start, end };
};

const DEFAULT_EVENT_DURATION_MS = 3 * 60 * 60 * 1000;

/**
 * Parses an event's DD.MM.YYYY date and HH:MM (or HH:MM-HH:MM) time
 * into local start and end Date instances.
 * Falls back to 3 hours after start when no valid end time is provided.
 * Returns null if the event date is invalid.
 */
export const getEventDateRange = (
  event: Pick<EventType, 'date' | 'time'>,
): { start: Date; end: Date } | null => {
  try {
    const baseDate = parseEventDate(event.date);
    const { start: startMinutes, end: endMinutes } = parseEventTime(event.time);

    const start = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate(),
      Math.floor(startMinutes / 60),
      startMinutes % 60,
    );

    const end =
      endMinutes !== null && endMinutes > startMinutes
        ? new Date(
            baseDate.getFullYear(),
            baseDate.getMonth(),
            baseDate.getDate(),
            Math.floor(endMinutes / 60),
            endMinutes % 60,
          )
        : new Date(start.getTime() + DEFAULT_EVENT_DURATION_MS);

    return { start, end };
  } catch {
    return null;
  }
};

/**
 * Checks if an event is currently in progress
 */
const isEventInProgress = (event: EventType): boolean => {
  const range = getEventDateRange(event);
  if (!range) {
    return false;
  }

  const now = new Date();
  return now >= range.start && now <= range.end;
};

/**
 * Sorts events by date with configurable order
 */
export const sortEventsByDate = (
  events: EventType[],
  ascending = true,
): EventType[] => {
  return [...events].sort((a, b) => {
    try {
      const dateA = parseEventDate(a.date);
      const dateB = parseEventDate(b.date);
      const diff = dateA.getTime() - dateB.getTime();
      return ascending ? diff : -diff;
    } catch {
      console.warn(
        `Error sorting events: ${a.name} or ${b.name} has invalid date format`,
      );
      return 0;
    }
  });
};

/**
 * Filters events to only include those that are:
 * 1. Today or in the future
 * 2. Not more than 6 months in the future (to avoid showing events too far ahead)
 * Then sorts them with in-progress events first, followed by upcoming events by date
 */
export const filterUpcomingEvents = (events: EventType[]): EventType[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Set max date to 6 months from now
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);

  const filteredEvents = events.filter((event) => {
    try {
      const eventDate = parseEventDate(event.date);
      return eventDate >= today && eventDate <= maxDate;
    } catch {
      console.warn(
        `Invalid date format for event: ${event.name} - ${event.date}`,
      );
      return false;
    }
  });

  // Sort with in-progress events first, then by date
  return [...filteredEvents].sort((a, b) => {
    const aInProgress = isEventInProgress(a);
    const bInProgress = isEventInProgress(b);

    // In-progress events come first
    if (aInProgress && !bInProgress) return -1;
    if (!aInProgress && bInProgress) return 1;

    // If both in progress or both not in progress, sort by date
    try {
      const dateA = parseEventDate(a.date);
      const dateB = parseEventDate(b.date);
      return dateA.getTime() - dateB.getTime();
    } catch {
      return 0;
    }
  });
};

export type Localization = 'en-US' | 'pl-PL';
export const getEventWeekDay = (
  event: EventType,
  localization: Localization,
): string => {
  const eventDate = parseEventDate(event.date);
  return eventDate.toLocaleDateString(localization, { weekday: 'long' });
};
