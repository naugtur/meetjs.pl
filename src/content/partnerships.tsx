import React from 'react';
import { Bot, BookOpen, Code } from 'lucide-react';

export interface Partnership {
  name: string;
  website: string;
  description: string;
  details: string[];
  goals: string[];
  location: string;
  contact: string;
  icon: React.ReactElement;
  gradient: string;
  photos?: {
    src: string;
    alt: string;
    caption: string;
  }[];
  specialOffer?: {
    title: string;
    description: string;
    link: string;
    linkText: string;
  };
}

export const partnerships: Partnership[] = [
  {
    name: 'FutureConf 2025',
    website: 'https://futureconf.tech/',
    description: 'Two-day AI conference in Kraków focused on "AI in Production" with industry experts and practical use cases.',
    details: [
      'Expert talks on ML/AI, security, and practical AI production use cases',
      'Speakers from Hugging Face, Docker, Qdrant, mBank, and AGH University',
      'Networking opportunities with AI professionals and enthusiasts',
      'Workshops and hands-on sessions on AI implementation',
      'Located at International Cultural Centre on Main Square, Kraków',
    ],
    goals: [
      'Advancing AI knowledge and practical implementation',
      'Building connections in the AI and tech community',
      'Sharing real-world AI production experiences',
      'Supporting the growth of AI expertise in Poland',
    ],
    location: 'Kraków, Poland',
    contact: 'https://futureconf.tech/meetjs/',
    icon: <Bot className="h-8 w-8 text-purple-500" />,
    gradient: 'from-purple-600 to-blue-600',
    photos: [
      {
        src: 'https://futureconf.tech/assets/rozek.webp',
        alt: 'FutureConf 2024 conference atmosphere',
        caption: 'Conference atmosphere with hundreds of AI enthusiasts'
      },
      {
        src: 'https://futureconf.tech/assets/photobooth/uczestnik2.webp',
        alt: 'Conference speakers at FutureConf',
        caption: 'Industry experts sharing AI knowledge'
      },
      {
        src: 'https://futureconf.tech/assets/photobooth/uczestnik.webp',
        alt: 'Conference attendees networking',
        caption: 'Active networking and knowledge exchange'
      },
      {
        src: 'https://futureconf.tech/assets/ludzie-10.webp',
        alt: 'FutureConf community gathering',
        caption: 'Building the AI community in Poland'
      }
    ],
    specialOffer: {
      title: 'Group Discount System',
      description: 'Up to 50% off through meet.js partnership',
      link: 'https://futureconf.tech/meetjs/',
      linkText: 'Get Group Discount'
    }
  },
  {
    name: 'Młodzi 4IT 2.0',
    website: 'https://www.mlodzi4it.com/',
    description: 'Educational project focused on digital awareness and safe technology usage for youth and seniors.',
    details: [
      'Free educational workshops in schools, libraries, and cultural centers',
      'Personal data protection and internet privacy education',
      'Responsible AI usage training',
      'Cybercrime prevention (including phone scams and fake messages)',
      'Creating free educational materials (flyers, quizzes, e-books, presentations)',
    ],
    goals: [
      'Building digital awareness among children and seniors',
      'Teaching safe internet usage and data protection',
      'Explaining AI technology and its responsible use',
      'Preventing cybercrime through education',
    ],
    location: 'Bielsko-Biała and surrounding areas',
    contact: 'mlodzi4it@gmail.com',
    icon: <BookOpen className="h-8 w-8 text-blue-500" />,
    gradient: 'from-blue-500 to-purple-600',
    photos: [
      {
        src: '/partnerships/mlodzi4it-workshop-1.jpg',
        alt: 'Młodzi 4IT workshop with students in classroom',
        caption: 'Educational workshop on digital awareness and cybersecurity'
      },
      {
        src: '/partnerships/mlodzi4it-workshop-2.jpg',
        alt: 'Interactive presentation about AI and technology',
        caption: 'Teaching responsible AI usage to young students'
      },
      {
        src: '/partnerships/mlodzi4it-workshop-3.jpg',
        alt: 'Students participating in cybersecurity training',
        caption: 'Hands-on cybersecurity education session'
      },
      {
        src: '/partnerships/mlodzi4it-workshop-4.jpg',
        alt: 'Group activity during digital literacy workshop',
        caption: 'Interactive learning about internet safety'
      },
      {
        src: '/partnerships/mlodzi4it-workshop-5.jpg',
        alt: 'Młodzi 4IT team presenting educational materials',
        caption: 'Presenting educational materials and resources'
      }
    ],
  },
  {
    name: 'HackYeah 2025',
    website: 'https://hackyeah.pl/',
    description: 'Europe\'s largest in-person hackathon bringing together hundreds of programmers, designers, and tech enthusiasts for 24 hours of coding and innovation.',
    details: [
      '24-hour hackathon with challenges in biohacking, travel, defense, and real-world solutions',
      'Parallel tech conference with IT experts and industry leaders',
      'Mentorship support available on-site and via Discord',
      'Teams of up to 6 people or individual participation welcome',
      'Located at TAURON Arena Kraków with full facilities',
    ],
    goals: [
      'Fostering innovation and creative problem-solving',
      'Building connections between developers, designers, and tech enthusiasts',
      'Providing platform for rapid prototyping and idea validation',
      'Supporting the growth of Poland\'s tech ecosystem',
    ],
    location: 'Kraków, Poland',
    contact: 'https://hackyeah.pl/',
    icon: <Code className="h-8 w-8 text-orange-500" />,
    gradient: 'from-orange-600 to-pink-600',
    specialOffer: {
      title: 'Free Participation',
      description: 'Completely free to participate - just register early!',
      link: 'https://hackyeah.pl/',
      linkText: 'Register Now'
    }
  },
];
