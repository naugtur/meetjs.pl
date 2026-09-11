import { render, screen, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, beforeEach } from 'vitest';
import { PromoBanners } from './PromoBanners';
import { Promo } from '@/types/promo';

const promos: Promo[] = [
  {
    id: 'test1',
    message: 'Test Promo 1',
    cta: 'CTA 1',
    ticketLink: 'https://example.com/1',
    expiresAt: '2099-12-31T23:59:59+02:00',
    icon: '🎉',
    name: '',
    gradient: '',
  },
  {
    id: 'test2',
    message: 'Test Promo 2',
    cta: 'CTA 2',
    ticketLink: 'https://example.com/2',
    expiresAt: '2000-01-01T00:00:00+02:00', // expired
    icon: '🔥',
    name: '',
    gradient: '',
  },
];

describe('PromoBanners', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders only non-expired promos', () => {
    render(() => <PromoBanners promos={promos} />);
    const messageElement = screen.getByText(/Test Promo 1/i, { exact: false });
    expect(messageElement).toBeInTheDocument();
    expect(
      screen.queryByText(/Test Promo 2/i, { exact: false }),
    ).not.toBeInTheDocument();
  });

  it('dismisses a promo and does not show it again', () => {
    render(() => <PromoBanners promos={promos} />);
    const closeBtn = screen.getAllByLabelText('Dismiss promo banner')[0];
    fireEvent.click(closeBtn);
    expect(screen.queryByText('Test Promo 1')).not.toBeInTheDocument();
    // Simulate re-mount (like page reload)
    render(() => <PromoBanners promos={promos} />);
    expect(screen.queryByText('Test Promo 1')).not.toBeInTheDocument();
  });
});
