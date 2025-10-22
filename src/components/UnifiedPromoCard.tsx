'use client';

import Image from 'next/image';
import type { Promo } from '@/types/promo';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import DiscountCodeSection from './DiscountCodeSection';
import WorkshopInfo from './WorkshopInfo';

const getDomain = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return domain.startsWith('www.') ? domain.substring(4) : domain;
  } catch (e) {
    console.error('Failed to extract domain from URL:', e);
    return url;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

type PromoVariant = 'event' | 'software' | 'learning';

interface VariantConfig {
  iconBg: string;
  defaultIcon: string;
  discountVariant: 'event' | 'software';
  ctaGradient: string;
  ctaTextColor?: string;
  linkColor: string;
  websiteLabel: string;
}

const variantConfigs: Record<PromoVariant, VariantConfig> = {
  event: {
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
    defaultIcon: '🎟️',
    discountVariant: 'event',
    ctaGradient: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    linkColor: 'text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300',
    websiteLabel: 'Event Website',
  },
  software: {
    iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    defaultIcon: '🖥️',
    discountVariant: 'software',
    ctaGradient: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700',
    linkColor: 'text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300',
    websiteLabel: 'Product Website',
  },
  learning: {
    iconBg: 'bg-gradient-to-br from-green-500 to-teal-600',
    defaultIcon: '📚',
    discountVariant: 'software',
    ctaGradient: 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700',
    ctaTextColor: 'text-white',
    linkColor: 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300',
    websiteLabel: 'Course Website',
  },
};

interface UnifiedPromoCardProps {
  promo: Promo;
  variant?: PromoVariant;
}

export default function UnifiedPromoCard({
  promo,
  variant = 'software',
}: UnifiedPromoCardProps) {
  const config = variantConfigs[variant];
  const isEventVariant = variant === 'event';
  
  // Use promo-specific gradient and text color if provided, otherwise use variant defaults
  const ctaGradient = promo.gradient || config.ctaGradient;
  const ctaTextColor = promo.textColor || config.ctaTextColor || 'text-white';
  
  return (
    <a
      href={promo.eventLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Header with Logo/Image */}
      <div className="flex items-center gap-4 border-b border-gray-100 p-6 dark:border-gray-700">
        {promo.image ? (
          <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100 ring-2 ring-gray-100 dark:bg-gray-700 dark:ring-gray-600">
            <Image
              src={promo.image}
              alt={`${promo.name} logo`}
              fill
              className="object-contain p-3"
            />
          </div>
        ) : (
          <div className={`flex h-20 w-20 items-center justify-center rounded-lg text-3xl text-white ${config.iconBg}`}>
            {promo.icon || config.defaultIcon}
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {promo.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {promo.message}
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Description */}
        {promo.description && (
          <div className="mb-6">
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              {promo.description}
            </p>
          </div>
        )}

        {/* Workshop Information - Only for events */}
        {isEventVariant && (
          <WorkshopInfo
            workshopDescription={promo.workshopDescription}
            workshopDiscountCode={promo.workshopDiscountCode}
            workshopLink={promo.workshopLink}
          />
        )}

        {/* Discount Code Section */}
        {promo.discountCode && (
          <DiscountCodeSection
            discountCode={promo.discountCode}
            variant={config.discountVariant}
          />
        )}

        {/* Details Grid - Different for events vs software/learning */}
        {isEventVariant ? (
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Valid Until
                </p>
                <p className="text-sm text-gray-900 dark:text-white">
                  {formatDate(promo.expiresAt)}
                </p>
              </div>
            </div>
            {promo.city && promo.country && (
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Location
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {promo.city}, {promo.country} {promo.emojiRight}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-6 space-y-3">
            {promo.eventLink && (
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-600">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {config.websiteLabel}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getDomain(promo.eventLink)}
                  </p>
                </div>
                <a
                  href={promo.eventLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={config.linkColor}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Additional Event Links */}
        {isEventVariant && promo.eventLink && promo.ticketLink && promo.eventLink !== promo.ticketLink && (
          <div className="mb-6">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-600">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {config.websiteLabel}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getDomain(promo.eventLink)}
                </p>
              </div>
              <a
                href={promo.eventLink}
                target="_blank"
                rel="noopener noreferrer"
                className={config.linkColor}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="border-t border-gray-100 p-6 dark:border-gray-700">
        {promo.ticketLink ? (
          <a
            href={promo.ticketLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full rounded-lg py-3 text-center font-semibold shadow transition-all hover:shadow-lg ${ctaTextColor} ${ctaGradient}`}
          >
            {promo.cta}
          </a>
        ) : (
          <span className={`block w-full rounded-lg py-3 text-center font-semibold shadow opacity-60 ${ctaTextColor}/80 ${ctaGradient}`}>
            {promo.cta}
          </span>
        )}
      </div>
    </a>
  );
}
