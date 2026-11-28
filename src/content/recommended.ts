export interface RecommendedResource {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'open-source' | 'course' | 'newsletter';
  url: string;
  cta: string;
  gradient: string;
  textColor?: string;
  icon?: string;
  image?: string;
  pppSupport?: {
    badge: string;
    code?: string;
  };
}

export const recommendedResources: RecommendedResource[] = [
  {
    id: 'e2e',
    name: 'e2e (formerly TesterArmy)',
    tagline: 'Open-source TypeScript testing framework',
    description:
      'Our longtime partner TesterArmy has relaunched as e2e — an open-source, customizable TypeScript testing framework for web, mobile apps, and more. Try it with `npx e2e init`. Existing TesterArmy workspaces keep running until 15 January 2027 with an official migration guide at e2e.com/docs/migrate/testerarmy.',
    category: 'open-source',
    url: 'https://e2e.com/?utm_source=meetjs&utm_medium=community_partner&utm_campaign=e2e',
    cta: '🧪 Explore e2e',
    gradient: 'bg-[#1E5BFF]',
    image: '/partners/e2e-logo.png',
  },
  {
    id: 'aihero-crash-course',
    name: 'AI Coding Crash Course',
    tagline: 'Self-paced AI engineering course by Matt Pocock (AIHero)',
    description:
      '~60 practical lessons across 6 sections on controlling coding agents like Claude Code using real software engineering fundamentals: context management, AGENTS.md, skills, subagents, and handoffs. Supports automatic 60% Purchasing Power Parity (PPP) regional pricing in Poland ($119.60 instead of $299; content viewable from Poland).',
    category: 'course',
    url: 'https://www.aihero.dev/workshops/ai-coding-crash-course?utm_source=meetjs&utm_medium=community_partner&utm_campaign=aihero-crash-course',
    cta: '🚀 View Course',
    gradient: 'bg-gradient-to-r from-violet-700 via-fuchsia-600 to-purple-500',
    icon: '🤖',
    image: '/partners/aihero-logo.png',
    pppSupport: {
      badge: '🇵🇱 60% PPP in Poland',
    },
  },
  {
    id: 'aiforui',
    name: 'AI for UI',
    tagline: 'Building great interfaces with AI by Emil Kowalski',
    description:
      'Learn to build polished interfaces with AI from Emil Kowalski (design engineer at Linear, creator of Sonner and Vaul): encode your taste into rules and skills, ship from prototype to production, and review AI output. Includes 28 UI skills, the Lapse animation review tool, and a private Discord.',
    category: 'course',
    url: 'https://aiforui.dev/?utm_source=meetjs&utm_medium=community_partner&utm_campaign=aiforui',
    cta: '🎨 View Course',
    gradient: 'bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400',
    icon: '🎨',
  },
  {
    id: 'nextjsweekly',
    name: 'Next.js Weekly',
    tagline: 'Free weekly curated Next.js newsletter',
    description:
      'A free curated newsletter bringing the best Next.js articles, tools, releases, and community projects straight to your inbox every week.',
    category: 'newsletter',
    url: 'https://nextjsweekly.com/?utm_source=meetjs&utm_medium=community_partner&utm_campaign=nextjsweekly',
    cta: '📬 Subscribe Free',
    gradient: 'bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900',
    icon: '📬',
    image: '/partners/nextjsweekly-logo.svg',
  },
];
