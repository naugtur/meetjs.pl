import { MetadataRoute } from 'next';
import { env } from '@/env';
import CITIES from '@/content/cities';

const sitemap = (): MetadataRoute.Sitemap => {
	const cities: MetadataRoute.Sitemap = CITIES.map((city) => ({
		url: `${env.SITE_URL}${city.href}`,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.8,
	}));
	return [
		{
			url: env.SITE_URL,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		...cities,
	];
};

export default sitemap;
