import { Metadata } from 'next';
import { env } from '@/env';

export const metadata: Metadata = {
  title: 'About meet.js',
  description:
    'Learn more about meet.js, the community-driven JavaScript meetup in Wrocław.',
  alternates: {
    canonical: `${env.SITE_URL}/about`,
  },
  openGraph: {
    title: 'About meet.js',
    description:
      'Learn more about meet.js, the community-driven JavaScript meetup in Wrocław.',
    url: 'https://meetjs.pl/about',
    siteName: 'meet.js',
    images: [
      {
        url: 'https://meetjs.pl/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
