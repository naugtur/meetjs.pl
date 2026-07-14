import { Metadata } from 'next';
import { getTranslate } from '@/tolgee/server';
import { env } from '@/env';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslate();

  return {
    title: t('passport.hall_of_fame.meta_title'),
    description: t('passport.hall_of_fame.meta_description'),
    alternates: {
      canonical: `${env.SITE_URL}/passport`,
    },
  };
}

export default function PassportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
