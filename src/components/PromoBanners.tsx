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

	// Only show the first promo
	const promo = visiblePromos[0];

	return (
		<div className="fixed bottom-0 left-0 z-50 w-full md:left-4 md:top-20 md:w-auto">
			{renderPromo ? (
				renderPromo(promo, handleClose)
			) : (
				<div
					key={promo.id}
					className="animate-fade-in relative w-full overflow-hidden shadow-md transition-transform hover:scale-105 md:w-auto md:max-w-xs md:-rotate-2 md:rounded-lg"
				>
					{/* Colored accent bar at the top */}
					<div
						className={`h-1.5 w-full ${promo.gradient || 'bg-gradient-to-r from-blue via-purple to-green'}`}
					/>

					<div className="bg-white p-3 dark:bg-gray-800">
						<div className="flex items-start justify-between">
							<div className="flex items-start space-x-2">
								{/* Icon or emoji container */}
								{(promo.icon || promo.emojiLeft) && (
									<div className="mt-0.5 flex-shrink-0">
										{promo.icon ? (
											<span className="text-lg text-purple">{promo.icon}</span>
										) : (
											<span
												className="text-lg"
												role="img"
												aria-label="emojiLeft"
											>
												{promo.emojiLeft}
											</span>
										)}
									</div>
								)}

								{/* Message content */}
								<div className="flex-1">
									<p className="text-xs font-medium text-gray-800 dark:text-gray-200">
										{promo.message}
										{promo.emojiRight && (
											<span className="ml-1" role="img" aria-label="emojiRight">
												{promo.emojiRight}
											</span>
										)}
									</p>

									{/* Location info if available */}
									{(promo.city || promo.country) && (
										<p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
											{promo.city}
											{promo.city && promo.country ? ', ' : ''}
											{promo.country}
										</p>
									)}

									{/* CTA button */}
									<div className="mt-2">
										<Link
											href={promo.link}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:bg-purple-dark inline-flex items-center rounded-md bg-purple px-2.5 py-1 text-xs font-medium text-white shadow-sm transition-colors"
										>
											{promo.cta}
										</Link>
									</div>
								</div>
							</div>

							{/* Close button */}
							<button
								onClick={() => handleClose(promo.id)}
								aria-label="Dismiss promo banner"
								className="flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:text-gray-400"
							>
								<X className="h-4 w-4" />
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
