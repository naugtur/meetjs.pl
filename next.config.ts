import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';

import createMDX from '@next/mdx';
import { NextConfig } from 'next';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/env.ts');

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  turbopack: {},
  reactCompiler: {
    compilationMode: 'annotation',
  },
  experimental: {
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
      {
        protocol: 'https',
        hostname: 'futureconf.tech',
      },
      {
        protocol: 'https',
        hostname: 'piccalil.li',
      },
      {
        protocol: 'https',
        hostname: 'aiminers.pl',
        pathname: '/logo.png',
      },
      {
        protocol: 'https',
        hostname: 'ng-poland.pl',
      },
      {
        protocol: 'https',
        hostname: 'js-poland.pl',
      },
      {
        protocol: 'https',
        hostname: 'ai-poland.pl',
      },
      {
        protocol: 'https',
        hostname: 'assets.devographics.com',
      },
      {
        protocol: 'https',
        hostname: 'conf.react.dev',
      },
      {
        protocol: 'https',
        hostname: 'nextjs.org',
      },
      {
        protocol: 'https',
        hostname: 'www.uczmnie.pl',
      },
    ],
    // Next.js 16 defaults: minimumCacheTTL changed from 60s to 4 hours (14400s)
    // qualities default changed from [1..100] to [75]
    // Explicitly setting these to be aware of the defaults
    minimumCacheTTL: 14400, // 4 hours - new default
    qualities: [75, 90], // Adding 90 for high-quality images when needed
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
        source: '/instagram',
        destination: 'https://www.instagram.com/meet.js_poland',
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
        destination: 'https://discord.gg/8r9XKTeNW8',
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
      {
        source: '/organizers',
        destination: '/how-to-become-an-organizer',
        permanent: true,
      },
      {
        source: '/organization',
        destination: '/how-to-become-an-organizer',
        permanent: true,
      },
      {
        source: '/promos',
        destination: '/discounts',
        permanent: true,
      },
    ];
  },
};

// https://github.com/vercel/next.js/issues/71819

const withMdx = createMDX({});
export default withMdx(nextConfig);
