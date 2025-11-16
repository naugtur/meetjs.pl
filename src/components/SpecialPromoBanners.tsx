'use client';

import { useMemo, useState } from 'react';
import type { Promo } from '@/types/promo';
import { PromoFilters } from '@/components/PromoFilters';
import { PromoCard } from '@/components/PromoCard';

interface SpecialPromoBannersProps {
  promos: Promo[];
}

export function SpecialPromoBanners({ promos }: SpecialPromoBannersProps) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

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

  // Get available countries from active promos
  const availableCountries = useMemo(() => {
    return [
      ...new Set(visiblePromos.map((promo) => promo.country).filter(Boolean)),
    ] as string[];
  }, [visiblePromos]);

  // Apply country filters to active promos
  const filteredPromos = useMemo(() => {
    if (selectedCountries.length === 0) {
      return visiblePromos;
    }
    return visiblePromos.filter(
      (promo) => promo.country && selectedCountries.includes(promo.country),
    );
  }, [visiblePromos, selectedCountries]);

  if (visiblePromos.length === 0) return null;

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
    <div className="space-y-6">
      <PromoFilters
        availableCountries={availableCountries}
        selectedCountries={selectedCountries}
        onCountryToggle={toggleCountry}
        onClearFilters={clearCountryFilters}
        filteredCount={filteredPromos.length}
        totalCount={visiblePromos.length}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {filteredPromos.map((promo) => (
          <PromoCard key={promo.id} promo={promo} />
        ))}
      </div>
    </div>
  );
}
