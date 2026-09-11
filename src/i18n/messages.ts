import en from '../../messages/en.json';
import pl from '../../messages/pl.json';

export const ALL_LANGUAGES = ['en', 'pl'] as const;
export type Language = (typeof ALL_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = 'en';

type Messages = typeof en;

export const MESSAGES: Record<Language, Messages> = { en, pl };
