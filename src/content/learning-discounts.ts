import { Promo } from '@/types/promo';

export const learningDiscounts: Promo[] = [
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
        country: 'Global',
        city: 'Remote',
        discountCode: 'MEETJS',
    },
];
