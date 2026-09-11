import { createSignal, onSettled, Show } from 'solid-js';
import { isServer } from '@solidjs/web';
import type { JSX } from '@solidjs/web';
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

export const PromoBanners = (props: Props) => {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [dismissedPromos, setDismissedPromos] = createSignal<Set<string>>(
    new Set(),
  );

  // Load dismissed promos from localStorage on mount (client-side only)
  onSettled(() => {
    if (isServer) return;
    const dismissed = new Set<string>();
    props.promos.forEach((promo) => {
      if (isPromoDismissed(promo)) {
        dismissed.add(promo.id);
      }
    });
    setDismissedPromos(dismissed);
  });

  // Filter and prioritize promos
  const visiblePromos = () => {
    const filtered = props.promos.filter((promo) => {
      if (isPromoExpired(promo)) return false;
      if (dismissedPromos().has(promo.id)) return false;
      return true;
    });
    return prioritizePromos(filtered);
  };

  // Auto-rotate banners every 6 seconds if there are multiple
  onSettled(() => {
    if (isServer) return;
    const interval = setInterval(() => {
      const promos = visiblePromos();
      if (promos.length <= 1) return;
      setCurrentIndex((prev) => (prev + 1) % promos.length);
    }, 6000);
    return () => clearInterval(interval);
  });

  const promo = () => {
    const promos = visiblePromos();
    if (promos.length === 0) return undefined;
    return promos[currentIndex() % promos.length || 0];
  };

  return <Show when={promo()}>{(p) => <PromoBanner promo={p()} />}</Show>;
};

const PromoBanner = (props: { promo: Promo }) => {
  const [isVisible, setIsVisible] = createSignal(true);
  const textColor = () => props.promo.textColor || 'text-white';

  const handleDismiss = () => {
    DismissedPromo.set(props.promo.id);
    setIsVisible(false);
  };

  return (
    <Show when={isVisible()}>
      <div class="relative">
        <div
          class={`relative ${props.promo.gradient || 'bg-gradient-to-r from-blue via-purple to-green'} animate-fade-in z-0 py-1.5 shadow md:py-2 ${textColor()}`}
        >
          <div class="mx-2 sm:mx-4">
            <div class="flex flex-col items-center justify-between gap-1 text-center md:flex-row md:gap-2 md:text-left">
              <div class="hidden md:block">
                <Icon
                  icon={props.promo.icon}
                  image={props.promo.image}
                  emojiLeft={props.promo.emojiLeft}
                />
              </div>

              <span class="flex-1 text-xs font-medium leading-tight md:text-sm">
                <span class="font-semibold">{props.promo.name}</span> -{' '}
                {props.promo.message}{' '}
                <RightEmoji emojiRight={props.promo.emojiRight} />
              </span>

              <div class="flex items-center gap-2">
                <LinkCTA ticketLink={props.promo.ticketLink}>
                  {props.promo.cta}
                </LinkCTA>
                <button
                  onClick={handleDismiss}
                  aria-label="Dismiss promo banner"
                  class={`ml-2 rounded-full p-1 transition-colors hover:bg-white/20 ${textColor()}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};

const Icon = (props: {
  icon?: JSX.Element | string;
  image?: string;
  emojiLeft?: string;
}) => {
  // Priority 1: Show image if available (for all types)
  if (props.image) {
    return (
      <img
        src={props.image}
        alt="Logo"
        width={24}
        height={24}
        class="mr-2 h-5 w-5 object-contain md:h-6 md:w-6"
      />
    );
  }

  // Priority 2: Show icon (emoji or image URL)
  if (props.icon) {
    // Check if icon is a string URL
    if (
      typeof props.icon === 'string' &&
      (props.icon.startsWith('http://') ||
        props.icon.startsWith('https://') ||
        props.icon.startsWith('/'))
    ) {
      return (
        <img
          src={props.icon}
          alt="Icon"
          width={24}
          height={24}
          class="mr-2 h-5 w-5 object-contain md:h-6 md:w-6"
        />
      );
    }
    return <span class="mr-2 text-xl md:text-2xl">{props.icon}</span>;
  }

  // Priority 3: Show emojiLeft as fallback
  if (props.emojiLeft) {
    return (
      <span class="mr-2 text-xl md:text-2xl" role="img" aria-label="emojiLeft">
        {props.emojiLeft}
      </span>
    );
  }

  return null;
};

const RightEmoji = (props: { emojiRight?: string }) => (
  <Show when={props.emojiRight}>
    <span role="img" aria-label="emojiRight">
      {props.emojiRight}
    </span>
  </Show>
);

const LinkCTA = (props: {
  ticketLink: string | undefined;
  children: JSX.Element;
}) => (
  <Show
    when={props.ticketLink}
    fallback={
      <span class="inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-purple opacity-70 md:text-sm">
        {props.children}
      </span>
    }
  >
    <a
      href={props.ticketLink}
      target="_blank"
      rel="noopener"
      class="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-purple shadow transition-colors duration-150 hover:bg-purple hover:text-white md:text-sm"
    >
      {props.children}
    </a>
  </Show>
);
