import { Metadata } from 'next';
import { getTranslate } from '@/tolgee/server';
import { env } from '@/env';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslate();

  return {
    title: t('open_source.meta_title'),
    description: t('open_source.meta_description'),
    alternates: {
      canonical: `${env.SITE_URL}/open-source`,
    },
    openGraph: {
      title: t('open_source.meta_title'),
      description: t('open_source.meta_description'),
      url: 'https://meetjs.pl/open-source',
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

export default function OpenSourceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
