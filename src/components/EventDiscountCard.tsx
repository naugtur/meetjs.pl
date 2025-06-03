'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Promo } from '@/types/promo';
import { PromoFilters } from '@/components/PromoFilters';
import { ExternalLink, Copy, Check, Calendar, MapPin } from 'lucide-react';

interface EventDiscountCardProps {
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

function EventPromoCard({ promo }: { promo: Promo }) {
	const [copied, setCopied] = useState(false);

	const handleCopyCode = async () => {
		if (promo.discountCode) {
			await navigator.clipboard.writeText(promo.discountCode);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800">
			{/* Header with Logo/Image */}
			<div className="flex items-center gap-4 border-b border-gray-100 p-6 dark:border-gray-700">
				{promo.image ? (
					<div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 ring-2 ring-gray-100 dark:ring-gray-600">
						<Image
							src={promo.image}
							alt={`${promo.name} logo`}
							fill
							className="object-contain transition-transform duration-300 group-hover:scale-105"
						/>
					</div>
				) : (
					<div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-3xl text-white shadow-md transition-transform duration-300 group-hover:scale-105">
						{promo.icon || '🎟️'}
					</div>
				)}

				<div className="flex-1 min-w-0">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
						{promo.name}
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
						{promo.message}
					</p>
				</div>
			</div>

			{/* Content */}
			<div className="p-6">
				{promo.description && (
					<div className="mb-6">
						<p className="leading-relaxed text-gray-700 dark:text-gray-300 text-sm">
							{promo.description}
						</p>
					</div>
				)}

				{/* Discount Code Section */}
				{promo.discountCode && (
					<div className="mb-6 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-800/30">
						<div className="flex items-center justify-between">
							<div className="min-w-0 flex-1">
								<p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Discount Code
								</p>
								<p className="font-mono text-lg font-bold text-purple-600 dark:text-purple-400 truncate">
									{promo.discountCode}
								</p>
							</div>
							<button
								onClick={handleCopyCode}
								className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-purple-600 shadow-sm transition-all duration-200 hover:bg-purple-50 hover:shadow-md active:scale-95 dark:bg-gray-700 dark:text-purple-400 dark:hover:bg-gray-600 ml-3"
								aria-label={`Copy discount code ${promo.discountCode}`}
							>
								{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
								{copied ? 'Copied!' : 'Copy'}
							</button>
						</div>
					</div>
				)}

				{/* Details Grid */}
				<div className="mb-6 grid grid-cols-2 gap-4">
					<div className="flex items-start gap-2">
						<Calendar className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
						<div className="min-w-0">
							<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
								Valid Until
							</p>
							<p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
								{formatDate(promo.expiresAt)}
							</p>
						</div>
					</div>
					<div className="flex items-start gap-2">
						<MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
						<div className="min-w-0">
							<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
								Location
							</p>
							<p className="text-sm text-gray-900 dark:text-gray-100 font-medium truncate">
								{promo.city && promo.country ? `${promo.city}, ${promo.country}` : promo.country || 'Global'}
							</p>
						</div>
					</div>
				</div>

				{/* Links */}
				{promo.eventLink && (
					<div className="mb-6">
						<a
							href={promo.eventLink}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-600 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 cursor-pointer group"
							aria-label={`Visit ${promo.name} website`}
						>
							<div className="min-w-0 flex-1">
								<p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
									Event Website
								</p>
								<p className="text-sm text-gray-500 dark:text-gray-400 truncate">
									{getDomain(promo.eventLink)}
								</p>
							</div>
							<ExternalLink className="h-4 w-4 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-200" />
						</a>
					</div>
				)}
			</div>

			{/* CTA Footer */}
			<div className="border-t border-gray-100 p-6 dark:border-gray-700">
				<Link
					href={promo.ticketLink}
					target="_blank"
					rel="noopener noreferrer"
					className="block w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-3 text-center font-semibold text-white shadow transition-all duration-200 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
				>
					{promo.cta}
				</Link>
			</div>
		</div>
	);
}

export function EventDiscountCard({ promos }: EventDiscountCardProps) {
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

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
				{filteredPromos.map((promo) => (
					<EventPromoCard key={promo.id} promo={promo} />
				))}
			</div>
		</div>
	);
}
