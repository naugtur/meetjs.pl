import { env } from 'virtual:env/client';

// The site's canonical origin — safe for both server render and client bundle.
export const SITE_URL = env.VITE_SITE_URL;
