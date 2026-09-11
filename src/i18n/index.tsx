import {
  createContext,
  createSignal,
  useContext,
  type Accessor,
  type ParentProps,
} from 'solid-js';
import { getRequestEvent, isServer } from '@solidjs/web';
import {
  ALL_LANGUAGES,
  DEFAULT_LANGUAGE,
  MESSAGES,
  type Language,
} from './messages';

export const LANGUAGE_COOKIE = 'NEXT_LOCALE';

type Params = Record<string, string | number>;
export type TFunction = (key: string, params?: Params) => string;

interface I18nContextValue {
  language: Accessor<Language>;
  t: TFunction;
}

const I18nContext = createContext<I18nContextValue>();

function isLanguage(value: string | undefined): value is Language {
  return !!value && (ALL_LANGUAGES as readonly string[]).includes(value);
}

function languageFromCookie(cookieHeader: string | null): Language | undefined {
  if (!cookieHeader) return undefined;
  for (const part of cookieHeader.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === LANGUAGE_COOKIE) {
      const value = decodeURIComponent(rest.join('='));
      if (isLanguage(value)) return value;
    }
  }
  return undefined;
}

function languageFromAcceptLanguage(
  header: string | null,
): Language | undefined {
  if (!header) return undefined;
  let best: { lang: Language; q: number } | undefined;
  for (const part of header.split(',')) {
    const [tag, ...params] = part.trim().split(';');
    const base = tag.trim().toLowerCase().split('-')[0];
    if (!isLanguage(base)) continue;
    const qParam = params.find((p) => p.trim().startsWith('q='));
    const q = qParam ? Number(qParam.split('=')[1]) || 0 : 1;
    if (!best || q > best.q) best = { lang: base, q };
  }
  return best?.lang;
}

// The request language: cookie first, then Accept-Language, then the default.
// On the client the server-rendered <html lang> carries the same answer, so
// hydration agrees.
export function getRequestLanguage(): Language {
  if (isServer) {
    const request = getRequestEvent()?.request;
    if (request) {
      return (
        languageFromCookie(request.headers.get('cookie')) ??
        languageFromAcceptLanguage(request.headers.get('accept-language')) ??
        DEFAULT_LANGUAGE
      );
    }
  }
  const lang = document.documentElement.lang;
  if (isLanguage(lang)) return lang;
  return languageFromCookie(document.cookie) ?? DEFAULT_LANGUAGE;
}

function lookup(dict: unknown, key: string): string | undefined {
  let node = dict;
  for (const part of key.split('.')) {
    if (node == null || typeof node !== 'object') return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === 'string' ? node : undefined;
}

function interpolate(text: string, params?: Params): string {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}

export function I18nProvider(props: ParentProps) {
  const [language] = createSignal<Language>(getRequestLanguage());

  const t: TFunction = (key, params) => {
    const text =
      lookup(MESSAGES[language()], key) ??
      lookup(MESSAGES[DEFAULT_LANGUAGE], key) ??
      key;
    return interpolate(text, params);
  };

  return <I18nContext value={{ language, t }}>{props.children}</I18nContext>;
}

export function useTranslate() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslate must be used inside I18nProvider');
  return { t: ctx.t, language: ctx.language };
}

// Drop-in for the old useLocale hook: the language plus the BCP-47 locale the
// date/time formatters expect.
export function useLocale(): { language: Language; locale: 'en-US' | 'pl-PL' } {
  const { language } = useTranslate();
  return {
    get language() {
      return language();
    },
    get locale() {
      return language() === 'pl' ? 'pl-PL' : 'en-US';
    },
  };
}

// Persist the choice and reload — the server renders the next response in the
// new language. Client-side only.
export function setLanguage(locale: string) {
  if (!isLanguage(locale)) return;
  document.cookie = `${LANGUAGE_COOKIE}=${locale}; max-age=${60 * 60 * 24 * 365}; path=/`;
}
