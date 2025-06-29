import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discounts & Special Offers | meet.js',
  description:
    'Exclusive discounts and special offers for software tools, events, and conferences for the meet.js community.',
  openGraph: {
    title: 'Discounts & Special Offers | meet.js',
    description:
      'Exclusive discounts and special offers for software tools, events, and conferences for the meet.js community.',
    url: 'https://meetjs.pl/discounts',
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

export default function DiscountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
