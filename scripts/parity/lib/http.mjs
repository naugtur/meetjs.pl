// HTTP-level checks (no browser): status codes, redirects, content types and
// the content of static files and endpoints.

import { createHash } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ACCEPT_LANGUAGE } from '../config.mjs';
import {
  normalizeOrigins,
  normalizeSitemap,
  normalizeUrl,
} from './normalize.mjs';

const contentTypeOf = (response) =>
  (response.headers.get('content-type') ?? '').split(';')[0].trim() || null;

export const request = async (base, path, { locale, method = 'GET' } = {}) => {
  const headers = { 'user-agent': 'meetjs-parity/1.0' };
  if (locale) {
    headers.cookie = `NEXT_LOCALE=${locale}`;
    headers['accept-language'] = ACCEPT_LANGUAGE[locale];
  }
  const response = await fetch(new URL(path, base), {
    method,
    headers,
    redirect: 'manual',
    signal: AbortSignal.timeout(60_000),
  });
  return response;
};

/** Status, content type and redirect target for a page route. */
export const checkRoute = async (base, path, options) => {
  try {
    const response = await request(base, path, options);
    await response.arrayBuffer();
    const location = response.headers.get('location');
    return {
      status: response.status,
      contentType: contentTypeOf(response),
      location: location ? normalizeUrl(location, { base }) : null,
    };
  } catch (error) {
    return { status: 0, error: String(error.message ?? error) };
  }
};

/** Fetches a static file/endpoint and returns a comparable fingerprint. */
export const checkFile = async (base, { path, compare }, { origins, dir }) => {
  try {
    const response = await request(base, path);
    const buffer = Buffer.from(await response.arrayBuffer());
    const result = {
      status: response.status,
      contentType: contentTypeOf(response),
      bytes: buffer.length,
    };
    if (response.status !== 200) return result;
    if (compare === 'text') {
      result.body = normalizeOrigins(buffer.toString('utf8'), origins).trim();
    } else if (compare === 'sitemap') {
      result.body = normalizeSitemap(buffer.toString('utf8'), origins);
    } else if (compare === 'hash') {
      result.sha256 = createHash('sha256').update(buffer).digest('hex');
    } else if (compare === 'image' && dir) {
      result.sha256 = createHash('sha256').update(buffer).digest('hex');
      if (result.contentType === 'image/png') {
        result.file = `files/${result.sha256.slice(0, 16)}.png`;
        await writeFile(join(dir, result.file), buffer);
        result.size = pngSize(buffer);
      }
    }
    return result;
  } catch (error) {
    return { status: 0, error: String(error.message ?? error) };
  }
};

const pngSize = (buffer) =>
  buffer.length > 24 && buffer.toString('ascii', 1, 4) === 'PNG'
    ? { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
    : null;
