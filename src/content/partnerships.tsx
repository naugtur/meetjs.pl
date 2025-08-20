import { BookOpen, Bot } from 'lucide-react';
import { getTranslate } from '@/tolgee/server';

export interface Partnership {
  key: string;
  name: string;
  website: string;
  description: string;
  details: string[];
  goals: string[];
  location: string;
  contact: string;
  icon: React.ReactNode;
  gradient: string;
  photos: {
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

export async function getPartnerships(): Promise<Partnership[]> {
  const t = await getTranslate();

  const mlodzi4itDetails = [
    t('community_partnerships.partnerships.mlodzi4it.details.0'),
    t('community_partnerships.partnerships.mlodzi4it.details.1'),
    t('community_partnerships.partnerships.mlodzi4it.details.2'),
    t('community_partnerships.partnerships.mlodzi4it.details.3'),
    t('community_partnerships.partnerships.mlodzi4it.details.4'),
  ];

  const mlodzi4itGoals = [
    t('community_partnerships.partnerships.mlodzi4it.goals.0'),
    t('community_partnerships.partnerships.mlodzi4it.goals.1'),
    t('community_partnerships.partnerships.mlodzi4it.goals.2'),
    t('community_partnerships.partnerships.mlodzi4it.goals.3'),
  ];

  return [
    {
      key: 'futureconf',
      name: 'FutureConf 2025',
      website: 'https://futureconf.tech/',
      description:
        'Two-day AI conference in Kraków focused on "AI in Production" with industry experts and practical use cases.',
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
          caption: 'Conference atmosphere with hundreds of AI enthusiasts',
        },
        {
          src: 'https://futureconf.tech/assets/photobooth/uczestnik2.webp',
          alt: 'Conference speakers at FutureConf',
          caption: 'Industry experts sharing AI knowledge',
        },
        {
          src: 'https://futureconf.tech/assets/photobooth/uczestnik.webp',
          alt: 'Conference attendees networking',
          caption: 'Active networking and knowledge exchange',
        },
        {
          src: 'https://futureconf.tech/assets/ludzie-10.webp',
          alt: 'FutureConf community gathering',
          caption: 'Building the AI community in Poland',
        },
      ],
      specialOffer: {
        title: 'Group Discount System',
        description: 'Up to 50% off through meet.js partnership',
        link: 'https://futureconf.tech/meetjs/',
        linkText: 'Get Group Discount',
      },
    },
    {
      key: 'mlodzi4it',
      name: t('community_partnerships.partnerships.mlodzi4it.name'),
      website: 'https://www.mlodzi4it.com/',
      description: t(
        'community_partnerships.partnerships.mlodzi4it.description',
      ),
      details: mlodzi4itDetails,
      goals: mlodzi4itGoals,
      location: t('community_partnerships.partnerships.mlodzi4it.location'),
      contact: 'mlodzi4it@gmail.com',
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      gradient: 'from-blue-500 to-purple-600',
      photos: [
        {
          src: '/partnerships/mlodzi4it-workshop-1.jpg',
          alt: t('community_partnerships.partnerships.mlodzi4it.photos.0.alt'),
          caption: t(
            'community_partnerships.partnerships.mlodzi4it.photos.0.caption',
          ),
        },
        {
          src: '/partnerships/mlodzi4it-workshop-2.jpg',
          alt: t('community_partnerships.partnerships.mlodzi4it.photos.1.alt'),
          caption: t(
            'community_partnerships.partnerships.mlodzi4it.photos.1.caption',
          ),
        },
        {
          src: '/partnerships/mlodzi4it-workshop-3.jpg',
          alt: t('community_partnerships.partnerships.mlodzi4it.photos.2.alt'),
          caption: t(
            'community_partnerships.partnerships.mlodzi4it.photos.2.caption',
          ),
        },
        {
          src: '/partnerships/mlodzi4it-workshop-4.jpg',
          alt: t('community_partnerships.partnerships.mlodzi4it.photos.3.alt'),
          caption: t(
            'community_partnerships.partnerships.mlodzi4it.photos.3.caption',
          ),
        },
        {
          src: '/partnerships/mlodzi4it-workshop-5.jpg',
          alt: t('community_partnerships.partnerships.mlodzi4it.photos.4.alt'),
          caption: t(
            'community_partnerships.partnerships.mlodzi4it.photos.4.caption',
          ),
        },
      ],
    },
  ];
}
