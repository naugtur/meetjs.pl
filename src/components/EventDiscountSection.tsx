import { createMemo, createSignal, For, Show } from 'solid-js';
import type { Promo } from '@/types/promo';
import EmptyDiscountState from './EmptyDiscountState';
import { PromoFilters } from '@/components/PromoFilters';
import { Calendar, MapPin, ExternalLink } from '@/lib/lucide';
import WorkshopInfo from './WorkshopInfo';
import DiscountCodeSection from './DiscountCodeSection';

interface EventDiscountSectionProps {
  promos: Promo[];
}

const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
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

function EventPromoCard(props: { promo: Promo }) {
  const promo = props.promo;
  return (
    <div class="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      {/* Header with Logo/Image */}
      <div class="flex items-center gap-4 border-b border-gray-100 p-6 dark:border-gray-700">
        <Show
          when={promo.image}
          fallback={
            <div class="flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-3xl text-white shadow-md transition-transform duration-300 group-hover:scale-105">
              {promo.icon || '🎟️'}
            </div>
          }
        >
          <div class="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100 ring-2 ring-gray-100 dark:bg-gray-700 dark:ring-gray-600">
            <img
              src={promo.image}
              alt={`${promo.name} logo`}
              class="absolute inset-0 h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Show>

        <div class="min-w-0 flex-1">
          <h3 class="truncate text-xl font-bold text-gray-900 dark:text-white">
            {promo.name}
          </h3>
          <p class="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {promo.message}
          </p>
        </div>
      </div>

      {/* Content */}
      <div class="p-6">
        <Show when={promo.description}>
          <div class="mb-6">
            <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {promo.description}
            </p>
          </div>
        </Show>

        {/* Workshop Information */}
        <WorkshopInfo
          workshopDescription={promo.workshopDescription}
          workshopDiscountCode={promo.workshopDiscountCode}
          workshopLink={promo.workshopLink}
        />

        {/* Discount Code Section */}
        <Show when={promo.discountCode}>
          <DiscountCodeSection
            discountCode={promo.discountCode!}
            variant="event"
          />
        </Show>

        {/* Details Grid */}
        <div class="mb-6 grid grid-cols-2 gap-4">
          <div class="flex items-start gap-2">
            <Calendar class="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
            <div class="min-w-0">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Valid Until
              </p>
              <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {formatDate(promo.expiresAt)}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-2">
            <MapPin class="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
            <div class="min-w-0">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Location
              </p>
              <p class="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                {promo.city && promo.country
                  ? `${promo.city}, ${promo.country}`
                  : promo.country || 'Global'}
              </p>
            </div>
          </div>
        </div>

        {/* Links */}
        <Show when={promo.eventLink}>
          <div class="mb-6">
            <a
              href={promo.eventLink}
              target="_blank"
              rel="noopener"
              class="group flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-3 transition-all duration-200 hover:border-purple-300 hover:bg-purple-50/50 dark:border-gray-600 dark:hover:border-purple-600 dark:hover:bg-purple-900/10"
              aria-label={`Visit ${promo.name} website`}
              onClick={(e) => e.stopPropagation()}
            >
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-gray-700 transition-colors duration-200 group-hover:text-purple-600 dark:text-gray-300 dark:group-hover:text-purple-400">
                  Event Website
                </p>
                <p class="truncate text-sm text-gray-500 dark:text-gray-400">
                  {getDomain(promo.eventLink!)}
                </p>
              </div>
              <ExternalLink class="h-4 w-4 text-purple-600 transition-colors duration-200 group-hover:text-purple-700 dark:text-purple-400 dark:group-hover:text-purple-300" />
            </a>
          </div>
        </Show>
      </div>

      {/* CTA Footer */}
      <div class="border-t border-gray-100 p-6 dark:border-gray-700">
        <Show
          when={promo.ticketLink}
          fallback={
            <span class="block w-full rounded-lg bg-gradient-to-r from-purple-600/70 to-pink-600/70 py-3 text-center font-semibold text-white/80 opacity-60 shadow">
              {promo.cta}
            </span>
          }
        >
          <a
            href={promo.ticketLink}
            target="_blank"
            rel="noopener"
            class="block w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-3 text-center font-semibold text-white shadow transition-all duration-200 hover:-translate-y-0.5 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg active:scale-95"
            onClick={(e) => e.stopPropagation()}
          >
            {promo.cta}
          </a>
        </Show>
      </div>
    </div>
  );
}

export function EventDiscountSection(props: EventDiscountSectionProps) {
  const [selectedCountries, setSelectedCountries] = createSignal<string[]>([]);

  // Filter out expired promos and sort by expiration date
  const visiblePromos = createMemo(() => {
    const now = new Date();
    return props.promos
      .filter((promo) => new Date(promo.expiresAt) >= now)
      .sort(
        (a, b) =>
          new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime(),
      );
  });

  // Get available countries from active promos
  const availableCountries = createMemo(() => {
    return [
      ...new Set(
        visiblePromos()
          .map((promo) => promo.country)
          .filter(Boolean),
      ),
    ] as string[];
  });

  // Apply country filters to active promos
  const filteredPromos = createMemo(() => {
    if (selectedCountries().length === 0) {
      return visiblePromos();
    }
    return visiblePromos().filter(
      (promo) => promo.country && selectedCountries().includes(promo.country),
    );
  });

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country],
    );
  };

  const clearCountryFilters = () => {
    setSelectedCountries([]);
  };

  return (
    <Show
      when={visiblePromos().length > 0}
      fallback={<EmptyDiscountState type="events" />}
    >
      <div class="space-y-6">
        <PromoFilters
          availableCountries={availableCountries()}
          selectedCountries={selectedCountries()}
          onCountryToggle={toggleCountry}
          onClearFilters={clearCountryFilters}
          filteredCount={filteredPromos().length}
          totalCount={visiblePromos().length}
        />

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <For each={filteredPromos()}>
            {(promo) => <EventPromoCard promo={promo} />}
          </For>
        </div>
      </div>
    </Show>
  );
}
