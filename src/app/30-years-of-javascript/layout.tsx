import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '30 Years of JavaScript | meet.js',
  description:
    'Celebrating 30 years of JavaScript - from its creation in 1995 to becoming the most widely used programming language in the world.',
  openGraph: {
    title: '30 Years of JavaScript | meet.js',
    description:
      'Celebrating 30 years of JavaScript - from its creation in 1995 to becoming the most widely used programming language in the world.',
    url: 'https://meetjs.pl/30-years-of-javascript',
    siteName: 'meet.js',
    images: [
      {
        url: 'https://meetjs.pl/og/javascript-30-years-og.png',
        width: 1200,
        height: 630,
        alt: '30 Years of JavaScript',
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
