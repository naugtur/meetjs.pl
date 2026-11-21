'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  FaArrowUpRightFromSquare,
  FaMagnifyingGlass,
  FaXmark,
} from 'react-icons/fa6';
import { useTranslate } from '@tolgee/react';
import type { SpeakerType } from '@/types/speaker';
import { useLocale } from '@/hooks/useLocale';

type SortOption = 'most_talks' | 'name_asc' | 'name_desc';

// Apply content-visibility: auto only below the initial desktop fold (3 rows × 4 cols)
const ABOVE_FOLD_COUNT = 12;

const normalizeText = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const getFullName = (speaker: SpeakerType): string =>
  `${speaker.name} ${speaker.surname ?? ''}`.trim();

interface SpeakersDirectoryProps {
  speakers: SpeakerType[];
}

export const SpeakersDirectory = ({ speakers }: SpeakersDirectoryProps) => {
  const { t } = useTranslate();
  const { locale } = useLocale();
  const searchId = useId();
  const sortId = useId();

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('most_talks');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredSpeakers = useMemo(() => {
    const normalizedQuery = normalizeText(query);

    const matching = normalizedQuery
      ? speakers.filter((speaker) =>
          normalizeText(getFullName(speaker)).includes(normalizedQuery),
        )
      : speakers;

    return [...matching].sort((a, b) => {
      if (sortBy === 'most_talks') {
        if (b.events_count !== a.events_count) {
          return b.events_count - a.events_count;
        }
        return getFullName(a).localeCompare(getFullName(b), locale);
      }
      if (sortBy === 'name_asc') {
        return getFullName(a).localeCompare(getFullName(b), locale);
      }
      return getFullName(b).localeCompare(getFullName(a), locale);
    });
  }, [speakers, query, sortBy, locale]);

  // Debounced count for screen reader announcements so typing doesn't spam live regions
  const announcedCount = useMemo(() => {
    const normalized = normalizeText(debouncedQuery);
    if (!normalized) return speakers.length;
    return speakers.filter((speaker) =>
      normalizeText(getFullName(speaker)).includes(normalized),
    ).length;
  }, [speakers, debouncedQuery]);

  const sortOptionLabels: Record<SortOption, string> = {
    most_talks: t('speakers_page.sort_most_talks'),
    name_asc: t('speakers_page.sort_name_asc'),
    name_desc: t('speakers_page.sort_name_desc'),
  };

  const statusText = t('speakers_page.showing_count', {
    shown: filteredSpeakers.length,
    total: speakers.length,
  });

  const liveAnnouncement = `${t('speakers_page.showing_count', {
    shown: announcedCount,
    total: speakers.length,
  })} — ${sortOptionLabels[sortBy]}`;

  return (
    <section className="flex w-full flex-col gap-6">
      <search className="flex w-full flex-col gap-4 rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm sm:flex-row sm:items-end dark:border-gray-700 dark:bg-gray-900/60">
        <div className="flex flex-1 flex-col gap-1.5">
          <label
            htmlFor={searchId}
            className="text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {t('speakers_page.search_label')}
          </label>
          <div className="relative flex items-center">
            <FaMagnifyingGlass
              aria-hidden="true"
              className="pointer-events-none absolute left-3 h-4 w-4 text-gray-400"
            />
            <input
              id={searchId}
              name="q"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('speakers_page.search_placeholder')}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-9 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus-visible:outline-green"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={t('speakers_page.clear_search')}
                className="absolute right-2 inline-flex min-h-7 min-w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple dark:hover:bg-gray-700 dark:hover:text-gray-200"
              >
                <FaXmark aria-hidden="true" className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5 sm:w-56">
          <label
            htmlFor={sortId}
            className="text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {t('speakers_page.sort_label')}
          </label>
          <select
            id={sortId}
            name="sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus-visible:outline-green"
          >
            <option value="most_talks">
              {t('speakers_page.sort_most_talks')}
            </option>
            <option value="name_asc">{t('speakers_page.sort_name_asc')}</option>
            <option value="name_desc">
              {t('speakers_page.sort_name_desc')}
            </option>
          </select>
        </div>
      </search>

      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <p aria-hidden="true">{statusText}</p>
        <p role="status" aria-live="polite" className="sr-only">
          {liveAnnouncement}
        </p>
      </div>

      {filteredSpeakers.length > 0 ? (
        <ul
          role="list"
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {filteredSpeakers.map((speaker, index) => {
            const fullName = getFullName(speaker);
            const isBelowFold = index >= ABOVE_FOLD_COUNT;

            return (
              <li
                key={speaker.id}
                style={
                  isBelowFold
                    ? {
                        contentVisibility: 'auto',
                        containIntrinsicSize: 'auto none auto 250px',
                      }
                    : undefined
                }
                className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  {speaker.image ? (
                    <Image
                      src={speaker.image}
                      alt={fullName}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-400"
                    >
                      {speaker.name.charAt(0)}
                      {speaker.surname?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {fullName}
                  </h2>
                  <p className="mt-1 text-sm text-purple dark:text-green">
                    {speaker.events_count}x 🎤
                  </p>
                  <a
                    href={speaker.url}
                    target="_blank"
                    rel="noopener"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {t('speakers_page.view_profile')}
                    <span className="sr-only"> — {fullName}</span>
                    <FaArrowUpRightFromSquare
                      aria-hidden="true"
                      className="h-3 w-3"
                    />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="py-12 text-center text-gray-500 dark:text-gray-400">
          {t('speakers_page.no_matches', { query: query.trim() })}
        </p>
      )}
    </section>
  );
};
