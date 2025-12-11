import { Metadata } from 'next';
import { getTranslate } from '@/tolgee/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslate();

  return {
    title: t('brand.title'),
    description: t('brand.description'),
    openGraph: {
      title: t('brand.title'),
      description: t('brand.description'),
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
}

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
