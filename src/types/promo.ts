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
  icon?: string;
  image?: string;
  gradient: string;
  textColor?: string;
  cta: string;
  discountCode?: string;
  workshopLink?: string;
  workshopDescription?: string;
  workshopDiscountCode?: string;
}
