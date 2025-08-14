import { BookOpen } from 'lucide-react';

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
}

export function getPartnerships(t: (key: string) => string): Partnership[] {
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
