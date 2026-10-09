import { DevTools, Tolgee, FormatSimple } from '@tolgee/web';

const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL;

export const ALL_LANGUAGES = ['en', 'pl'];
export const DEFAULT_LANGUAGE = 'en';
export const LANGUAGE_COOKIE = 'NEXT_LOCALE';
export const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // one year in seconds

export function TolgeeBase() {
  return Tolgee()
    .use(FormatSimple()) // replace with .use(FormatIcu()) for rendering plurals, formatted numbers, etc.
    .use(DevTools())
    .updateDefaults({
      apiKey,
      apiUrl,
      staticData: {
        en: () => import('../../messages/en.json'),
        pl: () => import('../../messages/pl.json'),
      },
      // For development without API key, prioritize static data
      fallbackLanguage: DEFAULT_LANGUAGE,
      availableLanguages: ALL_LANGUAGES,
    });
}
