import { Promo } from '../components/PromoBanners';

export const promos: Promo[] = [
	{
		id: 'cityjs-athens-2025',
		message: 'CityJS Athens 2025: Use our promo code for a discount!',
		cta: '👉 Get Discount',
		link: 'https://ti.to/cityjs-conference/cityjs-athens-2025/discount/meetjs',
		expiresAt: '2025-12-31T23:59:59+02:00',
		gradient: 'bg-gradient-to-r from-blue via-purple to-green',
		icon: '🚀',
		emojiRight: '🇬🇷',
		country: 'Greece',
		city: 'Athens',
	},
	{
		id: 'react-universe-2025',
		message: 'React Universe Conf 2025: 10% off with code meet.js10!',
		cta: '👉 Get Discount',
		link: 'https://ti.to/RUC/react-universe-conf-2025/discount/meet.js10',
		expiresAt: '2025-11-20T23:59:59+02:00',
		gradient: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500',
		icon: '🪐',
		emojiRight: '🌍',
	},
];
