import { Metadata } from 'next';
import { env } from '@/env';

export const metadata: Metadata = {
  title: 'WE WON! meet.js Wrocław - Community of the Year 2025 | meet.js',
  description:
    'meet.js Wrocław has WON the JavaScript Open Source Award for Community of the Year 2025! Thank you for your incredible support!',
  alternates: {
    canonical: `${env.SITE_URL}/jsnation-award`,
  },
  openGraph: {
    title: 'WE WON! meet.js Wrocław - Community of the Year 2025 | meet.js',
    description:
      'meet.js Wrocław has WON the JavaScript Open Source Award for Community of the Year 2025! Thank you for your incredible support!',
    url: 'https://meetjs.pl/jsnation-award',
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

export default function JSNationAwardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
