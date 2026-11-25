import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { EventsFeedLinks } from '@/components/EventsFeedLinks';

vi.mock('@tolgee/react', () => ({
  useTranslate: () => ({
    t: (key: string, params?: Record<string, string | number>) => {
      if (!params) return key;
      return `${key}:${JSON.stringify(params)}`;
    },
  }),
}));

describe('EventsFeedLinks', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders global webcal subscription, Google Calendar, and JSON API links when no city is selected', () => {
    render(<EventsFeedLinks siteUrl="https://meetjs.pl" />);

    const subscribeLink = screen.getByRole('link', {
      name: 'events_page.feeds.subscribe_calendar',
    });
    expect(subscribeLink).toHaveAttribute(
      'href',
      'webcal://meetjs.pl/api/events.ics',
    );
    expect(subscribeLink).not.toHaveAttribute('download');

    const googleLink = screen.getByRole('link', {
      name: 'events_page.feeds.google_calendar',
    });
    expect(googleLink).toHaveAttribute(
      'href',
      `https://calendar.google.com/calendar/r?cid=${encodeURIComponent('webcal://meetjs.pl/api/events.ics')}`,
    );

    const jsonLink = screen.getByRole('link', {
      name: 'events_page.feeds.json_api',
    });
    expect(jsonLink).toHaveAttribute('href', '/api/events');
  });

  it('scopes webcal subscription, Google Calendar, and JSON API links to the selected city', () => {
    render(<EventsFeedLinks city="Wrocław" siteUrl="https://meetjs.pl" />);

    const expectedWebcal =
      'webcal://meetjs.pl/api/events.ics?city=Wroc%C5%82aw';

    const subscribeLink = screen.getByRole('link', {
      name: /events_page\.feeds\.subscribe_city_calendar/,
    });
    expect(subscribeLink).toHaveAttribute('href', expectedWebcal);
    expect(subscribeLink).not.toHaveAttribute('download');

    const googleLink = screen.getByRole('link', {
      name: 'events_page.feeds.google_calendar',
    });
    expect(googleLink).toHaveAttribute(
      'href',
      `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(expectedWebcal)}`,
    );

    const jsonLink = screen.getByRole('link', {
      name: 'events_page.feeds.json_api',
    });
    expect(jsonLink).toHaveAttribute('href', '/api/events?city=Wroc%C5%82aw');
  });

  it('copies the subscription URL and announces status outside the button without disabling it', async () => {
    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(<EventsFeedLinks city="Warszawa" siteUrl="https://meetjs.pl" />);

    const copyBtn = screen.getByRole('button', {
      name: 'events_page.feeds.copy_subscribe_url',
    });
    const statusRegion = screen.getByRole('status');
    expect(copyBtn.contains(statusRegion)).toBe(false);

    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(
        'https://meetjs.pl/api/events.ics?city=Warszawa',
      );
      expect(statusRegion.textContent).toContain('events_page.feeds.copied');
    });
    expect(copyBtn).not.toBeDisabled();
  });

  it('announces failure when clipboard write rejects', async () => {
    const writeText = vi.fn(() => Promise.reject(new Error('denied')));
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(<EventsFeedLinks siteUrl="https://meetjs.pl" />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'events_page.feeds.copy_subscribe_url',
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole('status').textContent).toContain(
        'events_page.feeds.copy_failed',
      );
    });
  });
});
