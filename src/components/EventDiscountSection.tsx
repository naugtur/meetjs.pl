'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { Promo } from '@/types/promo';
import EmptyDiscountState from './EmptyDiscountState';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';

interface EventDiscountSectionProps {
  promos: Promo[];
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

function EventPromoCard({ promo }: { promo: Promo }) {
  const [isExpanded, setIsExpanded] = useState(false);

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
      className={`rounded-lg border border-gray-200 bg-white transition-all hover:border-purple-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 ${isExpanded ? 'ring-1 ring-purple-300' : ''}`}
    >
      {/* Header - clickable to expand */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full flex-col gap-3 p-4 text-left sm:flex-row sm:items-center sm:gap-4"
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
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-xl text-white">
            {promo.icon || '🎟️'}
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

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
          {promo.discountCode && (
            <button
              onClick={handleCopyCode}
              className="rounded-md border border-dashed border-purple-300 bg-purple-50 px-3 py-1 font-mono text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100 dark:border-purple-600 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/30"
              title="Click to copy"
            >
              {promo.discountCode}
            </button>
          )}

          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(promo.expiresAt)}</span>
          </div>

          {promo.city && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate">{promo.city}</span>
            </div>
          )}

          {promo.ticketLink ? (
            <a
              href={promo.ticketLink}
              target="_blank"
              rel="noopener"
              onClick={handleCtaClick}
              className="whitespace-nowrap rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1.5 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-pink-700"
            >
              {promo.cta}
            </a>
          ) : (
            <span className="whitespace-nowrap rounded-md bg-gray-100 px-4 py-1.5 text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-400">
              {promo.cta}
            </span>
          )}

          <ChevronDown
            className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Expanded content */}
      <div
        className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {promo.description && (
          <div className="border-t border-gray-100 px-4 py-4 dark:border-gray-700">
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {promo.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function EventDiscountSection({ promos }: EventDiscountSectionProps) {
  // Filter out expired promos and sort by expiration date
  const visiblePromos = useMemo(() => {
    const now = new Date();
    return promos
      .filter((promo) => new Date(promo.expiresAt) >= now)
      .sort(
        (a, b) =>
          new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime(),
      );
  }, [promos]);

  if (visiblePromos.length === 0) {
    return <EmptyDiscountState type="events" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        {visiblePromos.map((promo) => (
          <EventPromoCard key={promo.id} promo={promo} />
        ))}
      </div>
    </div>
  );
}
