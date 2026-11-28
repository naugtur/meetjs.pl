'use client';

import Image from 'next/image';
import { ExternalLink, Globe } from 'lucide-react';
import type { RecommendedResource } from '@/content/recommended';
import DiscountCodeSection from './DiscountCodeSection';

const getDomain = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return domain.startsWith('www.') ? domain.substring(4) : domain;
  } catch {
    return url;
  }
};

const categoryStyles: Record<
  RecommendedResource['category'],
  { label: string; badgeClass: string; iconBg: string }
> = {
  'open-source': {
    label: 'Open Source',
    badgeClass:
      'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  },
  course: {
    label: 'Course',
    badgeClass:
      'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800',
    iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600',
  },
  newsletter: {
    label: 'Newsletter',
    badgeClass:
      'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600',
    iconBg: 'bg-gradient-to-br from-gray-700 to-gray-900',
  },
};

interface RecommendedCardProps {
  resource: RecommendedResource;
}

export default function RecommendedCard({ resource }: RecommendedCardProps) {
  const style = categoryStyles[resource.category];
  const ctaTextColor = resource.textColor || 'text-white';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-4 border-b border-gray-100 p-6 dark:border-gray-700">
        {resource.image ? (
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 ring-2 ring-gray-100 dark:ring-gray-600">
            <Image
              src={resource.image}
              alt={`${resource.name} logo`}
              fill
              className="object-contain p-3"
            />
          </div>
        ) : (
          <div
            className={`flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg text-3xl text-white ${style.iconBg}`}
          >
            {resource.icon || '✨'}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${style.badgeClass}`}
            >
              {style.label}
            </span>
            {resource.pppSupport && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                <Globe className="h-3 w-3" />
                {resource.pppSupport.badge}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {resource.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {resource.tagline}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          {resource.description}
        </p>

        {resource.pppSupport?.code && (
          <DiscountCodeSection
            discountCode={resource.pppSupport.code}
            variant="software"
          />
        )}

        <div className="mt-auto">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-600">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Website
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {getDomain(resource.url)}
              </p>
            </div>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 p-6 dark:border-gray-700">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener"
          className={`block w-full rounded-lg py-3 text-center font-semibold shadow transition-all hover:shadow-lg ${ctaTextColor} ${resource.gradient}`}
        >
          {resource.cta}
        </a>
      </div>
    </div>
  );
}
