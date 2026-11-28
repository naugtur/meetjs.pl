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
      'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-800',
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  },
  course: {
    label: 'Course',
    badgeClass:
      'bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-950 dark:text-violet-200 dark:border-violet-800',
    iconBg: 'bg-gradient-to-br from-purple-600 to-indigo-600',
  },
  newsletter: {
    label: 'Newsletter',
    badgeClass:
      'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700',
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
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-4 border-b border-border p-6">
        {resource.image ? (
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border">
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
              <span className="inline-flex items-center gap-1 rounded-full border border-teal-300 bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-800 dark:border-teal-700 dark:bg-teal-950 dark:text-teal-200">
                <Globe className="h-3 w-3" />
                {resource.pppSupport.badge}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-card-foreground">
            {resource.name}
          </h3>
          <p className="text-sm text-muted-foreground">{resource.tagline}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-6 leading-relaxed text-card-foreground/80">
          {resource.description}
        </p>

        {resource.pppSupport?.code && (
          <DiscountCodeSection
            discountCode={resource.pppSupport.code}
            variant="software"
          />
        )}

        <div className="mt-auto">
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium text-card-foreground">
                Website
              </p>
              <p className="text-sm text-muted-foreground">
                {getDomain(resource.url)}
              </p>
            </div>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener"
              className="text-purple-600 hover:opacity-80 dark:text-violet-400"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-6">
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
