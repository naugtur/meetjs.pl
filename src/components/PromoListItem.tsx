'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Promo } from '@/types/promo';
import { Calendar, MapPin, ChevronDown, ExternalLink } from 'lucide-react';

interface PromoListItemProps {
  promo: Promo;
  variant: 'event' | 'software' | 'learning';
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const variantStyles = {
  event: {
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
    defaultIcon: '🎟️',
    ctaGradient:
      'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
  },
  software: {
    iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    defaultIcon: '🖥️',
    ctaGradient:
      'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700',
  },
  learning: {
    iconBg: 'bg-gradient-to-br from-green-500 to-teal-600',
    defaultIcon: '📚',
    ctaGradient:
      'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700',
  },
};

export function PromoListItem({ promo, variant }: PromoListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const styles = variantStyles[variant];

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (promo.discountCode) {
      navigator.clipboard.writeText(promo.discountCode);
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 ${isExpanded ? 'ring-1 ring-gray-300 dark:ring-gray-600' : ''}`}
    >
      {/* Header row */}
      <div className="flex w-full flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
        {/* Clickable area for expand */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex flex-1 items-center gap-3 text-left sm:gap-4"
        >
          {/* Logo */}
          {promo.image ? (
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
              <Image
                src={promo.image}
                alt={`${promo.name} logo`}
                fill
                className="object-contain p-1"
              />
            </div>
          ) : (
            <div
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-xl text-white ${styles.iconBg}`}
            >
              {promo.icon || styles.defaultIcon}
            </div>
          )}

          {/* Info */}
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-gray-900 dark:text-white">
              {promo.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {promo.message}
            </p>
          </div>

          <ChevronDown
            className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Meta - separate from expand button */}
        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3">
          {promo.discountCode && (
            <button
              onClick={handleCopyCode}
              className="rounded-md border border-dashed border-gray-300 bg-gray-50 px-2 py-1 font-mono text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              title="Click to copy"
            >
              {promo.discountCode}
            </button>
          )}

          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(promo.expiresAt)}</span>
          </div>

          {promo.city && variant === 'event' && (
            <div className="flex max-w-[100px] items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{promo.city}</span>
            </div>
          )}

          {promo.ticketLink ? (
            <a
              href={promo.ticketLink}
              target="_blank"
              rel="noopener"
              onClick={handleCtaClick}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-white transition-all ${styles.ctaGradient}`}
            >
              {promo.cta}
            </a>
          ) : (
            <span className="whitespace-nowrap rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-400">
              {promo.cta}
            </span>
          )}
        </div>
      </div>

      {/* Expanded content */}
      <div
        className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {promo.description && (
          <div className="border-t border-gray-100 px-4 py-4 dark:border-gray-700">
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {promo.description}
            </p>
            {promo.eventLink && (
              <a
                href={promo.eventLink}
                target="_blank"
                rel="noopener"
                className="mt-3 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Visit website
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
