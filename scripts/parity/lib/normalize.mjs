// Normalization so that framework artefacts do not show up as differences:
// image optimizer URLs are decoded to their source, absolute URLs on the site
// origin become `{SITE}/…`, whitespace is collapsed.

import { SITE_ORIGIN } from '../config.mjs';

const ABSOLUTE = /^[a-z][a-z0-9+.-]*:|^\/\//i;

const safeDecode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

/** Decodes /_next/image, /_vercel/image and /_ipx URLs to the original source. */
export const decodeImageUrl = (url) => {
  if (url.pathname === '/_next/image' || url.pathname === '/_vercel/image') {
    return url.searchParams.get('url');
  }
  if (url.pathname.startsWith('/_ipx/')) {
    const rest = url.pathname.slice('/_ipx/'.length);
    const source = rest.slice(rest.indexOf('/') + 1);
    if (/^https?:\/\/?/.test(source)) {
      return safeDecode(source.replace(/^(https?:)\/?\/?/, '$1//'));
    }
    return `/${safeDecode(source)}`;
  }
  return null;
};

/**
 * @param {string | null | undefined} raw attribute value
 * @param {{ base: string, origins?: string[] }} options
 */
export const normalizeUrl = (raw, { base, origins = [] }) => {
  if (raw === null || raw === undefined) return raw;
  const value = String(raw).trim();
  if (value === '' || /^(mailto|tel|javascript|data):/i.test(value)) {
    return value.replace(/^data:([^;,]+)[;,].*$/s, 'data:$1…');
  }

  let url;
  try {
    url = new URL(value, base);
  } catch {
    return value;
  }

  const decoded = decodeImageUrl(url);
  if (decoded) return normalizeUrl(decoded, { base, origins });

  const siteOrigins = new Set(
    [new URL(base).origin, SITE_ORIGIN, ...origins].map(
      (origin) => new URL(origin).origin,
    ),
  );
  if (!siteOrigins.has(url.origin)) return url.href;

  const path = `${safeDecode(url.pathname)}${safeDecode(url.search)}${url.hash}`;
  return ABSOLUTE.test(value) ? `{SITE}${path === '/' ? '' : path}` : path;
};

export const normalizeText = (text) =>
  String(text ?? '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Replaces every occurrence of the given origins in a text body with `{SITE}`. */
export const normalizeOrigins = (text, origins) =>
  origins.reduce(
    (body, origin) => body.split(new URL(origin).origin).join('{SITE}'),
    text,
  );

export const normalizeSitemap = (xml, origins) =>
  normalizeOrigins(xml, origins)
    .replace(/<lastmod>[^<]*<\/lastmod>/g, '<lastmod>*</lastmod>')
    .replace(/>\s+</g, '><')
    .trim();
