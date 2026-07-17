import { Promo } from '../types/promo';

export const softwareDiscounts: Promo[] = [
  {
    id: 'cyberfolks-2026',
    name: 'cyber_Folks',
    message: '20% off hosting & domains — support meet.js!',
    cta: '🌐 Get 20% Off',
    ticketLink: 'https://cyberfolks.pl/?ref=MEETJS',
    eventLink: 'https://cyberfolks.pl',
    expiresAt: '2027-12-31T23:59:59+01:00',
    description:
      'Buy a domain, hosting, or other standard services at cyber_Folks with code MEETJS and get 20% off — while supporting meet.js through our partner program. cyber_Folks is our technology partner and hosts meet.js infrastructure. Use code MEETJS at checkout or go through our referral link.',
    gradient: 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-600',
    icon: '🌐',
    image: '/discounts/cyber_folks_cf.png',
    emojiRight: '💜',
    discountCode: 'MEETJS',
  },
  {
    id: 'windsurf-2025',
    name: 'Windsurf',
    message: 'Get 1 month FREE of Cascade Pro!',
    cta: '🌊 Claim 1 Month Free',
    ticketLink: 'https://windsurf.com/pricing?coupon=MEETJS-WS',
    eventLink: 'https://windsurf.com',
    expiresAt: '2025-12-31T23:59:59+02:00',
    description:
      "Windsurf's Cascade is a revolutionary AI coding assistant that helps developers write better code faster. With agentic capabilities and advanced code understanding, Cascade works as your pair programming partner. Use code MEETJS-WS at checkout to receive 1 month free of Cascade Pro ($15/month value) with 500 prompt credits and access to all premium AI models including SWE-1.",
    gradient: 'bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600',
    icon: '🌊',
    image: '/partners/Windsurf-white-symbol.png',
    emojiRight: '💻',
    discountCode: 'MEETJS-WS',
  },
  {
    id: 'warp-terminal-2025',
    name: 'Warp Terminal',
    message: 'Get Warp Pro for only $5 first month!',
    cta: '🚀 Get Warp Pro for $5',
    ticketLink: 'https://warp.dev/meetjs',
    eventLink: 'https://warp.dev',
    expiresAt: '2025-12-31T23:59:59+02:00',
    description:
      'Warp is the terminal reimagined with AI and collaborative features built-in. Experience lightning-fast performance, intelligent completions, and modern workflows. Get Warp Pro for just $5 for your first month with code MEETJS25!',
    gradient: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500',
    icon: '⚡',
    image: '/partners/warp-logo.svg',
    emojiRight: '💻',
    discountCode: 'MEETJS25',
  },
];
