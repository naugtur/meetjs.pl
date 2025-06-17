export interface Sponsor {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  type: 'platinum' | 'gold' | 'silver' | 'venue';
  cities?: string[];
}

export const sponsors: Sponsor[] = [
  {
    id: 'sponsor-1',
    name: 'TechCorp Poland',
    description: 'Leading software development company specializing in JavaScript and web technologies.',
    logo: '/images/sponsors/placeholder-logo.svg',
    website: 'https://example.com',
    type: 'platinum',
  },
  {
    id: 'sponsor-2',
    name: 'CodeMasters',
    description: 'Innovative tech consultancy helping businesses build modern web applications.',
    logo: '/images/sponsors/placeholder-logo.svg',
    website: 'https://example.com',
    type: 'gold',
  },
  {
    id: 'sponsor-3',
    name: 'DevTools Pro',
    description: 'Creating developer tools that make coding faster and more efficient.',
    logo: '/images/sponsors/placeholder-logo.svg',
    website: 'https://example.com',
    type: 'gold',
  },
  {
    id: 'sponsor-4',
    name: 'WebStack Solutions',
    description: 'Full-stack development agency with expertise in modern JavaScript frameworks.',
    logo: '/images/sponsors/placeholder-logo.svg',
    website: 'https://example.com',
    type: 'silver',
  },
  {
    id: 'sponsor-5',
    name: 'JS Innovate',
    description: 'JavaScript consulting and training for enterprise teams.',
    logo: '/images/sponsors/placeholder-logo.svg',
    website: 'https://example.com',
    type: 'silver',
  },
  {
    id: 'sponsor-6',
    name: 'Tech Hub Warszawa',
    description: 'Modern coworking and event space for tech communities in Warsaw.',
    logo: '/images/sponsors/placeholder-logo.svg',
    website: 'https://example.com',
    type: 'venue',
    cities: ['warszawa'],
  },
  {
    id: 'sponsor-7',
    name: 'Kraków Code Space',
    description: 'Collaborative workspace and event venue for developers in Kraków.',
    logo: '/images/sponsors/placeholder-logo.svg',
    website: 'https://example.com',
    type: 'venue',
    cities: ['krakow'],
  },
  {
    id: 'sponsor-8',
    name: 'Poznań Tech Campus',
    description: 'Modern tech campus hosting meetups and tech events in Poznań.',
    logo: '/images/sponsors/placeholder-logo.svg',
    website: 'https://example.com',
    type: 'venue',
    cities: ['poznan'],
  },
];
