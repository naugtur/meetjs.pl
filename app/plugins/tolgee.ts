import type { Ref } from 'vue';
import {
  DevTools,
  FormatSimple,
  Tolgee,
  VueTolgee,
  type TolgeeVueContext,
} from '@tolgee/vue';

/**
 * Tolgee with the bundled messages/*.json — the same runtime and formatter as
 * the Next.js site, so translations render identically. On the server a new
 * instance is created per request; the client hydrates with the language
 * resolved by the server (see useLanguage).
 */
export default defineNuxtPlugin({
  name: 'tolgee',
  async setup(nuxtApp) {
    const config = useRuntimeConfig();
    const language = useLanguage();

    const tolgee = Tolgee()
      .use(FormatSimple())
      .use(DevTools())
      .init({
        language: language.value,
        apiKey: import.meta.dev
          ? config.public.tolgeeApiKey || undefined
          : undefined,
        apiUrl: config.public.tolgeeApiUrl || undefined,
        availableLanguages: [...LANGUAGES],
        fallbackLanguage: DEFAULT_LANGUAGE,
        staticData: {
          en: () => import('~~/messages/en.json'),
          pl: () => import('~~/messages/pl.json'),
        },
      });

    // `enableSSR` renders without in-context-editing markers until hydration
    // is complete, so server and client markup match. Pages and layouts
    // hydrate asynchronously (Suspense), i.e. after `app:mounted`.
    nuxtApp.vueApp.use(VueTolgee, { tolgee, enableSSR: true });
    await tolgee.run();

    if (import.meta.client) {
      onNuxtReady(() => {
        const context = nuxtApp.vueApp._context.provides.tolgeeContext as
          | Ref<TolgeeVueContext>
          | undefined;
        if (context) context.value.isInitialRender = false;
      });
      watch(language, (value) => tolgee.changeLanguage(value));
    }

    return { provide: { tolgee } };
  },
});
