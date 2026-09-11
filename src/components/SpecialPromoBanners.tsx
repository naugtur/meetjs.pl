import { createMemo, createSignal, For, Show } from 'solid-js';
import type { Promo } from '@/types/promo';
import { PromoFilters } from '@/components/PromoFilters';
import { PromoCard } from '@/components/PromoCard';

interface SpecialPromoBannersProps {
  promos: Promo[];
}

export function SpecialPromoBanners(props: SpecialPromoBannersProps) {
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
    <Show when={visiblePromos().length > 0}>
      <div class="space-y-6">
        <PromoFilters
          availableCountries={availableCountries()}
          selectedCountries={selectedCountries()}
          onCountryToggle={toggleCountry}
          onClearFilters={clearCountryFilters}
          filteredCount={filteredPromos().length}
          totalCount={visiblePromos().length}
        />

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <For each={filteredPromos()}>
            {(promo) => <PromoCard promo={promo} />}
          </For>
        </div>
      </div>
    </Show>
  );
}
