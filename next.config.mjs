import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';

import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/env.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		reactCompiler: true,
		staleTimes: {
			dynamic: 30,
		},
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
		];
	},
};

const withMdx = createMDX({
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [],
	},
});
export default withMdx(nextConfig);
