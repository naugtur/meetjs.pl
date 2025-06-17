import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sponsors | meet.js - JavaScript Meetups in Poland',
  description:
    'Sponsor meet.js and reach the largest JavaScript community in Poland. Learn about sponsorship benefits, packages, and how to become a sponsor.',
  openGraph: {
    title: 'Sponsors | meet.js - JavaScript Meetups in Poland',
    description:
      'Sponsor meet.js and reach the largest JavaScript community in Poland. Learn about sponsorship benefits, packages, and how to become a sponsor.',
    url: 'https://meetjs.pl/sponsors',
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

export default function SponsorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
