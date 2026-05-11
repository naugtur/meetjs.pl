import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | meet.js - JavaScript Community in Poland',
  description:
    'Stay updated with the latest JavaScript trends, event recaps, and community news from the meet.js community in Poland.',
  keywords: [
    'JavaScript blog',
    'meet.js',
    'web development',
    'frontend',
    'Poland tech community',
  ],
  openGraph: {
    title: 'meet.js Blog - JavaScript Community in Poland',
    description:
      'Articles, tutorials and event recaps from the largest JavaScript community in Poland.',
    url: 'https://meetjs.pl/blog',
    siteName: 'meet.js',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://meetjs.pl/conference.jpg',
        width: 1200,
        height: 630,
        alt: 'meet.js blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'meet.js Blog - JavaScript Community in Poland',
    description:
      'Articles, tutorials and event recaps from the largest JavaScript community in Poland.',
    images: ['https://meetjs.pl/conference.jpg'],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 