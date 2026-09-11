import {
  FaBrandsDiscord,
  FaBrandsFacebook,
  FaBrandsGithub,
  FaBrandsInstagram,
  FaBrandsLinkedin,
  FaBrandsSquareXTwitter,
  FaBrandsYoutube,
} from 'solid-icons/fa';
import type { JSX } from '@solidjs/web';

export interface socialLink {
  name: string;
  url: string;
  icon: JSX.Element;
}

export const socialLinksData: socialLink[] = [
  {
    name: 'Instagram',
    url: '/instagram',
    icon: <FaBrandsInstagram />,
  },
  {
    name: 'Facebook',
    url: '/facebook',
    icon: <FaBrandsFacebook />,
  },
  {
    name: 'Linkedin',
    url: '/linkedin',
    icon: <FaBrandsLinkedin />,
  },
  {
    name: 'Twitter',
    url: '/x',
    icon: <FaBrandsSquareXTwitter />,
  },
  {
    name: 'Discord',
    url: '/discord',
    icon: <FaBrandsDiscord />,
  },
  {
    name: 'Github',
    url: '/github',
    icon: <FaBrandsGithub />,
  },
  {
    name: 'YouTube',
    url: '/youtube',
    icon: <FaBrandsYoutube />,
  },
];

export const instagramLinksData: socialLink[] = [
  {
    name: 'Instagram',
    url: '/instagram',
    icon: <FaBrandsInstagram />,
  },
  {
    name: 'Białystok',
    url: '/instagram-bialystok',
    icon: <FaBrandsInstagram />,
  },
  {
    name: 'Poznań',
    url: '/instagram-poznan',
    icon: <FaBrandsInstagram />,
  },
  {
    name: 'Wrocław',
    url: '/instagram-wroclaw',
    icon: <FaBrandsInstagram />,
  },
];
