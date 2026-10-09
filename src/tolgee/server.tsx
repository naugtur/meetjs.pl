import { locale } from 'next/root-params';
import { ALL_LANGUAGES, DEFAULT_LANGUAGE, TolgeeBase } from './shared';
import { createServerInstance } from '@tolgee/react/server';

// The language lives in the `[locale]` root segment, which `src/proxy.ts`
// fills in from the cookie / Accept-Language header via a rewrite. Reading it
// from root params (instead of cookies) keeps pages statically prerenderable.
export async function getLanguage() {
  const value = await locale();
  return ALL_LANGUAGES.includes(value) ? value : DEFAULT_LANGUAGE;
}

export const { getTolgee, getTranslate, T } = createServerInstance({
  getLocale: getLanguage,
  createTolgee: async (language) => {
    return TolgeeBase().init({
      observerOptions: {
        fullKeyEncode: true,
      },
      language,
    });
  },
});
