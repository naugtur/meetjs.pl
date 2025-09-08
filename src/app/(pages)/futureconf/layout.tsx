import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FutureConf 2025 - AI in Production | meet.js Partnership',
  description:
    'Join FutureConf 2025 in Kraków (October 27-28) with up to 50% off through our group discount system. AI in Production conference featuring speakers from Hugging Face, mBank, Docker, and more.',
  keywords: [
    'FutureConf 2025',
    'AI conference',
    'Kraków',
    'AI in Production',
    'machine learning',
    'artificial intelligence',
    'meet.js',
    'discount',
    'group discount',
    'tech conference',
  ],
  openGraph: {
    title: 'FutureConf 2025 - AI in Production | meet.js Partnership',
    description:
      'Join FutureConf 2025 in Kraków with up to 50% off through our group discount system. October 27-28 at International Cultural Centre.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FutureConf 2025 - AI in Production | meet.js Partnership',
    description:
      'Join FutureConf 2025 in Kraków with up to 50% off through our group discount system.',
  },
};

export default function FutureConfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
