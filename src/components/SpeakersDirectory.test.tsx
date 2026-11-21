import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { SpeakersDirectory } from '@/components/SpeakersDirectory';
import type { SpeakerType } from '@/types/speaker';

vi.mock('@tolgee/react', () => ({
  useTranslate: () => ({
    t: (key: string, params?: Record<string, string | number>) => {
      if (!params) return key;
      return `${key}:${JSON.stringify(params)}`;
    },
  }),
}));

vi.mock('@/hooks/useLocale', () => ({
  useLocale: () => ({
    language: 'en',
    locale: 'en-US',
  }),
}));

const speakers: SpeakerType[] = [
  {
    id: 1,
    name: 'Adrian',
    surname: 'Romański',
    slug: 'adrian-romanski',
    events_count: 10,
    url: 'https://crossweb.pl/speaker/adrian',
  },
  {
    id: 2,
    name: 'Zbyszek',
    surname: 'Tenerowicz',
    slug: 'zbyszek-tenerowicz',
    events_count: 12,
    url: 'https://crossweb.pl/speaker/zbyszek',
  },
  {
    id: 3,
    name: 'Anna',
    surname: 'Łukasik',
    slug: 'anna-lukasik',
    events_count: 4,
    url: 'https://crossweb.pl/speaker/anna',
  },
];

describe('SpeakersDirectory', () => {
  afterEach(() => {
    cleanup();
  });

  it('sorts by most talks by default and disambiguates profile links', () => {
    render(<SpeakersDirectory speakers={speakers} />);

    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings.map((h) => h.textContent)).toEqual([
      'Zbyszek Tenerowicz',
      'Adrian Romański',
      'Anna Łukasik',
    ]);

    expect(
      screen.getByRole('link', {
        name: /speakers_page\.view_profile — Adrian Romański/i,
      }),
    ).toHaveAttribute('href', 'https://crossweb.pl/speaker/adrian');
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('filters diacritic-insensitively and clears search cleanly', () => {
    render(<SpeakersDirectory speakers={speakers} />);

    const searchInput = screen.getByLabelText('speakers_page.search_label');
    fireEvent.change(searchInput, { target: { value: 'romanski' } });

    expect(
      screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent),
    ).toEqual(['Adrian Romański']);

    // Polish ł matching with plain l
    fireEvent.change(searchInput, { target: { value: 'lukasik' } });
    expect(
      screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent),
    ).toEqual(['Anna Łukasik']);

    // Clear button restores full list
    fireEvent.click(
      screen.getByRole('button', { name: 'speakers_page.clear_search' }),
    );
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(3);
  });

  it('reorders speakers when changing the sort dropdown', () => {
    render(<SpeakersDirectory speakers={speakers} />);

    const sortSelect = screen.getByLabelText('speakers_page.sort_label');
    fireEvent.change(sortSelect, { target: { value: 'name_asc' } });

    expect(
      screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent),
    ).toEqual(['Adrian Romański', 'Anna Łukasik', 'Zbyszek Tenerowicz']);

    fireEvent.change(sortSelect, { target: { value: 'name_desc' } });
    expect(
      screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent),
    ).toEqual(['Zbyszek Tenerowicz', 'Anna Łukasik', 'Adrian Romański']);
  });

  it('shows empty match state when no speaker matches the query', () => {
    render(<SpeakersDirectory speakers={speakers} />);

    fireEvent.change(screen.getByLabelText('speakers_page.search_label'), {
      target: { value: 'nonexistent' },
    });

    expect(screen.queryAllByRole('heading', { level: 2 })).toHaveLength(0);
    expect(screen.getByText(/speakers_page\.no_matches/i)).toBeInTheDocument();
  });
});
