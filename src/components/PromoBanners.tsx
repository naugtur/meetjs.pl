'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export type Promo = {
	id: string;
	message: string;
	cta: string;
	link: string; // Link to tickets/registration
	eventLink?: string; // Link to the main event website
	expiresAt: string; // ISO string
	description?: string; // Short description of the event
	gradient?: string; // Tailwind class for bg-gradient
	icon?: React.ReactNode; // Custom icon or emoji
	emojiLeft?: string;
	emojiRight?: string;
	country?: string;
	city?: string;
};

const getPromoDismissedKey = (id: string) => `promoBannerDismissed_${id}`;

type PromoBannersProps = {
	promos: Promo[];
	renderPromo?: (
		promo: Promo,
		handleClose: (id: string) => void,
	) => React.ReactNode;
};

export const PromoBanners = ({ promos, renderPromo }: PromoBannersProps) => {
	const [visiblePromos, setVisiblePromos] = useState<Promo[]>([]);

	useEffect(() => {
		const now = new Date();
		setVisiblePromos(
			promos.filter((promo) => {
				// Check expiry
				if (new Date(promo.expiresAt) < now) return false;
				// Check dismissed
				if (
					typeof window !== 'undefined' &&
					localStorage.getItem(getPromoDismissedKey(promo.id))
				)
					return false;
				return true;
			}),
		);
	}, [promos]);

	const handleClose = (id: string) => {
		setVisiblePromos((prev) => prev.filter((p) => p.id !== id));
		if (typeof window !== 'undefined') {
			localStorage.setItem(getPromoDismissedKey(id), '1');
		}
	};

	if (visiblePromos.length === 0) return null;

	return (
		<div className="">
			{visiblePromos.map((promo) =>
				renderPromo ? (
					renderPromo(promo, handleClose)
				) : (
					<div
						key={promo.id}
						className={`relative ${promo.gradient || 'bg-gradient-to-r from-blue via-purple to-green'} animate-fade-in z-50 py-2 text-white shadow`}
					>
						<div className="mx-2 sm:mx-4">
							<div className="flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left">
								{promo.icon ? (
									<span className="mr-2 text-xl md:text-2xl">{promo.icon}</span>
								) : promo.emojiLeft ? (
									<span
										className="mr-2 text-xl md:text-2xl"
										role="img"
										aria-label="emojiLeft"
									>
										{promo.emojiLeft}
									</span>
								) : null}
								<span className="flex-1 text-sm font-medium md:text-base">
									{promo.message}{' '}
									{promo.emojiRight && (
										<span role="img" aria-label="emojiRight">
											{promo.emojiRight}
										</span>
									)}
								</span>
								<Link
									href={promo.link}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-purple shadow transition-colors duration-150 hover:bg-purple hover:text-white md:text-sm"
								>
									{promo.cta}
								</Link>
								<button
									onClick={() => handleClose(promo.id)}
									aria-label="Dismiss promo banner"
									className="absolute right-4 top-2 text-white hover:text-gray-200 focus:outline-none md:static md:right-auto md:top-auto"
								>
									<X className="h-6 w-6" />
								</button>
							</div>
						</div>
					</div>
				),
			)}
		</div>
	);
};
