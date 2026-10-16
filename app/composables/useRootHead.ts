/**
 * Head tags shared by every page (former root layout metadata that pages
 * never override) and the Organization JSON-LD.
 */
export const useRootHead = () => {
  const language = useLanguage();
  const siteUrl = useRuntimeConfig().public.siteUrl;

  useHead({
    htmlAttrs: { lang: language, class: 'scroll-smooth' },
    meta: [
      { name: 'application-name', content: 'meet.js' },
      { name: 'author', content: 'meet.js community' },
      { name: 'creator', content: 'meet.js' },
      { name: 'publisher', content: 'meet.js' },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'googlebot',
        content:
          'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1',
      },
      { name: 'category', content: 'technology' },
      {
        name: 'format-detection',
        content: 'telephone=no, address=no, email=no',
      },
    ],
    link: [
      { rel: 'shortcut icon', href: '/favicon.ico' },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/favicon.ico' },
    ],
    script: [
      {
        id: 'schema-markup',
        type: 'application/ld+json',
        tagPosition: 'bodyClose',
        innerHTML: JSON.stringify(organizationSchema(siteUrl)),
      },
    ],
  });
};
