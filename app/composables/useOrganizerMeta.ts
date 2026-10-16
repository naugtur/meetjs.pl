import { useTranslate } from '@tolgee/vue';

/** Metadata of /how-to-become-an-organizer and its sub-pages. */
export const useOrganizerMeta = () => {
  const { t } = useTranslate();
  useSiteMeta(() => ({
    title: t.value('organizer.meta_title'),
    description: t.value('organizer.meta_description'),
    openGraph: {
      title: t.value('organizer.meta_title'),
      description: t.value('organizer.meta_description'),
      url: 'https://meetjs.pl/how-to-become-an-organizer',
      siteName: 'meet.js',
      images: [DEFAULT_OG_IMAGE],
      locale: 'en_US',
      type: 'website',
    },
  }));
};
