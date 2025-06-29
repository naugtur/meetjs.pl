import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'meet.js 14th Birthday | meet.js',
  description: 'meet.js has celebrated its 14th birthday!',
  openGraph: {
    title: 'meet.js 14th Birthday | meet.js',
    description: 'meet.js has celebrated its 14th birthday!',
    url: 'https://meetjs.pl/14-birthday',
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

export default function BirthdayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
