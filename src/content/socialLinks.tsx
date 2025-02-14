import {
	FaDiscord,
	FaFacebook,
	FaGithub,
	FaInstagram,
	FaLinkedin,
	FaSquareXTwitter,
	FaYoutube,
} from 'react-icons/fa6';
import type { JSX } from 'react';

export interface socialLink {
	name: string;
	url: string;
	icon: JSX.Element;
}

export const socialLinksData: socialLink[] = [
	{
		name: 'Instagram',
		url: '/instagram',
		icon: <FaInstagram />,
	},
	{
		name: 'Facebook',
		url: '/facebook',
		icon: <FaFacebook />,
	},
	{
		name: 'Linkedin',
		url: '/linkedin',
		icon: <FaLinkedin />,
	},
	{
		name: 'Twitter',
		url: '/x',
		icon: <FaSquareXTwitter />,
	},
	{
		name: 'Discord',
		url: '/discord',
		icon: <FaDiscord />,
	},
	{
		name: 'Github',
		url: '/github',
		icon: <FaGithub />,
	},
	{
		name: 'YouTube',
		url: '/youtube',
		icon: <FaYoutube />,
	},
];

export const instagramLinksData: socialLink[] = [
	{
		name: 'Instagram',
		url: '/instagram',
		icon: <FaInstagram />,
	},
	{
		name: 'Białystok',
		url: '/instagram-bialystok',
		icon: <FaInstagram />,
	},
	{
		name: 'Poznań',
		url: '/instagram-poznan',
		icon: <FaInstagram />,
	},
	{
		name: 'Wrocław',
		url: '/instagram-wroclaw',
		icon: <FaInstagram />,
	},
];
