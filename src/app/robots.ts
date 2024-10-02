import { MetadataRoute } from 'next';
import { env } from '@/env';

const robots = (): MetadataRoute.Robots => {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/private/',
		},
		sitemap: `${env.SITE_URL}/sitemap.xml`,
	};
};

export default robots;
