import type { Metadata } from 'next';
import { getTranslate } from '@/tolgee/server';
import { env } from '@/env';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslate();
  const title = t('js_hero_2026.meta_title');
  const description = t('js_hero_2026.meta_description');
  const url = `${env.SITE_URL}/js-hero-2026`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'meet.js',
      images: [
        {
          url: `${env.SITE_URL}/js-hero-2026/adrian-stage.jpg`,
          width: 768,
          height: 1024,
          alt: t('js_hero_2026.photo_stage_alt'),
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${env.SITE_URL}/js-hero-2026/adrian-stage.jpg`],
    },
  };
}

export default function JSHero2026Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
