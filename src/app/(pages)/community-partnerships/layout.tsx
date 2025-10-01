import { Metadata } from 'next';
import { env } from '@/env';

export const metadata: Metadata = {
  title: 'Community Partnerships | meet.js',
  description:
    'Educational and community initiatives supported by meet.js - building a stronger tech community together.',
  alternates: {
    canonical: `${env.SITE_URL}/community-partnerships`,
  },
  openGraph: {
    title: 'Community Partnerships | meet.js',
    description:
      'Educational and community initiatives supported by meet.js - building a stronger tech community together.',
    url: 'https://meetjs.pl/community-partnerships',
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

export default function CommunityPartnershipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
