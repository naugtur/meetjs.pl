import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Assets | meet.js',
  description: 'Download meet.js brand assets, logos, and wallpapers for your use.',
  openGraph: {
    title: 'Brand Assets | meet.js',
    description: 'Download meet.js brand assets, logos, and wallpapers for your use.',
    url: 'https://meetjs.pl/brand',
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

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
