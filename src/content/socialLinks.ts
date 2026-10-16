/** Icon names refer to Font Awesome 6 brand icons (see app/components/SocialIcon.vue). */
export type SocialIconName =
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'square-x-twitter'
  | 'discord'
  | 'github'
  | 'youtube';

export interface socialLink {
  name: string;
  url: string;
  icon: SocialIconName;
}

export const socialLinksData: socialLink[] = [
  {
    name: 'Instagram',
    url: '/instagram',
    icon: 'instagram',
  },
  {
    name: 'Facebook',
    url: '/facebook',
    icon: 'facebook',
  },
  {
    name: 'Linkedin',
    url: '/linkedin',
    icon: 'linkedin',
  },
  {
    name: 'Twitter',
    url: '/x',
    icon: 'square-x-twitter',
  },
  {
    name: 'Discord',
    url: '/discord',
    icon: 'discord',
  },
  {
    name: 'Github',
    url: '/github',
    icon: 'github',
  },
  {
    name: 'YouTube',
    url: '/youtube',
    icon: 'youtube',
  },
];

export const instagramLinksData: socialLink[] = [
  {
    name: 'Instagram',
    url: '/instagram',
    icon: 'instagram',
  },
  {
    name: 'Białystok',
    url: '/instagram-bialystok',
    icon: 'instagram',
  },
  {
    name: 'Poznań',
    url: '/instagram-poznan',
    icon: 'instagram',
  },
  {
    name: 'Wrocław',
    url: '/instagram-wroclaw',
    icon: 'instagram',
  },
];
