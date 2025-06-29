import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WDI | meet.js',
  description:
    'WDI is a free, open-source, and community-driven initiative to support women in the field of JavaScript.',
  openGraph: {
    title: 'WDI | meet.js',
    description:
      'WDI is a free, open-source, and community-driven initiative to support women in the field of JavaScript.',
    url: 'https://meetjs.pl/wdi',
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

export default function WDIPage({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
