import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { OrganizerLink } from './OrganizerLink';
import { trackClientEvent } from '@/lib/analytics';

vi.mock('@/lib/analytics', () => ({ trackClientEvent: vi.fn() }));

describe('OrganizerLink', () => {
  beforeEach(() => vi.clearAllMocks());

  it('links to the organizer page and tracks the entry point', () => {
    render(<OrganizerLink source="hero">Help organize</OrganizerLink>);
    const link = screen.getByRole('link', { name: 'Help organize' });
    expect(link).toHaveAttribute('href', '/how-to-become-an-organizer');
    link.addEventListener('click', (event) => event.preventDefault());
    fireEvent.click(link);
    expect(trackClientEvent).toHaveBeenCalledWith('click_organizer_entry', {
      source: 'hero',
    });
  });

  it.each(['general', 'one-event', 'local-team', 'new-city'] as const)(
    'encodes a %s email without sending its content to analytics',
    (intent) => {
      const subject = 'meet.js — Łódź & pomoc?';
      const body = 'Cześć!\nMiasto: Łódź\nPytania: sala & sponsor?';
      render(
        <OrganizerLink
          source="organizer-path"
          kind="contact"
          intent={intent}
          subject={subject}
          body={body}
        >
          Napisz do nas
        </OrganizerLink>,
      );
      const link = screen.getByRole('link', { name: 'Napisz do nas' });
      const url = new URL(link.getAttribute('href')!);
      expect(url.protocol).toBe('mailto:');
      expect(url.pathname).toBe('contact@meetjs.pl');
      expect(url.searchParams.get('subject')).toBe(subject);
      expect(url.searchParams.get('body')).toBe(body);
      expect([...url.searchParams.keys()]).toEqual(['subject', 'body']);
      link.addEventListener('click', (event) => event.preventDefault());
      fireEvent.click(link);
      expect(trackClientEvent).toHaveBeenCalledWith('click_organizer_contact', {
        source: 'organizer-path',
        intent,
      });
    },
  );
});
