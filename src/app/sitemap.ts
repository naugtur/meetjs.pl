import { MetadataRoute } from 'next';
import { env } from '@/env';
import CITIES from '@/content/cities';

const sitemap = (): MetadataRoute.Sitemap => {
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  // City pages from the cities content
  const cities: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${env.SITE_URL}${city.href}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: env.SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${env.SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${env.SITE_URL}/events`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${env.SITE_URL}/discounts`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${env.SITE_URL}/30-years-of-javascript`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${env.SITE_URL}/how-to-become-an-organizer`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${env.SITE_URL}/brand`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${env.SITE_URL}/jsnation-award`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${env.SITE_URL}/community-partnerships`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  return [...mainPages, ...cities];
};

export default sitemap;
