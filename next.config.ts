import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';

import createMDX from '@next/mdx';
import { NextConfig } from 'next';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/env.ts');

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	reactStrictMode: true,
	experimental: {
		reactCompiler: true,
		staleTimes: {
			dynamic: 30,
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'media.licdn.com',
			},
		],
	},
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
	async redirects() {
		return [
			{
				source: '/facebook',
				destination: 'https://www.facebook.com/meetjspl',
				permanent: true,
			},
			{
				source: '/instagram-bialystok',
				destination: 'https://www.instagram.com/meet.js_bialystok',
				permanent: true,
			},
			{
				source: '/instagram-poznan',
				destination: 'https://www.instagram.com/meet.js_poznan',
				permanent: true,
			},
			{
				source: '/instagram-wroclaw',
				destination: 'https://www.instagram.com/meetjs_wroclaw',
				permanent: true,
			},
			{
				source: '/linkedin',
				destination: 'https://www.linkedin.com/company/meetjs',
				permanent: true,
			},
			{
				source: '/x',
				destination: 'https://x.com/meetjs',
				permanent: true,
			},
			{
				source: '/discord',
				destination: 'https://discord.gg/UycCSpRh6j',
				permanent: true,
			},
			{
				source: '/github',
				destination: 'https://github.com/meetjspl',
				permanent: true,
			},
			{
				source: '/youtube',
				destination: 'https://www.youtube.com/@meetjs',
				permanent: true,
			},
		];
	},
};

// https://github.com/vercel/next.js/issues/71819

const withMdx = createMDX({

});
export default withMdx(nextConfig);
