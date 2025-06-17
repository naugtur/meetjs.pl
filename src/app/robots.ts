import { MetadataRoute } from 'next';
import { env } from '@/env';

/**
 * Robots.ts file for meet.js website
 * 
 * Note: We also have an llms.txt file in the public directory for LLM-specific information
 * This file can be accessed at: https://meetjs.pl/llms.txt
 */
const robots = (): MetadataRoute.Robots => {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
			},
			{
				// Allow OpenAI's crawler
				userAgent: 'GPTBot',
				allow: '/',
			},
			{
				// Allow Anthropic's crawler
				userAgent: 'Anthropic-AI',
				allow: '/',
			},
			{
				// Allow Common Crawl's bot
				userAgent: 'CCBot',
				allow: '/',
			},
			{
				// Allow Google's extended crawler
				userAgent: 'Google-Extended',
				allow: '/',
			},
			{
				// Allow Microsoft's crawler
				userAgent: 'Bingbot',
				allow: '/',
			},
		],
		sitemap: `${env.SITE_URL}/sitemap.xml`,
		// Custom field for LLMs.txt (will be included as a comment in the generated robots.txt)
		host: env.SITE_URL,
	};
};

export default robots;
