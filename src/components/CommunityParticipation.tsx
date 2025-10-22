'use client';

import { type CommunityItem } from '@/content/communityParticipation';
import { Users, Sparkles, ChevronRight } from 'lucide-react';
import { useTranslate } from '@tolgee/react';
import { CommunityItemCard } from './CommunityItemCard';

export const CommunityParticipationClient = ({
  items,
  showViewAll = false,
}: {
  items: CommunityItem[];
  showViewAll?: boolean;
}) => {
  const { t } = useTranslate();

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl dark:bg-blue-900" />
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-100 opacity-20 blur-3xl dark:bg-purple-900" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
            <Sparkles className="h-4 w-4" />
            <span>{t('communityParticipation.title')}</span>
          </div>
          <h2 className="mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl dark:from-white dark:via-gray-200 dark:to-white">
            {t('communityParticipation.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            {t('communityParticipation.description')}
          </p>
          {showViewAll && (
            <div className="mt-6">
              <a
                href="/community"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <span>View all community initiatives</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <CommunityItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-6 py-3 text-sm text-gray-600 shadow-sm dark:bg-gray-800 dark:text-gray-400">
              <Users className="h-4 w-4" />
              <p>{t('communityParticipation.help_text')}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
