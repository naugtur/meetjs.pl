import { Promo } from '../types/promo';

export const softwareDiscounts: Promo[] = [
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
