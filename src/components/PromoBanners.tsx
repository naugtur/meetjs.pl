'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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

export const PromoBanners = ({ promos }: Props) => {
	const [visiblePromos, setVisiblePromos] = useState<Promo[]>([]);

	useEffect(() => {
		setVisiblePromos(promos.filter(shouldPromoBeVisible));
	}, [promos]);

	const handleClose = (id: string) => {
		setVisiblePromos((prev) => prev.filter((p) => p.id !== id));
		DismissedPromo.set(id);
	};

	if (visiblePromos.length === 0) return null;

	const promo = visiblePromos[0];

	return <PromoBanner promo={promo} close={() => handleClose(promo.id)} />;
};

const PromoBanner = ({ promo, close }: { promo: Promo; close: () => void }) => (
	<div className="relative">
		<div
			className={`relative ${promo.gradient || 'bg-gradient-to-r from-blue via-purple to-green'} animate-fade-in z-50 py-2 text-white shadow`}
		>
			<div className="mx-2 sm:mx-4">
				<div className="flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left">
					<Icon icon={promo.icon} emojiLeft={promo.emojiLeft} />

					<span className="flex-1 text-sm font-medium md:text-base">
						{promo.message} <RightEmoji emojiRight={promo.emojiRight} />
					</span>

					<LinkCTA ticketLink={promo.ticketLink}>{promo.cta}</LinkCTA>

					<CloseButton close={close} />
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
	<Link
		href={ticketLink || ''}
		target="_blank"
		rel="noopener noreferrer"
		className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-purple shadow transition-colors duration-150 hover:bg-purple hover:text-white md:text-sm"
	>
		{cta}
	</Link>
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
