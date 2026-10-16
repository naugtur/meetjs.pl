// Intentional differences between the Next.js site and the Nuxt port.
// compare.mjs reports a difference matching one of these rules as "expected"
// instead of "unexpected". Every rule needs a reason (see plan.md §12).
//
// A difference record looks like:
//   { route, locale, area, key, op, baseline, candidate, value }
// where `op` is "changed" (baseline → candidate), "added" (only in the
// candidate) or "removed" (only in the baseline), and `value` is set for
// added/removed list items.

const routeIs =
  (...paths) =>
  (diff) =>
    paths.includes(diff.route);

const metaChanged = (key, from, to) => (diff) =>
  diff.key === key &&
  diff.op === 'changed' &&
  matches(diff.baseline, from) &&
  matches(diff.candidate, to);

const listItem = (key, op, value) => (diff) =>
  diff.key === key && diff.op === op && matches(diff.value, value);

const matches = (actual, expected) =>
  expected instanceof RegExp
    ? expected.test(String(actual ?? ''))
    : actual === expected;

const all =
  (...tests) =>
  (diff) =>
    tests.every((test) => test(diff));

const any =
  (...tests) =>
  (diff) =>
    tests.some((test) => test(diff));

export const KNOWN_DIFFERENCES = [
  {
    id: 'warszawa-canonical',
    reason:
      'Next.js page points canonical and og:url to /warsaw (404); Nuxt uses /warszawa',
    test: all(
      routeIs('/warszawa'),
      any(
        metaChanged('link[rel=canonical]', '{SITE}/warsaw', '{SITE}/warszawa'),
        metaChanged(
          'meta[property=og:url]',
          '{SITE}/warsaw',
          '{SITE}/warszawa',
        ),
      ),
    ),
  },
  {
    id: 'city-og-url',
    reason:
      'Next.js city pages point og:url to /city/<slug> (404); Nuxt uses /<slug>',
    test: (diff) =>
      ['/bialystok', '/bielsko-biala', '/poznan', '/wroclaw'].includes(
        diff.route,
      ) &&
      metaChanged(
        'meta[property=og:url]',
        `{SITE}/city${diff.route}`,
        `{SITE}${diff.route}`,
      )(diff),
  },
  {
    id: 'jsnation-wroclaw-link',
    reason: 'Link to /city/wroclaw (404) now points to /wroclaw',
    test: all(
      routeIs('/jsnation-award'),
      any(
        listItem('content.links', 'removed', /^\/city\/wroclaw /),
        listItem('content.links', 'added', /^\/wroclaw /),
      ),
    ),
  },
  {
    id: 'discounts-og-image-url',
    reason:
      'Next.js file-convention OG image URL (/discounts/opengraph-image-<hash>) is now /discounts/opengraph-image.png, rendered per request',
    test: all(
      routeIs('/discounts'),
      (diff) =>
        /^meta\[(property=og|name=twitter):image(:\w+)?\]$/.test(diff.key) &&
        (/opengraph-image/.test(String(diff.baseline ?? diff.value ?? '')) ||
          /opengraph-image/.test(String(diff.candidate ?? diff.value ?? ''))),
    ),
  },
  {
    id: 'next-favicon-convention',
    reason:
      'Next.js adds a hashed <link rel=icon> for src/app/favicon.ico; Nuxt serves public/favicon.ico',
    test: listItem('link[rel=icon]', 'removed', /favicon\.ico\?favicon\./),
  },
  {
    id: 'favicon-content-type',
    reason:
      '`next start` serves favicon.ico as image/x-icon; Vercel (production) and Nitro use image/vnd.microsoft.icon',
    test: all(
      routeIs('/favicon.ico'),
      metaChanged(
        'http.contentType',
        'image/x-icon',
        'image/vnd.microsoft.icon',
      ),
    ),
  },
  {
    id: 'discord-online-count',
    reason:
      'Live Discord widget data (not served by the fixtures): the online count changes between captures',
    test: all(
      routeIs('/'),
      any(
        listItem('content.text', 'removed', /^\d+ online$/),
        listItem('content.text', 'added', /^\d+ online$/),
      ),
    ),
  },
  {
    id: 'mocked-crossweb-dev-only',
    reason: '/api/mocked/crossweb is development-only in Nuxt',
    test: all(
      routeIs('/api/mocked/crossweb'),
      metaChanged('http.status', 200, 404),
    ),
  },
];

export const findKnownDifference = (diff) =>
  KNOWN_DIFFERENCES.find((rule) => rule.test(diff)) ?? null;
