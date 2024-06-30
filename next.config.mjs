/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/facebook',
				destination: 'https://www.facebook.com/meetjspl',
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

export default nextConfig;
