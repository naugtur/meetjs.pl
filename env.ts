import { z } from 'zod';

// The typed env schema (probed by the plugin from the project root): plain
// objects of Standard Schema validators.
//
// `server` vars come through `virtual:env/server` (server modules only —
// importing it from client code fails the build) and are read from
// process.env at BOOT, validated then. `client` vars must carry the public
// VITE_ prefix and come through `virtual:env/client` as validated values
// baked into the bundle. Generated types land in solid-env.d.ts.
export default {
  server: {
    EVENTS_API_URL: z.string().url(),
    DISCORD_SERVER_ID: z.string(),
    SPEAKERS_API_URL: z.string().url().optional(),
    SPEAKERS_API_TOKEN: z.string().optional(),
  },
  client: {
    // The site's own public URL — used for canonical links and OG tags in
    // shared components, so it ships in the bundle.
    VITE_SITE_URL: z.string().url().default('https://meetjs.pl'),
  },
};
