import type { Participant } from '@/types/passport';

export const PARTICIPANTS: Participant[] = [
  {
    slug: 'adrian-romanski',
    displayName: 'Adrian Romański',
    image:
      'https://crossweb.pl/upload/gallery/user/127753/271x271/IMG_6643.jpeg',
    profileUrl: 'https://crossweb.pl/profile/adrian-romanski/127753/',
  },
  {
    slug: 'michal-hadrysiak',
    displayName: 'Michał Hadrysiak',
    profileUrl: 'https://crossweb.pl/profile/michal-hadrysiak/125634/',
  },
  {
    slug: 'jakub-wasik',
    displayName: 'Jakub Wąsik',
    image: 'https://avatars.githubusercontent.com/u/32049761',
    profileUrl: 'https://crossweb.pl/profile/kuba-wasik/123026/',
  },
];

export default PARTICIPANTS;
