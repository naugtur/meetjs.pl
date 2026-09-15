import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Page from './page';
import pl from '../../../messages/pl.json';
import en from '../../../messages/en.json';

const state = vi.hoisted(() => ({ locale: 'pl' as 'pl' | 'en' }));

vi.mock('@/lib/analytics', () => ({ trackClientEvent: vi.fn() }));
vi.mock('@/tolgee/server', () => ({
  getTranslate: async () => (key: string) => {
    const messages = { pl, en }[state.locale];
    const value = key.split('.').reduce<unknown>((entry, part) => {
      if (entry && typeof entry === 'object' && part in entry) {
        return (entry as Record<string, unknown>)[part];
      }
      throw new Error(`Missing translation: ${state.locale}:${key}`);
    }, messages);
    if (typeof value !== 'string') throw new Error(`Not a translation: ${key}`);
    return value;
  },
}));

describe.each(['pl', 'en'] as const)('organizer page in %s', (locale) => {
  beforeEach(() => {
    state.locale = locale;
  });

  it('renders the three paths with localized email drafts and a plain email fallback', async () => {
    render(await Page());
    const copy = { pl, en }[locale].organizer.recruitment;
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: copy.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'contact@meetjs.pl' }),
    ).toHaveAttribute('href', 'mailto:contact@meetjs.pl');
    expect(
      screen.getByText(copy.support.costs.description),
    ).toBeInTheDocument();
    for (const path of Object.values(copy.paths)) {
      const link = screen.getByRole('link', { name: path.cta });
      const url = new URL(link.getAttribute('href')!);
      expect(url.pathname).toBe('contact@meetjs.pl');
      expect(url.searchParams.get('subject')).toBe(
        `${copy.email.subject} — ${path.title}`,
      );
      expect(url.searchParams.get('body')).toBe(
        `${copy.email.greeting}\n\n${path.intent}\n\n${copy.email.fields}`,
      );
    }
    const contactLinks = screen.getAllByRole('link', {
      name: copy.contact_cta,
    });
    expect(contactLinks).toHaveLength(2);
    for (const link of contactLinks) {
      expect(link).toHaveClass(
        'bg-green',
        'text-purple',
        'whitespace-normal',
        'h-auto',
      );
      expect(link).not.toHaveClass('bg-primary');
      expect(link).not.toHaveClass('whitespace-nowrap');
      expect(link).not.toHaveClass('h-10');
    }
  });

  it('opens the FAQ answer explaining sponsor-funded costs', async () => {
    render(await Page());
    const copy = { pl, en }[locale].organizer.recruitment;
    const trigger = screen.getByRole('button', {
      name: copy.faq.budget.question,
    });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(copy.faq.budget.answer)).toBeVisible();
  });
});
