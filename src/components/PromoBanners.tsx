'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import type { Promo } from '@/types/promo';

class DismissedPromo {
  static getKey = (promoId: string) => `promoBannerDismissed_${promoId}`;

  static get = (promoId: string): string | null => {
    return typeof window !== 'undefined'
      ? localStorage.getItem(DismissedPromo.getKey(promoId))
      : null;
  };

  static set = (promoId: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(DismissedPromo.getKey(promoId), '1');
    }
  };
}

const isPromoExpired = (promo: Promo) => new Date(promo.expiresAt) < new Date();
const isPromoDismissed = (promo: Promo) =>
  Boolean(DismissedPromo.get(promo.id));

interface Props {
  promos: Promo[];
}

// Helper to categorize promos (based on the memory about software vs event discounts)
const categorizePromos = (promo: Promo): 'event' | 'software' => {
  // If it has an eventLink or country/city, it's likely an event
  if (promo.eventLink || promo.country || promo.city) return 'event';
  // Otherwise assume it's software
  return 'software';
};

// Helper to prioritize promos (events with closer expiration dates first)
const prioritizePromos = (promos: Promo[]): Promo[] => {
  return [...promos].sort((a, b) => {
    // First sort by category (events first)
    const catA = categorizePromos(a);
    const catB = categorizePromos(b);
    if (catA !== catB) return catA === 'event' ? -1 : 1;

    // Then sort by expiration date (sooner first)
    return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
  });
};

export const PromoBanners = ({ promos }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissedPromos, setDismissedPromos] = useState<Set<string>>(
    new Set(),
  );

  // Load dismissed promos from localStorage on mount (client-side only)
  // This is a legitimate use of setState in useEffect to sync with external storage
  useEffect(() => {
    const dismissed = new Set<string>();
    promos.forEach((promo) => {
      if (isPromoDismissed(promo)) {
        dismissed.add(promo.id);
      }
    });
    setDismissedPromos(dismissed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount to avoid hydration issues

  // Filter and prioritize promos
  const visiblePromos = useMemo(() => {
    const filtered = promos.filter((promo) => {
      if (isPromoExpired(promo)) return false;
      // Check against our state instead of localStorage directly
      if (dismissedPromos.has(promo.id)) return false;
      return true;
    });
    return prioritizePromos(filtered);
  }, [promos, dismissedPromos]);

  // Auto-rotate banners every 6 seconds if there are multiple
  useEffect(() => {
    if (visiblePromos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visiblePromos.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [visiblePromos.length]);

  if (visiblePromos.length === 0) return null;

  // Ensure index is valid (in case promos changed)
  const safeIndex = currentIndex % visiblePromos.length || 0;
  const promo = visiblePromos[safeIndex];

  if (!promo) return null;

  return <PromoBanner promo={promo} />;
};

const PromoBanner = ({ promo }: { promo: Promo }) => {
  const [isVisible, setIsVisible] = useState(true);
  const textColor = promo.textColor || 'text-white';

  const handleDismiss = () => {
    DismissedPromo.set(promo.id);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative">
      <div
        className={`relative ${promo.gradient || 'bg-gradient-to-r from-blue via-purple to-green'} animate-fade-in z-0 py-1.5 shadow md:py-2 ${textColor}`}
      >
        <div className="mx-2 sm:mx-4">
          <div className="flex flex-col items-center justify-between gap-1 text-center md:flex-row md:gap-2 md:text-left">
            <div className="hidden md:block">
              <Icon
                icon={promo.icon}
                image={promo.image}
                emojiLeft={promo.emojiLeft}
              />
            </div>

            <span className="flex-1 text-xs font-medium leading-tight md:text-sm">
              <span className="font-semibold">{promo.name}</span> -{' '}
              {promo.message} <RightEmoji emojiRight={promo.emojiRight} />
            </span>

            <div className="flex items-center gap-2">
              <LinkCTA ticketLink={promo.ticketLink}>{promo.cta}</LinkCTA>
              <button
                onClick={handleDismiss}
                aria-label="Dismiss promo banner"
                className={`ml-2 rounded-full p-1 transition-colors hover:bg-white/20 ${textColor}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Icon = ({
  icon,
  image,
  emojiLeft,
}: {
  icon?: React.ReactNode | string;
  image?: string;
  emojiLeft?: string;
}) => {
  // Priority 1: Show image if available (for all types)
  if (image) {
    return (
      <Image
        src={image}
        alt="Logo"
        width={24}
        height={24}
        className="mr-2 h-5 w-5 object-contain md:h-6 md:w-6"
      />
    );
  }

  // Priority 2: Show icon (emoji or image URL)
  if (icon) {
    // Check if icon is a string URL
    if (
      typeof icon === 'string' &&
      (icon.startsWith('http://') ||
        icon.startsWith('https://') ||
        icon.startsWith('/'))
    ) {
      return (
        <Image
          src={icon}
          alt="Icon"
          width={24}
          height={24}
          className="mr-2 h-5 w-5 object-contain md:h-6 md:w-6"
        />
      );
    }
    return <span className="mr-2 text-xl md:text-2xl">{icon}</span>;
  }

  // Priority 3: Show emojiLeft as fallback
  if (emojiLeft) {
    return (
      <span
        className="mr-2 text-xl md:text-2xl"
        role="img"
        aria-label="emojiLeft"
      >
        {emojiLeft}
      </span>
    );
  }

  return null;
};

const RightEmoji = ({ emojiRight }: { emojiRight?: string }) =>
  emojiRight ? (
    <span role="img" aria-label="emojiRight">
      {emojiRight}
    </span>
  ) : null;

const LinkCTA = ({
  ticketLink,
  children: cta,
}: {
  ticketLink: string | undefined;
  children: React.ReactNode;
}) =>
  ticketLink ? (
    <a
      href={ticketLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-purple shadow transition-colors duration-150 hover:bg-purple hover:text-white md:text-sm"
    >
      {cta}
    </a>
  ) : (
    <span className="inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-purple opacity-70 md:text-sm">
      {cta}
    </span>
  );
