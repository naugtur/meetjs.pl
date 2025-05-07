'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Promo } from '@/components/PromoBanners';

interface SpecialPromoBannersProps {
	promos: Promo[];
}

export function SpecialPromoBanners({ promos }: SpecialPromoBannersProps) {
	const [visiblePromos, setVisiblePromos] = useState<Promo[]>([]);

	useEffect(() => {
		const now = new Date();
		setVisiblePromos(
			promos.filter((promo) => new Date(promo.expiresAt) >= now),
		);
	}, [promos]);

	if (visiblePromos.length === 0) return null;

	return (
		<div className="space-y-6">
			{visiblePromos.map((promo) => (
				<div
					key={promo.id}
					className={`relative overflow-hidden rounded-xl border-2 border-purple ${promo.gradient || 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-500'} p-6 shadow-lg transition-transform hover:scale-[1.01]`}
				>
					<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-3 text-xl md:text-2xl">
							{promo.icon ? (
								<span>{promo.icon}</span>
							) : promo.emojiLeft ? (
								<span role="img" aria-label="emojiLeft">
									{promo.emojiLeft}
								</span>
							) : null}
							<span className="font-bold text-white drop-shadow-md">
								{promo.message}
								{promo.emojiRight && (
									<span role="img" aria-label="emojiRight" className="ml-1">
										{promo.emojiRight}
									</span>
								)}
							</span>
						</div>
						<div className="flex flex-col gap-2 md:flex-row md:items-center">
							<Link
								href={promo.link}
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-full bg-white/90 px-4 py-2 text-center text-sm font-semibold text-purple shadow transition-colors hover:bg-purple hover:text-white md:text-base"
							>
								{promo.cta}
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
