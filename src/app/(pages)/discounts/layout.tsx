import { Metadata } from 'next';
import { getTranslate } from '@/tolgee/server';
import { env } from '@/env';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslate();

  return {
    title: t('discounts.meta_title'),
    description: t('discounts.meta_description'),
    alternates: {
      canonical: `${env.SITE_URL}/discounts`,
    },
    openGraph: {
      title: t('discounts.meta_title'),
      description: t('discounts.meta_description'),
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
}

export default function DiscountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
