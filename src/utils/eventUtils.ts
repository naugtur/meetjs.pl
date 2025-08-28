import type { EventType } from '@/types/event';

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
 * Sorts events by date with configurable order
 */
export const sortEventsByDate = (events: EventType[], ascending = true): EventType[] => {
  return [...events].sort((a, b) => {
    try {
      const dateA = parseEventDate(a.date);
      const dateB = parseEventDate(b.date);
      const diff = dateA.getTime() - dateB.getTime();
      return ascending ? diff : -diff;
    } catch {
      console.warn(`Error sorting events: ${a.name} or ${b.name} has invalid date format`);
      return 0;
    }
  });
};

/**
 * Filters events to only include those that are:
 * 1. Today or in the future
 * 2. Not more than 6 months in the future (to avoid showing events too far ahead)
 * Then sorts them by date
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
      console.warn(`Invalid date format for event: ${event.name} - ${event.date}`);
      return false;
    }
  });

  return sortEventsByDate(filteredEvents);
};
