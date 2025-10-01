'use client';

import {
  getFeaturedCommunityItems,
  type CommunityItem,
} from '@/content/communityParticipation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, TrendingUp, Calendar } from 'lucide-react';
import { useTranslate } from '@tolgee/react';

const CommunityItemCard = ({ item }: { item: CommunityItem }) => {
  const { t } = useTranslate();
  const getTypeIcon = (type: CommunityItem['type']) => {
    switch (type) {
      case 'survey':
        return <TrendingUp className="h-5 w-5" />;
      case 'initiative':
        return <Users className="h-5 w-5" />;
      case 'research':
        return <TrendingUp className="h-5 w-5" />;
      case 'collaboration':
        return <Users className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: CommunityItem['type']) => {
    switch (type) {
      case 'survey':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'initiative':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'research':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'collaboration':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-600 dark:bg-gray-700">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          {getTypeIcon(item.type)}
          <Badge className={getTypeColor(item.type)}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Badge>
        </div>
        {item.endDate && (
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{t('communityParticipation.until_date')} {new Date(item.endDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <h3 className="mb-3 text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
        {item.title}
      </h3>

      <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
        {item.description}
      </p>

      <div className="mb-4">
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <strong className="text-gray-700 dark:text-gray-300">{t('communityParticipation.impact_label')}</strong>{' '}
          {item.impact}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <strong className="text-gray-700 dark:text-gray-300">{t('communityParticipation.by_label')}</strong>{' '}
          {item.organization}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="border-gray-300 text-xs text-gray-700 dark:border-gray-500 dark:text-gray-300"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <Button
        asChild
        className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          {item.ctaText}
          <ExternalLink className="h-4 w-4" />
        </a>
      </Button>
    </div>
  );
};

export const CommunityParticipation = () => {
  const { t } = useTranslate();
  const featuredItems = getFeaturedCommunityItems();

  if (featuredItems.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white py-16 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {t('communityParticipation.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {t('communityParticipation.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {featuredItems.map((item) => (
            <CommunityItemCard key={item.id} item={item} />
          ))}
        </div>

        {featuredItems.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('communityParticipation.help_text')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
