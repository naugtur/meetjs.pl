import { renderSuspended } from '@nuxt/test-utils/runtime';
import { cleanup, screen } from '@testing-library/vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { EventType } from '~~/src/types/event';
import EventCard from './EventCard.vue';

// Base mock event data (modify as needed)
const baseEvent: EventType = {
  id: 1,
  date_add: 1713200000,
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
  topic: ['Testing', 'Vue'],
};

// Formats a Date as DD.MM.YYYY
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()}`;
};

// Formats a Date as HH:MM
const formatTime = (date: Date): string =>
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

const renderEvent = (event: EventType) =>
  renderSuspended(EventCard, { props: { event } });

const eventAt = (date: Date, overrides: Partial<EventType> = {}) => ({
  ...baseEvent,
  date: formatDate(date),
  time: formatTime(date),
  ...overrides,
});

describe('EventCard', () => {
  // A fixed "now" for consistent relative times
  const mockNow = new Date('2025-04-16T12:00:00+02:00');

  beforeEach(() => {
    // Only Date is faked: the Nuxt test app relies on real timers
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(mockNow);
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('renders an upcoming event today', async () => {
    const eventDate = new Date(mockNow);
    eventDate.setHours(14, 0, 0); // Today, 2 hours from now
    const event = eventAt(eventDate);

    await renderEvent(event);

    expect(screen.getByText(event.name)).toBeInTheDocument();
    expect(screen.getByText(`${event.date} (Wednesday)`)).toBeInTheDocument();
    expect(screen.getByText(event.time)).toBeInTheDocument();
    expect(screen.getByText(event.address!)).toBeInTheDocument();
    expect(screen.getByText(event.city)).toBeInTheDocument();
    expect(
      screen.getByText(/^🎯 Today! Starts in about 2 hours$/),
    ).toBeInTheDocument();
    expect(screen.getByTestId('event-card-wrapper')).toHaveClass(
      'border-yellow-500',
    );
    expect(screen.getByRole('link', { name: /rsvp/i })).toBeInTheDocument();
  });

  it('renders an event in progress', async () => {
    const eventDate = new Date(mockNow);
    eventDate.setHours(11, 0, 0); // Today, started an hour ago

    await renderEvent(eventAt(eventDate));

    expect(
      screen.getByText("🎉 Live now! Why aren't you here?"),
    ).toBeInTheDocument();
    expect(screen.getByTestId('event-card-wrapper')).toHaveClass(
      'border-purple',
    );
    expect(
      screen.queryByRole('link', { name: /rsvp/i }),
    ).not.toBeInTheDocument();
  });

  it('renders a future event (not today)', async () => {
    const eventDate = new Date(mockNow);
    eventDate.setDate(eventDate.getDate() + 1);
    eventDate.setHours(14, 0, 0); // Tomorrow at 2 PM

    await renderEvent(eventAt(eventDate));

    expect(screen.getByText(/^Starts in (about )?1 day$/)).toBeInTheDocument();
    const card = screen.getByTestId('event-card-wrapper');
    expect(card).not.toHaveClass('border-purple');
    expect(card).not.toHaveClass('border-yellow-500');
    expect(screen.getByRole('link', { name: /rsvp/i })).toBeInTheDocument();
  });

  it('renders a past event', async () => {
    const eventDate = new Date(mockNow);
    eventDate.setDate(eventDate.getDate() - 1);
    eventDate.setHours(14, 0, 0); // Yesterday at 2 PM

    await renderEvent(eventAt(eventDate));

    expect(screen.getByText('Event ended')).toBeInTheDocument();
    const card = screen.getByTestId('event-card-wrapper');
    expect(card).not.toHaveClass('border-purple');
    expect(card).not.toHaveClass('border-yellow-500');
    expect(
      screen.queryByRole('link', { name: /rsvp/i }),
    ).not.toBeInTheDocument();
  });

  it('shows "Location TBA" when the address is missing', async () => {
    const eventDate = new Date(mockNow);
    eventDate.setDate(eventDate.getDate() + 1);
    eventDate.setHours(14, 0, 0);

    await renderEvent(
      eventAt(eventDate, { address: null, city: 'Known City' }),
    );

    expect(screen.getByText('Location TBA')).toBeInTheDocument();
    // The city is only shown together with an address
    expect(screen.queryByText('Known City')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /rsvp/i })).toBeInTheDocument();
  });

  it('marks conferences and links to registration', async () => {
    const eventDate = new Date(mockNow);
    eventDate.setDate(eventDate.getDate() + 3);

    await renderEvent(eventAt(eventDate, { type: 'Konferencja' }));

    expect(screen.getByTestId('event-card-wrapper')).toHaveClass(
      'border-amber-400',
    );
    expect(screen.getByText('Conference')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });
});
