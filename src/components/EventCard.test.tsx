import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { EventCard } from '@/components/EventCard';
import type { EventType } from '@/types/event';

// Base mock event data (modify as needed)
const baseEvent: EventType = {
  id: 1,
  date_add: 1713200000, // Example timestamp
  date: 'DD.MM.YYYY', // Will be overridden
  time: 'HH:MM', // Will be overridden
  name: 'Test Event Name',
  type: 'Meetup',
  url: '/test-event',
  rsvp: 'https://example.com/rsvp',
  city: 'Test City',
  address: '123 Test St',
  image: '',
  serie: 'Test Series',
  topic: ['Testing', 'React'],
};

// Helper to format Date object into DD.MM.YYYY
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

// Helper to format Date object into HH:MM
const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

describe('EventCard Component', () => {
  // Set a fixed 'now' date for consistent relative time testing
  const mockNow = new Date('2025-04-16T12:00:00+02:00');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockNow);
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup(); // Clean up JSDOM after each test
  });

  it('Scenario 1: renders correctly for an upcoming event today', () => {
    const eventDate = new Date(mockNow);
    eventDate.setHours(14, 0, 0); // Today at 2 PM (2 hours from mockNow)

    const testEvent: EventType = {
      ...baseEvent,
      date: formatDate(eventDate),
      time: formatTime(eventDate),
    };

    render(<EventCard event={testEvent} />);

    // Check title, date, time, location
    expect(screen.getByText(testEvent.name)).toBeInTheDocument();
    expect(screen.getByText(testEvent.date)).toBeInTheDocument();
    expect(screen.getByText(testEvent.time)).toBeInTheDocument();
    expect(screen.getByText(testEvent.address!)).toBeInTheDocument();
    expect(screen.getByText(testEvent.city)).toBeInTheDocument();

    // Check relative time message (using regex for dynamic part)
    expect(
      screen.getByText(/^🎯 Today! Starts in about 2 hours$/),
    ).toBeInTheDocument(); // Check full text

    // Check border style
    const cardElement = screen.getByTestId('event-card-wrapper'); // Use data-testid
    expect(cardElement).toHaveClass('border-yellow-500');

    // Check RSVP button
    expect(screen.getByRole('link', { name: /rsvp/i })).toBeInTheDocument();
  });

  it('Scenario 2: renders correctly for an event in progress today', () => {
    const eventDate = new Date(mockNow);
    eventDate.setHours(11, 0, 0); // Today at 11 AM (1 hour ago from mockNow)

    const testEvent: EventType = {
      ...baseEvent,
      date: formatDate(eventDate),
      time: formatTime(eventDate),
    };

    render(<EventCard event={testEvent} />);

    // Check message
    expect(
      screen.getByText("🎉 Live now! Why aren't you here?"),
    ).toBeInTheDocument();

    // Check border style
    const cardElement = screen.getByTestId('event-card-wrapper'); // Use data-testid
    expect(cardElement).toHaveClass('border-purple');

    // Check RSVP button is NOT present
    expect(
      screen.queryByRole('link', { name: /rsvp/i }),
    ).not.toBeInTheDocument();
  });

  it('Scenario 3: renders correctly for a future event (not today)', () => {
    const eventDate = new Date(mockNow);
    eventDate.setDate(eventDate.getDate() + 1); // Tomorrow
    eventDate.setHours(14, 0, 0); // Tomorrow at 2 PM

    const testEvent: EventType = {
      ...baseEvent,
      date: formatDate(eventDate),
      time: formatTime(eventDate),
    };

    render(<EventCard event={testEvent} />);

    // Check relative time message
    expect(screen.getByText(/^Starts in (about )?1 day$/)).toBeInTheDocument(); // Check full text, make 'about' optional

    // Check border style (no special border)
    const cardElement = screen.getByTestId('event-card-wrapper'); // Use data-testid
    expect(cardElement).not.toHaveClass('border-purple');
    expect(cardElement).not.toHaveClass('border-yellow-500');

    // Check RSVP button
    expect(screen.getByRole('link', { name: /rsvp/i })).toBeInTheDocument();
  });

  it('Scenario 4: renders correctly for a past event', () => {
    const eventDate = new Date(mockNow);
    eventDate.setDate(eventDate.getDate() - 1); // Yesterday
    eventDate.setHours(14, 0, 0); // Yesterday at 2 PM

    const testEvent: EventType = {
      ...baseEvent,
      date: formatDate(eventDate),
      time: formatTime(eventDate),
    };

    render(<EventCard event={testEvent} />);

    // Check message
    expect(screen.getByText('Event ended')).toBeInTheDocument();

    // Check border style (no special border)
    const cardElement = screen.getByTestId('event-card-wrapper'); // Use data-testid
    expect(cardElement).not.toHaveClass('border-purple');
    expect(cardElement).not.toHaveClass('border-yellow-500');

    // Check RSVP button is NOT present
    expect(
      screen.queryByRole('link', { name: /rsvp/i }),
    ).not.toBeInTheDocument();
  });

  it('Scenario 5: renders correctly when address is missing', () => {
    const eventDate = new Date(mockNow);
    eventDate.setDate(eventDate.getDate() + 1); // Future event
    eventDate.setHours(14, 0, 0);

    const testEvent: EventType = {
      ...baseEvent,
      date: formatDate(eventDate),
      time: formatTime(eventDate),
      address: null, // Explicitly set address to null
      city: 'Known City', // Add a city to ensure it's not displayed
    };

    render(<EventCard event={testEvent} />);

    // Check that 'Location TBA' is displayed
    expect(screen.getByText('Location TBA')).toBeInTheDocument();

    // Check that the city is not displayed when address is null (based on current component logic)
    expect(screen.queryByText(testEvent.city)).not.toBeInTheDocument();

    // Check that RSVP button is still present for future event
    expect(screen.getByRole('link', { name: /rsvp/i })).toBeInTheDocument();
  });
});
