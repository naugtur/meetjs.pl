'use client';

import { useEffect, useState } from 'react';
import type { Promo } from '@/types/promo';
import { PromoFilters } from '@/components/PromoFilters';
import { PromoCard } from '@/components/PromoCard';

interface SpecialPromoBannersProps {
	promos: Promo[];
}

export function SpecialPromoBanners({ promos }: SpecialPromoBannersProps) {
	const [visiblePromos, setVisiblePromos] = useState<Promo[]>([]);
	const [filteredPromos, setFilteredPromos] = useState<Promo[]>([]);
	const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
	const [availableCountries, setAvailableCountries] = useState<string[]>([]);

	useEffect(() => {
		const countries = [
			...new Set(promos.map((promo) => promo.country).filter(Boolean)),
		];
		setAvailableCountries(countries as string[]);
	}, [promos]);

	useEffect(() => {
		const now = new Date();
		// First filter out expired promos and sort by expiration date
		const activePromos = promos
			.filter((promo) => new Date(promo.expiresAt) >= now)
			.sort(
				(a, b) =>
					new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime(),
			);

		setVisiblePromos(activePromos);

		// Update available countries based on active promos only
		const countries = [
			...new Set(activePromos.map((promo) => promo.country).filter(Boolean)),
		];
		setAvailableCountries(countries as string[]);

		// Apply country filters to active promos
		if (selectedCountries.length === 0) {
			setFilteredPromos(activePromos);
		} else {
			setFilteredPromos(
				activePromos.filter(
					(promo) => promo.country && selectedCountries.includes(promo.country),
				),
			);
		}
	}, [promos, selectedCountries]);

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
