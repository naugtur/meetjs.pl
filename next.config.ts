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
  experimental: {
    reactCompiler: {
      compilationMode: 'annotation',
    },
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
    ],
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
