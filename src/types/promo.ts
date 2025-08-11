import { ReactNode } from 'react';

export interface Promo {
  id: string;
  name: string;
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
  image?: string;
  gradient: string;
  cta: string;
  discountCode?: string;
  workshopLink?: string;
  workshopDescription?: string;
  workshopDiscountCode?: string;
}
