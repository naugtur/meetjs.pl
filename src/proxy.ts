import { NextResponse, type NextRequest } from 'next/server';
import { detectLanguageFromHeaders } from '@tolgee/react/server';
import {
  ALL_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE,
  LANGUAGE_COOKIE_MAX_AGE,
} from '@/tolgee/shared';

// Pages live under `app/[locale]` so each language can be prerendered
// statically, but public URLs stay unprefixed: `/events` is rewritten to
// `/pl/events` or `/en/events` based on the language cookie or browser.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, firstSegment, ...rest] = pathname.split('/');

  if (ALL_LANGUAGES.includes(firstSegment)) {
    // Generated metadata image URLs (og:image) include the locale; serve them
    // directly, since social crawlers handle redirects poorly
    if (METADATA_IMAGE.test(pathname)) {
      return NextResponse.next();
    }

    // `/pl/events` → `/events`, remembering the language. Keeps one public URL
    // per page and makes language-specific links shareable.
    const url = request.nextUrl.clone();
    url.pathname = `/${rest.join('/')}`;
    const response = NextResponse.redirect(url);
    response.cookies.set(LANGUAGE_COOKIE, firstSegment, {
      maxAge: LANGUAGE_COOKIE_MAX_AGE,
    });
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${getRequestLanguage(request)}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

const METADATA_IMAGE = /\/(opengraph|twitter)-image(-[\w]+)?$/;

function getRequestLanguage(request: NextRequest) {
  const cookie = request.cookies.get(LANGUAGE_COOKIE)?.value;
  if (cookie && ALL_LANGUAGES.includes(cookie)) {
    return cookie;
  }
  return (
    detectLanguageFromHeaders(request.headers, ALL_LANGUAGES) ||
    DEFAULT_LANGUAGE
  );
}

export const config = {
  // Skip API routes, Next internals and files with an extension
  // (robots.txt, sitemap.xml, images in /public).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
