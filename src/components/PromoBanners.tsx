'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
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

const shouldPromoBeVisible = (promo: Promo) => {
  if (isPromoExpired(promo) || isPromoDismissed(promo)) return false;
  return true;
};

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
  const [visiblePromos, setVisiblePromos] = useState<Promo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Filter and prioritize promos
    const filtered = promos.filter(shouldPromoBeVisible);
    const prioritized = prioritizePromos(filtered);
    setVisiblePromos(prioritized);
    setCurrentIndex(0); // Reset index when promos change
  }, [promos]);

  // Auto-rotate banners every 8 seconds if there are multiple
  useEffect(() => {
    if (visiblePromos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visiblePromos.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [visiblePromos.length]);

  const handleClose = (id: string) => {
    setVisiblePromos((prev) => prev.filter((p) => p.id !== id));
    DismissedPromo.set(id);
  };

  if (visiblePromos.length === 0) return null;

  const promo = visiblePromos[currentIndex];

  return <PromoBanner promo={promo} close={() => handleClose(promo.id)} />;
};

const PromoBanner = ({ promo, close }: { promo: Promo; close: () => void }) => (
  <div className="relative">
    <div
      className={`relative ${promo.gradient || 'bg-gradient-to-r from-blue via-purple to-green'} animate-fade-in z-0 py-1.5 text-white shadow md:py-2`}
    >
      <div className="mx-2 sm:mx-4">
        <div className="flex flex-col items-center justify-between gap-1 text-center md:flex-row md:gap-2 md:text-left">
          <div className="hidden md:block">
            <Icon icon={promo.icon} emojiLeft={promo.emojiLeft} />
          </div>

          <span className="flex-1 text-xs font-medium leading-tight md:text-sm">
            <span className="font-semibold">{promo.name}</span> -{' '}
            {promo.message} <RightEmoji emojiRight={promo.emojiRight} />
          </span>

          <div className="flex items-center gap-2">
            <LinkCTA ticketLink={promo.ticketLink}>{promo.cta}</LinkCTA>
            <CloseButton close={close} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Icon = ({
  icon,
  emojiLeft,
}: {
  icon?: React.ReactNode;
  emojiLeft?: string;
}) => {
  if (icon) return <span className="mr-2 text-xl md:text-2xl">{icon}</span>;

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
}) => (
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
  )
);

const CloseButton = ({ close }: { close: () => void }) => (
  <button
    onClick={close}
    aria-label="Dismiss promo banner"
    className="absolute right-4 top-2 text-white hover:text-gray-200 focus:outline-none md:static md:right-auto md:top-auto"
  >
    <X className="h-6 w-6" />
  </button>
);
