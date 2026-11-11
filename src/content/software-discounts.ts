import { Promo } from '../types/promo';

export const softwareDiscounts: Promo[] = [
  {
    id: 'e2e-testerarmy-2026',
    name: 'e2e (formerly TesterArmy)',
    message: 'TesterArmy is now e2e — earn free test runs until the switch!',
    cta: '🧪 Earn Free Runs',
    ticketLink:
      'https://tester.army/sign-up?ref=8a1ugwnter&utm_source=meetjs&utm_medium=community_partner&utm_campaign=e2e-testerarmy-2026',
    eventLink:
      'https://e2e.com/?utm_source=meetjs&utm_medium=community_partner&utm_campaign=e2e-testerarmy-2026',
    expiresAt: '2027-01-15T23:59:59+01:00',
    description:
      'TesterArmy has rebranded to e2e (e2e.com) — an open source, customizable TypeScript testing framework for web, mobile and more, backed by $8M in seed funding. The hosted TesterArmy product keeps running until 15 January 2027, so you can still use our referral link: whoever signs up with it starts with 25 bonus test runs, and you both get 100 more when their workspace goes paid. Existing TesterArmy tests can be moved to e2e with the official migration tool (e2e.com/docs/migrate/testerarmy). New here? Run `npx e2e init` in your project.',
    gradient: 'bg-[#1E5BFF]',
    image: '/partners/e2e-logo.png',
    emojiRight: '🤖',
  },
  {
    id: 'cyberfolks-2026',
    name: 'cyber_Folks',
    message: '20% off hosting & domains — support meet.js!',
    cta: '🌐 Get 20% Off',
    ticketLink:
      'https://cyberfolks.pl/?ref=MEETJS&utm_source=meetjs&utm_medium=community_partner&utm_campaign=cyberfolks-2026',
    eventLink:
      'https://cyberfolks.pl/?utm_source=meetjs&utm_medium=community_partner&utm_campaign=cyberfolks-2026',
    expiresAt: '2027-12-31T23:59:59+01:00',
    description:
      'Buy a domain, hosting, or other standard services at cyber_Folks with code MEETJS and get 20% off — while supporting meet.js through our partner program. cyber_Folks is our technology partner and hosts meet.js infrastructure. Use code MEETJS at checkout or go through our referral link.',
    gradient: 'bg-[#FFCC00]',
    textColor: 'text-gray-900',
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
