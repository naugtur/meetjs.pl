import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'meet.js Wrocław Nominated for JavaScript Open Source Awards | meet.js',
  description:
    'meet.js Wrocław has been nominated for the JavaScript Open Source Awards in the Community of the Year category for 2025!',
  openGraph: {
    title:
      'meet.js Wrocław Nominated for JavaScript Open Source Awards | meet.js',
    description:
      'meet.js Wrocław has been nominated for the JavaScript Open Source Awards in the Community of the Year category for 2025!',
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
