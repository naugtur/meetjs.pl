import { Promo } from '../types/promo';

export const softwareDiscounts: Promo[] = [
	{
		id: 'great-frontend-2025',
		name: 'GreatFrontEnd',
		message: '20% off Premium plan with code MEETJSPL!',
		cta: '🚀 Get 20% Off',
		ticketLink: 'https://www.greatfrontend.com?fpr=meetjs',
		eventLink: 'https://www.greatfrontend.com',
		expiresAt: '2025-12-31T23:59:59+02:00',
		description:
			'Get 20% off GreatFrontEnd Premium plan with code MEETJSPL. As a community partner, you can also earn 15% commission on every Premium plan purchase through your referral link. Perfect for developers looking to master frontend development with high-quality coding problems and system design questions.',
		gradient: 'bg-gradient-to-r from-purple-600 via-pink-500 to-red-500',
		icon: '💻',
		image:
			'https://media.licdn.com/dms/image/v2/D560BAQEISUxvs5Lm1g/company-logo_200_200/company-logo_200_200/0/1709987232513/greatfrontend_logo?e=1754524800&v=beta&t=vEmqtugj9XO39eu9WCZa8X4s2lU5AJr7V_iKcF8aG-8',
		emojiRight: '🌐',
		country: 'Global',
		city: 'Remote',
		discountCode: 'MEETJSPL',
	},
	{
		id: 'warp-terminal-2025',
		name: 'Warp Terminal',
		message: 'Get 2 months of Warp Pro FREE!',
		cta: '🚀 Claim 2 Months Free',
		ticketLink: 'https://warp.dev/meetjs',
		eventLink: 'https://warp.dev',
		expiresAt: '2025-12-31T23:59:59+02:00',
		description:
			'Warp is the terminal reimagined with AI and collaborative features built-in. Experience lightning-fast performance, intelligent completions, and modern workflows. Get 2 full months of Warp Pro absolutely free - no trial limitations!',
		gradient: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500',
		icon: '⚡',
		image:
			'https://media.licdn.com/dms/image/v2/D4E0BAQED1pjiTaXRFw/company-logo_200_200/company-logo_200_200/0/1729172001472/warpdotdev_logo?e=1754524800&v=beta&t=Hz3yvhhrTTelJa6SchJEC3xGB8zhtEGGYxYeL_a3Nsc',
		emojiRight: '💻',
		country: 'Global',
		city: 'Remote',
		discountCode: 'MEETJS25',
	},
];
