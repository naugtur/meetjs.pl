'use server';

import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE, LANGUAGE_COOKIE_MAX_AGE } from './shared';

export async function setLanguage(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set(LANGUAGE_COOKIE, locale, {
    maxAge: LANGUAGE_COOKIE_MAX_AGE,
  });
}
