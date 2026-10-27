// Functional scenarios run by functional.mjs against any base URL. Each
// scenario must pass on the Next.js site and on the Nuxt port alike, so they
// only rely on behaviour, texts from messages/*.json and the stable parts of
// the markup (landmarks, aria attributes, classes copied verbatim).

import { readFileSync } from 'node:fs';
import { request } from './lib/http.mjs';
import { openPage, sleep } from './lib/page.mjs';

const messages = {
  en: JSON.parse(readFileSync('messages/en.json', 'utf8')),
  pl: JSON.parse(readFileSync('messages/pl.json', 'utf8')),
};

export const t = (locale, key) => {
  const value = key
    .split('.')
    .reduce((node, part) => node?.[part], messages[locale]);
  if (typeof value !== 'string') throw new Error(`Missing message ${key}`);
  return value;
};

const KRAKOW = { latitude: 50.0647, longitude: 19.945 };

// ------------------------------------------------------------- helpers

export const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const waitFor = async (check, { timeout = 15_000, message } = {}) => {
  const end = Date.now() + timeout;
  let lastError;
  while (Date.now() < end) {
    try {
      const value = await check();
      if (value) return value;
    } catch (error) {
      lastError = error; // e.g. execution context destroyed during a reload
    }
    await sleep(200);
  }
  throw new Error(
    message ?? `Timed out${lastError ? ` (${lastError.message})` : ''}`,
  );
};

const textOf = (handle) =>
  handle.evaluate((element) =>
    `${element.innerText || element.textContent || ''}`
      .replace(/\s+/g, ' ')
      .trim(),
  );

/** First visible element matching `selector` whose text contains `text`. */
const findByText = async (page, selector, text) => {
  for (const handle of await page.$$(selector)) {
    if (!(await handle.isVisible().catch(() => false))) continue;
    const content = await textOf(handle);
    const raw = await handle.evaluate((element) => element.textContent ?? '');
    if (content.includes(text) || raw.includes(text)) return handle;
  }
  return null;
};

const clickByText = async (page, selector, text) => {
  const handle = await waitFor(() => findByText(page, selector, text), {
    message: `No visible "${selector}" containing "${text}"`,
  });
  await handle.click();
  return handle;
};

const pathname = (page) => page.evaluate(() => window.location.pathname);
const lang = (page) =>
  page.evaluate(() => document.documentElement.getAttribute('lang'));

const waitForPath = (page, path) =>
  waitFor(async () => (await pathname(page)) === path, {
    message: `Expected to navigate to ${path}`,
  });

const waitForLang = (page, expected) =>
  waitFor(async () => (await lang(page)) === expected, {
    message: `Expected <html lang="${expected}">`,
  });

const bodyText = (page) => page.evaluate(() => document.body.innerText);

const withPage = async (browser, base, options, fn) => {
  const opened = await openPage(browser, { base, locale: 'en', ...options });
  try {
    return await fn(opened);
  } finally {
    await opened.context.close();
  }
};

// The system clipboard is shared by all browser contexts: serialize its users.
let clipboardQueue = Promise.resolve();
const withClipboard = (fn) => {
  const run = clipboardQueue.then(fn, fn);
  clipboardQueue = run.catch(() => {});
  return run;
};

const openMobileMenu = (page) =>
  clickByText(page, 'header[role="banner"] button', 'Open main menu');

// ----------------------------------------------------------- scenarios

export const SCENARIOS = [
  {
    id: 'lang-default-en',
    title: 'No cookie + English browser → English',
    run: (browser, base) =>
      withPage(
        browser,
        base,
        { path: '/', cookie: false, acceptLanguage: 'en-US,en;q=0.9' },
        async ({ page }) => {
          assert((await lang(page)) === 'en', 'html lang is not "en"');
          assert(
            await findByText(
              page,
              'nav[aria-label="Primary navigation"] a',
              t('en', 'navigation.menu_items.speakers'),
            ),
            'English navigation not rendered',
          );
        },
      ),
  },
  {
    id: 'lang-accept-language-pl',
    title: 'No cookie + Polish browser → Polish',
    run: (browser, base) =>
      withPage(
        browser,
        base,
        {
          path: '/',
          cookie: false,
          acceptLanguage: 'pl-PL,pl;q=0.9,en;q=0.8',
        },
        async ({ page }) => {
          assert((await lang(page)) === 'pl', 'html lang is not "pl"');
          assert(
            (await bodyText(page)).includes(t('pl', 'featured_events.title')),
            'Polish content not rendered',
          );
        },
      ),
  },
  {
    id: 'lang-unsupported-header',
    title: 'No cookie + unsupported browser language → English',
    run: (browser, base) =>
      withPage(
        browser,
        base,
        { path: '/', cookie: false, acceptLanguage: 'de-DE,de;q=0.9' },
        async ({ page }) => {
          assert((await lang(page)) === 'en', 'html lang is not "en"');
        },
      ),
  },
  {
    id: 'lang-cookie-wins',
    title: 'NEXT_LOCALE cookie wins over Accept-Language',
    run: (browser, base) =>
      withPage(
        browser,
        base,
        { path: '/about', locale: 'pl', acceptLanguage: 'en-US,en;q=0.9' },
        async ({ page }) => {
          assert((await lang(page)) === 'pl', 'cookie "pl" ignored');
          assert(
            (await bodyText(page)).includes(t('pl', 'about.page_title')),
            'Polish about page not rendered',
          );
        },
      ),
  },
  {
    id: 'lang-switch-desktop',
    title: 'Desktop language switcher sets the cookie and translates',
    run: (browser, base) =>
      withPage(browser, base, { path: '/about' }, async ({ page, context }) => {
        await clickByText(page, 'header[role="banner"] aside button', 'EN');
        await clickByText(page, '[role="menuitem"]', 'Polski');
        await waitForLang(page, 'pl');
        await waitFor(
          async () =>
            (await bodyText(page)).includes(t('pl', 'about.page_title')),
          { message: 'Content not translated after switch' },
        );
        const cookie = (await context.cookies()).find(
          (item) => item.name === 'NEXT_LOCALE',
        );
        assert(cookie?.value === 'pl', 'NEXT_LOCALE cookie not set to pl');
        await page.reload({ waitUntil: 'load' });
        assert((await lang(page)) === 'pl', 'Language lost after reload');
        return `cookie expires ${cookie.expires > 0 ? new Date(cookie.expires * 1000).toISOString() : 'session'}`;
      }),
  },
  {
    id: 'lang-switch-mobile',
    title: 'Mobile language switcher',
    run: (browser, base) =>
      withPage(
        browser,
        base,
        { path: '/', viewport: 'mobile' },
        async ({ page }) => {
          await openMobileMenu(page);
          await clickByText(
            page,
            'nav[aria-label="Mobile navigation menu"] button',
            'Polski',
          );
          await waitForLang(page, 'pl');
        },
      ),
  },
  {
    id: 'nav-cities-dropdown',
    title: 'Desktop cities dropdown navigates to a city page',
    run: (browser, base) =>
      withPage(browser, base, { path: '/about' }, async ({ page }) => {
        await clickByText(
          page,
          'nav[aria-label="Primary navigation"] button',
          t('en', 'navigation.menu_items.cities'),
        );
        const items = await waitFor(async () => {
          const found = await page.$$('[role="menuitem"]');
          return found.length >= 13 ? found : null;
        });
        await clickByText(page, '[role="menuitem"]', 'Kraków');
        await waitForPath(page, '/krakow');
        await waitFor(
          async () =>
            (await page.$eval('h1', (h1) => h1.textContent.trim())) ===
            'Kraków',
          { message: 'Kraków heading missing' },
        );
        return `${items.length} menu items`;
      }),
  },
  {
    id: 'nav-discounts-dropdown',
    title: 'Desktop discounts dropdown links to a section',
    run: (browser, base) =>
      withPage(browser, base, { path: '/' }, async ({ page }) => {
        await clickByText(
          page,
          'nav[aria-label="Primary navigation"] button',
          t('en', 'navigation.menu_items.discounts'),
        );
        await clickByText(
          page,
          '[role="menuitem"]',
          t('en', 'navigation.dropdown.software_discounts'),
        );
        await waitFor(
          async () =>
            (await page.evaluate(
              () => window.location.pathname + window.location.hash,
            )) === '/discounts#software',
          { message: 'Did not navigate to /discounts#software' },
        );
      }),
  },
  {
    id: 'nav-client-side',
    title: 'Primary navigation links navigate without a full reload',
    run: (browser, base) =>
      withPage(browser, base, { path: '/about' }, async ({ page }) => {
        await page.evaluate(() => {
          window.__parityMarker = 'kept';
        });
        await clickByText(
          page,
          'nav[aria-label="Primary navigation"] a',
          t('en', 'navigation.menu_items.speakers'),
        );
        await waitForPath(page, '/speakers');
        assert(
          (await page.evaluate(() => window.__parityMarker)) === 'kept',
          'Full page reload instead of client-side navigation',
        );
      }),
  },
  {
    id: 'nav-mobile-menu',
    title: 'Mobile menu opens and navigates',
    run: (browser, base) =>
      withPage(
        browser,
        base,
        { path: '/about', viewport: 'mobile' },
        async ({ page }) => {
          await openMobileMenu(page);
          await clickByText(
            page,
            'nav[aria-label="Mobile navigation menu"] a',
            t('en', 'navigation.menu_items.speakers'),
          );
          await waitForPath(page, '/speakers');
        },
      ),
  },
  {
    id: 'nav-mobile-cities',
    title: 'Mobile cities disclosure lists cities',
    run: (browser, base) =>
      withPage(
        browser,
        base,
        { path: '/about', viewport: 'mobile' },
        async ({ page }) => {
          await openMobileMenu(page);
          await clickByText(
            page,
            'nav[aria-label="Mobile navigation menu"] button',
            t('en', 'navigation.menu_items.cities'),
          );
          await clickByText(
            page,
            'nav[aria-label="Mobile navigation menu"] a',
            'Wrocław',
          );
          await waitForPath(page, '/wroclaw');
        },
      ),
  },
  {
    id: 'logo-context-menu',
    title: 'Right-click on the logo offers brand assets',
    run: (browser, base) =>
      withPage(browser, base, { path: '/' }, async ({ page }) => {
        const logo = await page.$(
          'header[role="banner"] img[alt="meet.js Logo"]',
        );
        assert(logo, 'Logo not found');
        await logo.click({ button: 'right' });
        await clickByText(
          page,
          'a[href="/brand"]',
          t('en', 'logo_component.go_to_brand_assets'),
        );
        await waitForPath(page, '/brand');
      }),
  },
  {
    id: 'events-filter-city',
    title: '/events city filter shows only that city',
    run: (browser, base) =>
      withPage(browser, base, { path: '/events' }, async ({ page }) => {
        const badges = await page.$$eval(
          'main section:nth-of-type(2) a[href*="city="]',
          (links) =>
            links.map((link) => ({
              href: link.getAttribute('href'),
              text: link.textContent.replace(/\s+/g, ' ').trim(),
            })),
        );
        const target = badges.find(
          (badge) =>
            !/summit|On-line/i.test(badge.href) &&
            Number(badge.text.match(/\((\d+)\)$/)?.[1] ?? 0) > 0,
        );
        if (!target) return 'skipped: no city with upcoming events';
        const city = target.text.replace(/\s*\(\d+\)$/, '');
        const expected = Number(target.text.match(/\((\d+)\)$/)[1]);
        await clickByText(page, 'main section:nth-of-type(2) a', target.text);
        await waitFor(
          async () => new URL(page.url()).searchParams.get('city') === city,
          { message: `URL has no ?city=${city}` },
        );
        const count = await waitFor(
          async () => {
            const cards = await page.$$eval(
              'main section:nth-of-type(2) [data-testid="event-card-wrapper"]',
              (items) => items.length,
            );
            return cards === expected ? cards : null;
          },
          { message: `Expected ${expected} ${city} events` },
        );
        return `${city}: ${count} events`;
      }),
  },
  {
    id: 'events-filter-summit',
    title: '/events?city=summit shows conferences only',
    run: (browser, base) =>
      withPage(
        browser,
        base,
        { path: '/events?city=summit' },
        async ({ page }) => {
          const cards = await page.$$eval(
            'main section:nth-of-type(2) [data-testid="event-card-wrapper"]',
            (items) => items.map((item) => item.innerText),
          );
          const label = t('en', 'event_card.conference');
          assert(
            cards.every((text) => text.includes(label)),
            'Non-conference event in summit filter',
          );
          return `${cards.length} conferences`;
        },
      ),
  },
  {
    id: 'not-found',
    title: 'Unknown pages return 404 with the error page',
    run: async (browser, base) => {
      for (const path of [
        '/passport/__parity-missing__',
        '/__parity-missing__',
      ]) {
        const response = await request(base, path, { locale: 'en' });
        assert(response.status === 404, `${path} returned ${response.status}`);
      }
      return withPage(
        browser,
        base,
        { path: '/passport/__parity-missing__' },
        async ({ page, response }) => {
          assert(response.status() === 404, 'status is not 404');
          assert(
            (await bodyText(page)).includes('Module not found'),
            '404 copy missing',
          );
          assert(
            await page.$('header[role="banner"]'),
            '404 page without navigation',
          );
        },
      );
    },
  },
  {
    id: 'redirects',
    title: 'Short URLs redirect with 308',
    run: async (browser, base) => {
      for (const [path, location] of [
        ['/promos', '/discounts'],
        ['/discord', 'https://discord.gg/8r9XKTeNW8'],
        ['/youtube', 'https://www.youtube.com/@meetjs'],
      ]) {
        const response = await request(base, path);
        assert(response.status === 308, `${path} returned ${response.status}`);
        const target = response.headers.get('location');
        assert(
          target === location || target === new URL(location, base).href,
          `${path} → ${target}`,
        );
      }
    },
  },
  {
    id: 'discount-copy',
    title: '/discounts copies a discount code',
    run: (browser, base) =>
      withClipboard(() =>
        withPage(
          browser,
          base,
          {
            path: '/discounts',
            permissions: ['clipboard-read', 'clipboard-sanitized-write'],
          },
          async ({ page }) => {
            const button = await page.$(
              'button[aria-label^="Copy discount code"]',
            );
            if (!button) return 'skipped: no active discount code';
            const code = (
              await button.evaluate((element) =>
                element.getAttribute('aria-label'),
              )
            ).replace('Copy discount code ', '');
            await button.click();
            await waitFor(
              async () => (await textOf(button)).includes('Copied!'),
              {
                message: '"Copied!" not shown',
              },
            );
            const clipboard = await page.evaluate(() =>
              navigator.clipboard.readText(),
            );
            assert(clipboard === code, `Clipboard has "${clipboard}"`);
            return code;
          },
        ),
      ),
  },
  {
    id: 'wdi-click-to-copy',
    title: '/wdi click-to-copy',
    run: (browser, base) =>
      withClipboard(() =>
        withPage(
          browser,
          base,
          {
            path: '/wdi',
            permissions: ['clipboard-read', 'clipboard-sanitized-write'],
          },
          async ({ page }) => {
            const box = await page.$('[title="Click to copy"]');
            assert(box, 'Click-to-copy box missing');
            await box.click();
            await waitFor(async () => (await textOf(box)).includes('Copied!'), {
              message: '"Copied!" not shown',
            });
            const clipboard = await page.evaluate(() =>
              navigator.clipboard.readText(),
            );
            assert(clipboard === 'WID26RP20', `Clipboard has "${clipboard}"`);
          },
        ),
      ),
  },
  {
    id: 'faq-accordion',
    title: 'City FAQ opens one answer at a time',
    run: (browser, base) =>
      withPage(browser, base, { path: '/warszawa' }, async ({ page }) => {
        const summaries = await page.$$('details[name="faq"] > summary');
        assert(summaries.length >= 2, 'FAQ items missing');
        await summaries[0].click();
        await summaries[1].click();
        const open = await page.$$eval(
          'details[name="faq"][open]',
          (items) => items.length,
        );
        assert(open === 1, `${open} FAQ items open`);
        return `${summaries.length} questions`;
      }),
  },
  {
    id: 'nearest-city',
    title: 'Nearest city from geolocation',
    run: (browser, base) =>
      withPage(
        browser,
        base,
        { path: '/', permissions: ['geolocation'], geolocation: KRAKOW },
        async ({ page }) => {
          const expected = t('en', 'join_us.you_are_in');
          const located = async () =>
            (await bodyText(page)).includes(expected) &&
            (
              await page.$eval('#joinus', (element) => element.innerText)
            ).includes('Kraków');
          if (!(await located())) {
            // Chrome renders the native <geolocation> control; other browsers
            // render the fallback <button> inside it.
            const supported = await page.evaluate(
              () => 'HTMLGeolocationElement' in window,
            );
            const control = await page.$(
              supported ? '#joinus geolocation' : '#joinus geolocation button',
            );
            await control?.click();
          }
          await waitFor(located, { message: 'Nearest city not shown' });
        },
      ),
  },
  {
    id: 'events-carousel',
    title: 'Homepage events carousel or empty state',
    run: (browser, base) =>
      withPage(browser, base, { path: '/' }, async ({ page }) => {
        const slides = await page.$$eval(
          '#events [aria-roledescription="slide"]',
          (items) => items.length,
        );
        if (slides === 0) {
          assert(
            (await bodyText(page)).includes(
              t('en', 'empty_events_alert.message'),
            ),
            'Neither events nor empty state',
          );
          return 'empty state';
        }
        return `${slides} slides`;
      }),
  },
  {
    id: 'partners-autoplay',
    title: 'Partners carousel autoplays',
    run: (browser, base) =>
      withPage(
        browser,
        base,
        { path: '/', reducedMotion: false },
        async ({ page }) => {
          const selector =
            'section.bg-purple.p-12 [aria-roledescription="carousel"] .flex';
          await page.$eval('section.bg-purple.p-12', (element) =>
            element.scrollIntoView(),
          );
          const read = () =>
            page.$eval(
              selector,
              (element) => getComputedStyle(element).transform,
            );
          const before = await read();
          await waitFor(async () => (await read()) !== before, {
            timeout: 8_000,
            message: 'Carousel did not move',
          });
        },
      ),
  },
  {
    id: 'promo-ticker',
    title: 'Promo ticker lists active promos twice (marquee)',
    run: (browser, base) =>
      withPage(browser, base, { path: '/' }, async ({ page }) => {
        const label = t('en', 'promo_ticker.label');
        const lists = await page.$$eval(
          `section[aria-label="${label}"] ul`,
          (items) => items.map((list) => list.querySelectorAll('li').length),
        );
        assert(lists.length === 2, `${lists.length} promo lists`);
        assert(lists[0] > 0 && lists[0] === lists[1], 'Promo lists differ');
        return `${lists[0]} promos`;
      }),
  },
  {
    id: 'discord-widget',
    title: 'Discord widget renders an invite',
    run: (browser, base) =>
      withPage(browser, base, { path: '/' }, async ({ page }) => {
        const href = await page
          .$eval('#joinus a[href*="discord"]', (link) => link.href)
          .catch(() => null);
        assert(href, 'Discord invite link missing');
        return href;
      }),
  },
  {
    id: 'community-view-all',
    title: 'Homepage community section links to /community',
    run: (browser, base) =>
      withPage(browser, base, { path: '/' }, async ({ page }) => {
        await clickByText(page, 'a[href="/community"]', 'View all');
        await waitForPath(page, '/community');
      }),
  },
  {
    id: 'passport-progress',
    title: 'Passport hall of fame links to participant progress',
    run: (browser, base) =>
      withPage(browser, base, { path: '/passport' }, async ({ page }) => {
        const link = await page.$('main a[href^="/passport/"]');
        assert(link, 'No participant links');
        const href = await link.evaluate((element) =>
          element.getAttribute('href'),
        );
        await link.click();
        await waitForPath(page, href);
        await waitFor(() => page.$('h1'), { message: 'No heading' });
        return href;
      }),
  },
  {
    id: 'timeline-filter',
    title: '/30-years-of-javascript timeline filter',
    run: (browser, base) =>
      withPage(
        browser,
        base,
        { path: '/30-years-of-javascript' },
        async ({ page }) => {
          await clickByText(page, '[role="tab"]', 'Early Years');
          const count = await waitFor(
            async () => {
              const items = await page.$$eval(
                '#timeline-events [role="article"]',
                (elements) => elements.length,
              );
              return items === 5 ? items : null;
            },
            { message: 'Early years filter did not show 5 events' },
          );
          return `${count} events`;
        },
      ),
  },
  {
    id: 'skip-navigation',
    title: '/30-years-of-javascript quick navigation scrolls',
    run: (browser, base) =>
      withPage(
        browser,
        base,
        { path: '/30-years-of-javascript' },
        async ({ page }) => {
          await clickByText(page, 'button', 'Performance');
          await waitFor(
            () =>
              page.$eval('#performance', (element) => {
                const box = element.getBoundingClientRect();
                return box.top < window.innerHeight && box.bottom > 0;
              }),
            { message: '#performance not scrolled into view' },
          );
        },
      ),
  },
  {
    id: 'prediction-reroll',
    title: '/2025-review prediction changes',
    run: (browser, base) =>
      withPage(browser, base, { path: '/2025-review' }, async ({ page }) => {
        const read = () =>
          page.$eval('p.italic.text-white', (p) => p.textContent);
        const before = await read();
        for (let i = 0; i < 20; i++) {
          await clickByText(page, 'button', 'Get Another Prediction');
          if ((await read()) !== before) return 'changed';
        }
        throw new Error('Prediction never changed');
      }),
  },
  {
    id: 'brand-legacy-logos',
    title: '/brand legacy logos disclosure',
    run: (browser, base) =>
      withPage(browser, base, { path: '/brand' }, async ({ page }) => {
        await clickByText(
          page,
          'summary',
          t('en', 'brand.legacy_logos_obsolete'),
        );
        const visible = await waitFor(
          async () => {
            const images = await page.$$('details[open] img');
            return images.length >= 4 ? images.length : null;
          },
          { message: 'Legacy logos not visible' },
        );
        const downloads = await page.$$eval(
          'a[download]',
          (links) => links.length,
        );
        assert(downloads >= 20, `${downloads} download links`);
        return `${visible} logos, ${downloads} downloads`;
      }),
  },
  {
    id: 'birthday-confetti',
    title: '/14-birthday confetti',
    run: (browser, base) =>
      withPage(
        browser,
        base,
        { path: '/14-birthday', reducedMotion: false },
        async ({ page }) => {
          await waitFor(() => page.$('canvas'), {
            message: 'No confetti canvas',
          });
        },
      ),
  },
];
