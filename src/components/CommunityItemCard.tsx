'use client';

import { type CommunityItem } from '@/content/communityParticipation';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export const CommunityItemCard = ({ item }: { item: CommunityItem }) => {
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

  const getTypeGradient = (type: CommunityItem['type']) => {
    switch (type) {
      case 'survey':
        return 'from-blue-500 to-cyan-500';
      case 'initiative':
        return 'from-green-500 to-emerald-500';
      case 'research':
        return 'from-purple-500 to-pink-500';
      case 'collaboration':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeBadgeColor = (type: CommunityItem['type']) => {
    switch (type) {
      case 'survey':
        return 'bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-800';
      case 'initiative':
        return 'bg-green-500/10 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-800';
      case 'research':
        return 'bg-purple-500/10 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-800';
      case 'collaboration':
        return 'bg-orange-500/10 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-800';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200 dark:bg-gray-500/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  return (
    <div className="group relative h-full overflow-hidden rounded-3xl border border-white/20 bg-white/60 shadow-xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/60">
      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getTypeGradient(item.type)} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
      />

      <div className="relative flex h-full flex-col">
        {/* Top Section - Image & Badge */}
        <div className="relative p-6 pb-4">
          {item.image && (
            <div className="mb-4 flex items-center justify-between">
              <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-white shadow-lg ring-2 ring-white/50 transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 dark:bg-gray-900 dark:ring-gray-700/50">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
              <Badge
                className={`flex items-center gap-1.5 rounded-full border-0 px-3 py-1.5 font-semibold shadow-md ${getTypeBadgeColor(item.type)}`}
              >
                {getTypeIcon(item.type)}
                <span className="text-xs">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
              </Badge>
            </div>
          )}

          {/* Title */}
          <h3 className="mb-2 text-2xl font-black leading-tight text-gray-900 dark:text-white">
            {item.title}
          </h3>

          {/* Organization & Date */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <Users className="h-3.5 w-3.5" />
              <span className="font-medium">{item.organization}</span>
            </div>
            {item.endDate && (
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {new Date(item.endDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600" />

        {/* Middle Section - Content */}
        <div className="flex-1 space-y-3 p-6">
          {/* Tags - Visual Focus */}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-gray-900/5 px-2.5 py-1 text-xs font-semibold text-gray-700 backdrop-blur-sm dark:bg-white/5 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="rounded-lg bg-gray-900/5 px-2.5 py-1 text-xs font-semibold text-gray-500 dark:bg-white/5 dark:text-gray-400">
                +{item.tags.length - 3}
              </span>
            )}
          </div>

          {/* Description - 2-3 lines */}
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {item.description}
          </p>
        </div>

        {/* Bottom Section - CTA */}
        <div className="p-6 pt-0">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group/btn flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${getTypeGradient(item.type)} px-6 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:brightness-110`}
          >
            <span>{item.ctaText}</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
