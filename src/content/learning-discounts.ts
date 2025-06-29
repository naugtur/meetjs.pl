import { Promo } from '@/types/promo';

export const learningDiscounts: Promo[] = [
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
    discountCode: 'MEETJSPL',
  },
  {
    id: 'joshwcomeau-2025',
    name: 'Josh W Comeau Courses',
    message: '10% off all courses with code MEETJS!',
    cta: '🎨 Get 10% Off',
    ticketLink: 'https://www.joshwcomeau.com',
    eventLink: 'https://www.joshwcomeau.com',
    expiresAt: '2025-12-31T23:59:59+02:00',
    description:
      'Access premium courses by Josh W. Comeau, including "CSS for JavaScript Developers" and "Joy of React". Learn modern CSS techniques, React patterns, and frontend best practices through interactive lessons and real-world projects. Perfect for developers looking to level up their frontend skills with in-depth, hands-on learning experiences.',
    gradient: 'bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-500',
    icon: '🎨',
    emojiRight: '🌐',
    discountCode: 'MEETJS',
  },
];
