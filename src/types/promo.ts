import { ReactNode } from 'react';

export interface Promo {
	id: string;
	message: string;
	description?: string;
	ticketLink: string;
	eventLink?: string;
	expiresAt: string;
	country?: string;
	city?: string;
	emojiRight?: string;
	emojiLeft?: string;
	icon?: ReactNode;
	gradient?: string;
	cta: string;
	discountCode?: string;
}
