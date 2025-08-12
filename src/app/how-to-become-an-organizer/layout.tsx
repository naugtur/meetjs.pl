import { Metadata } from 'next';
import { getTranslate } from '@/tolgee/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslate();
  
  return {
    title: t('organizer.meta_title'),
    description: t('organizer.meta_description'),
    openGraph: {
      title: t('organizer.meta_title'),
      description: t('organizer.meta_description'),
      url: 'https://meetjs.pl/how-to-become-an-organizer',
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

export default function HowToBecomeAnOrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
