import { detectLanguageFromHeaders } from '@tolgee/web';

export const LANGUAGES = ['en', 'pl'] as const;
export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = 'en';

/** Cookie name kept from the Next.js site so returning users keep their language. */
export const LANGUAGE_COOKIE = 'NEXT_LOCALE';
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const isLanguage = (value: unknown): value is Language =>
  LANGUAGES.includes(value as Language);

/**
 * Current language, resolved once per request on the server and hydrated on
 * the client: `NEXT_LOCALE` cookie → `Accept-Language` (first entry, as
 * Tolgee does) → English.
 */
export const useLanguage = () =>
  useState<Language>('language', () => {
    const cookie = useCookie(LANGUAGE_COOKIE);
    if (isLanguage(cookie.value)) return cookie.value;

    if (import.meta.server) {
      const headers = new Headers(useRequestHeaders(['accept-language']));
      const detected = detectLanguageFromHeaders(headers, [...LANGUAGES]);
      if (isLanguage(detected)) return detected;
    }

    return DEFAULT_LANGUAGE;
  });

export const useLanguageCookie = () =>
  useCookie<string | null | undefined>(LANGUAGE_COOKIE, {
    maxAge: ONE_YEAR_IN_SECONDS,
    path: '/',
    sameSite: 'lax',
  });

/** BCP 47 locale used for date and number formatting. */
export const useLocale = () => {
  const language = useLanguage();
  return computed(() => (language.value === 'pl' ? 'pl-PL' : 'en-US'));
};
