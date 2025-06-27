import { Promo } from '../types/promo';

export const softwareDiscounts: Promo[] = [
	{
		id: 'windsurf-2025',
		name: 'Windsurf',
		message: 'Get 1 month FREE of Cascade Pro!',
		cta: '🌊 Claim 1 Month Free',
		ticketLink: 'https://windsurf.com/pricing?coupon=MEETJS-WINDSURF',
		eventLink: 'https://windsurf.com',
		expiresAt: '2025-12-31T23:59:59+02:00',
		description:
			"Windsurf's Cascade is a revolutionary AI coding assistant that helps developers write better code faster. With agentic capabilities and advanced code understanding, Cascade works as your pair programming partner. Use code MEETJS-WINDSURF at checkout to receive 1 month free of Cascade Pro ($15/month value) with 500 prompt credits and access to all premium AI models including SWE-1.",
		gradient: 'bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600',
		icon: '🌊',
		image: '/partners/Windsurf-white-symbol.png',
		emojiRight: '💻',
		discountCode: 'MEETJS-WINDSURF',
	},
	{
		id: 'elevenlabs-2025',
		name: 'ElevenLabs',
		message: 'Get 3 months of Creator tier FREE!',
		cta: '🎙️ Claim 3 Months Free',
		ticketLink: 'https://elevenlabs.io/?coupon=KASM7T',
		eventLink: 'https://elevenlabs.io',
		expiresAt: '2025-12-31T23:59:59+02:00',
		description:
			'ElevenLabs offers state-of-the-art AI voice technology. After signing up (choose developer category), click the link to redeem the coupon. Then navigate to My Workspace > Subscription, select Creator tier, and the coupon will be applied at checkout. Remember to downgrade before the coupon expires to avoid charges.',
		gradient: 'bg-gradient-to-r from-violet-600 via-blue-500 to-purple-600',
		icon: '🔊',
		image: '/partners/elevenlabs-symbol.png',
		emojiRight: '🤖',
		discountCode: 'KASM7T',
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
		discountCode: 'MEETJS25',
	},
];
