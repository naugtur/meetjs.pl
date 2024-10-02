import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		EVENTS_API_URL: z.string().url(),
		SITE_URL: z.string().url(),
	},
	runtimeEnv: {
		EVENTS_API_URL: process.env.EVENTS_API_URL,
		SITE_URL: process.env.SITE_URL,
	},
});
