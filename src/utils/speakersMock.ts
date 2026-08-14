import { SpeakerType } from '@/types/speaker';

export const MOCK_SPEAKERS: SpeakerType[] = [
  {
    id: 1,
    name: 'Anna',
    surname: 'Kowalska',
    slug: 'anna-kowalska',
    image: 'https://avatars.githubusercontent.com/u/1',
    events_count: 12,
    url: 'https://meetjs.pl',
  },
  {
    id: 2,
    name: 'Jan',
    surname: 'Nowak',
    slug: 'jan-nowak',
    image: 'https://avatars.githubusercontent.com/u/2',
    events_count: 8,
    url: 'https://meetjs.pl',
  },
  {
    id: 3,
    name: 'Dev',
    surname: '',
    slug: 'dev-placeholder',
    events_count: 0,
    url: 'https://meetjs.pl',
  },
];
