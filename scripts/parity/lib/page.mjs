// Opening, settling and reading a page in a deterministic way.

import {
  ACCEPT_LANGUAGE,
  HIDE,
  IGNORED_FAILED_REQUESTS,
  MASKS,
  MAX_SCREENSHOT_HEIGHT,
  RANDOM_TEXT,
  TIMEZONE,
  VIEWPORTS,
} from '../config.mjs';

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const FREEZE_CSS = `
*, *::before, *::after {
  animation: none !important;
  transition: none !important;
  caret-color: transparent !important;
}
html { scroll-behavior: auto !important; }
`;

/**
 * Opens `path` in a fresh browser context with the language cookie, the
 * Accept-Language header, a fixed time zone and reduced motion.
 */
export const openPage = async (
  browser,
  {
    base,
    path,
    locale,
    viewport = 'desktop',
    cookie = true,
    acceptLanguage = ACCEPT_LANGUAGE[locale],
    reducedMotion = true,
    permissions = [],
    geolocation,
  },
) => {
  const context = await browser.createBrowserContext();
  const origin = new URL(base).origin;
  if (permissions.length > 0) {
    await context.overridePermissions(origin, permissions);
  }
  const page = await context.newPage();
  const runtime = trackRuntime(page, origin);
  // Pages run in parallel; keep each one "focused" so APIs such as the
  // clipboard behave as in a real foreground tab.
  const cdp = await page.createCDPSession();
  await cdp.send('Emulation.setFocusEmulationEnabled', { enabled: true });

  await page.setViewport(VIEWPORTS[viewport]);
  await page.emulateTimezone(TIMEZONE);
  await page.emulateMediaFeatures([
    {
      name: 'prefers-reduced-motion',
      value: reducedMotion ? 'reduce' : 'no-preference',
    },
    { name: 'prefers-color-scheme', value: 'light' },
  ]);
  if (acceptLanguage) {
    await page.setExtraHTTPHeaders({ 'Accept-Language': acceptLanguage });
  }
  if (geolocation) {
    await page.setGeolocation(geolocation);
  }
  if (cookie && locale) {
    await context.setCookie({
      name: 'NEXT_LOCALE',
      value: locale,
      domain: new URL(base).hostname,
      path: '/',
    });
  }

  const response = await page.goto(new URL(path, base).href, {
    waitUntil: 'load',
    timeout: 90_000,
  });
  // Hydration can end after `load` (async plugins and components); React
  // replays clicks made before it, Vue does not. Interact afterwards.
  await page
    .waitForNetworkIdle({ idleTime: 250, timeout: 5_000 })
    .catch(() => {});

  return { context, page, response, runtime };
};

const trackRuntime = (page, origin) => {
  const runtime = {
    consoleErrors: [],
    consoleWarnings: [],
    pageErrors: [],
    failedRequests: [],
  };
  page.on('console', (message) => {
    const source = message.location()?.url ?? '';
    // Analytics/insights scripts only exist on Vercel deployments.
    if (/\/_vercel\//.test(source) || /\/_vercel\//.test(message.text())) {
      return;
    }
    const text = message.text().slice(0, 500);
    if (message.type() === 'error') runtime.consoleErrors.push(text);
    if (message.type() === 'warn' || message.type() === 'warning') {
      runtime.consoleWarnings.push(text);
    }
  });
  page.on('pageerror', (error) =>
    runtime.pageErrors.push(String(error.message ?? error).slice(0, 500)),
  );
  const isIgnored = (url) =>
    IGNORED_FAILED_REQUESTS.some((pattern) => pattern.test(url));
  page.on('requestfailed', (request) => {
    const url = request.url();
    // Cancelled requests (e.g. prefetches interrupted by navigation) are noise.
    if (request.failure()?.errorText === 'net::ERR_ABORTED') return;
    if (url.startsWith(origin) && !isIgnored(url)) {
      runtime.failedRequests.push(
        `${request.failure()?.errorText ?? 'failed'} ${url.slice(origin.length)}`,
      );
    }
  });
  page.on('response', (response) => {
    const url = response.url();
    if (url.startsWith(origin) && response.status() >= 400 && !isIgnored(url)) {
      runtime.failedRequests.push(
        `${response.status()} ${url.slice(origin.length)}`,
      );
    }
  });
  return runtime;
};

/**
 * Freezes CSS animations, loads lazy content by scrolling through the page and
 * waits for images, fonts and JS-driven animations to settle.
 */
export const settlePage = async (page, { hide = [], randomText = [] } = {}) => {
  const hidden = hide.map((key) => HIDE[key]).filter(Boolean);
  await page.addStyleTag({
    content:
      FREEZE_CSS +
      (hidden.length > 0
        ? `${hidden.join(',')} { visibility: hidden !important; }`
        : ''),
  });
  // Load lazy images up front so screenshots never catch them half-loaded;
  // the original attribute is kept for the content comparison.
  await page.evaluate(() => {
    for (const image of document.querySelectorAll('img[loading="lazy"]')) {
      image.dataset.parityLoading = 'lazy';
      image.loading = 'eager';
    }
  });
  await page.evaluate(() => document.fonts?.ready);
  await page.evaluate(async (maxHeight) => {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
    const limit = Math.min(document.documentElement.scrollHeight, maxHeight);
    for (let y = 0; y < limit; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await wait(80);
    }
    window.scrollTo({ top: limit, behavior: 'instant' });
    await wait(150);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, MAX_SCREENSHOT_HEIGHT);
  await page.evaluate(async () => {
    const settled = (images) =>
      Promise.race([
        Promise.all(
          images.map(
            (image) =>
              new Promise((resolve) => {
                image.addEventListener('load', resolve, { once: true });
                image.addEventListener('error', resolve, { once: true });
              }),
          ),
        ),
        new Promise((resolve) => setTimeout(resolve, 10_000)),
      ]);
    await settled([...document.images].filter((image) => !image.complete));
    // Retry images that failed or hang once (local image optimizers fetch
    // remote images on every request, which fails now and then).
    const failed = [...document.images].filter(
      (image) =>
        (!image.complete || image.naturalWidth === 0) &&
        (image.getAttribute('src') || image.getAttribute('srcset')),
    );
    for (const image of failed) {
      for (const attribute of ['srcset', 'src']) {
        const value = image.getAttribute(attribute);
        if (value) image.setAttribute(attribute, value);
      }
    }
    await settled(failed);
  });
  await page
    .waitForNetworkIdle({ idleTime: 500, timeout: 10_000 })
    .catch(() => {});
  // Spring-based number tickers and carousels initialise after hydration.
  await sleep(2_000);
  // Replaced last: hydration would restore the original text.
  const replacements = randomText
    .map((key) => RANDOM_TEXT[key])
    .filter(Boolean);
  await page.evaluate((rules) => {
    for (const { selector, text } of rules) {
      for (const element of document.querySelectorAll(selector)) {
        element.textContent = text;
      }
    }
  }, replacements);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
};

/** Reads SEO-relevant tags from a document (raw SSR HTML or the live DOM). */
const extractHeadInPage = (html) => {
  const doc = html
    ? new DOMParser().parseFromString(html, 'text/html')
    : document;
  const meta = {};
  for (const element of doc.querySelectorAll('meta[name], meta[property]')) {
    const name = element.getAttribute('name');
    const key = name
      ? `meta[name=${name}]`
      : `meta[property=${element.getAttribute('property')}]`;
    (meta[key] ??= []).push(element.getAttribute('content') ?? '');
  }
  const links = {};
  for (const element of doc.querySelectorAll('link[rel]')) {
    const rel = element.getAttribute('rel');
    if (!/canonical|icon|alternate|manifest/.test(rel)) continue;
    const attrs = ['sizes', 'type', 'hreflang']
      .map((attr) =>
        element.getAttribute(attr)
          ? `${attr}=${element.getAttribute(attr)}`
          : null,
      )
      .filter(Boolean);
    (links[`link[rel=${rel}]`] ??= []).push(
      [element.getAttribute('href'), ...attrs].join(' '),
    );
  }
  const jsonld = [
    ...doc.querySelectorAll('script[type="application/ld+json"]'),
  ].map((script) => {
    try {
      return JSON.parse(script.textContent);
    } catch {
      return script.textContent;
    }
  });
  return {
    lang: doc.documentElement.getAttribute('lang'),
    title: doc.querySelector('title')?.textContent ?? null,
    meta,
    links,
    jsonld,
  };
};

export const extractHead = (page, html) =>
  page.evaluate(extractHeadInPage, html ?? null);

/** Reads the rendered content: headings, links, images, text, nav/footer. */
export const extractContent = (page) =>
  page.evaluate(() => {
    const clean = (text) =>
      String(text ?? '')
        .replace(/\u00a0/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    const label = (element) =>
      clean(
        element.innerText ||
          element.getAttribute('aria-label') ||
          [...element.querySelectorAll('img[alt]')]
            .map((image) => image.alt)
            .join(' ') ||
          element.querySelector('.sr-only')?.textContent,
      );
    const links = (root) =>
      [...root.querySelectorAll('a[href]')].map((anchor) => ({
        href: anchor.getAttribute('href'),
        target: anchor.getAttribute('target'),
        text: label(anchor),
      }));
    const banner = document.querySelector('header[role="banner"]');
    const footer = document.querySelector('body footer:last-of-type');

    return {
      headings: [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map(
        (heading) =>
          `${heading.tagName.toLowerCase()} ${clean(heading.textContent)}`,
      ),
      links: links(document.body),
      navLinks: banner ? links(banner) : [],
      footerLinks: footer ? links(footer) : [],
      images: [...document.querySelectorAll('img')].map((image) => ({
        src: image.getAttribute('src'),
        alt: image.getAttribute('alt'),
        width: image.getAttribute('width'),
        height: image.getAttribute('height'),
        loading: image.dataset.parityLoading ?? image.getAttribute('loading'),
      })),
      buttons: [...document.querySelectorAll('button')].map((button) =>
        label(button),
      ),
      iframes: [...document.querySelectorAll('iframe')].map((frame) =>
        frame.getAttribute('src'),
      ),
      // Icon slots: every top-level <svg> with its utility classes (icon
      // library classes such as `lucide-*`/`iconify` removed), so a missing
      // or extra icon shows up regardless of which library drew it.
      icons: [...document.querySelectorAll('body svg')]
        .filter((svg) => !svg.parentElement?.closest('svg'))
        .map((svg) =>
          [
            'svg',
            ...[...svg.classList]
              .filter((name) => !/^(lucide|iconify)/.test(name))
              .sort(),
          ].join('.'),
        ),
      details: document.querySelectorAll('details').length,
      text: document.body.innerText.split('\n').map(clean).filter(Boolean),
      lang: document.documentElement.getAttribute('lang'),
      title: document.title,
      overflowX:
        document.documentElement.scrollWidth > window.innerWidth + 1
          ? document.documentElement.scrollWidth
          : 0,
    };
  });

/**
 * Measures the page for screenshots: total height, top-level blocks
 * (outermost header/section/footer elements, keyed by a stable signature)
 * and the rectangles of the configured masks.
 */
export const measurePage = (page, maskKeys = []) =>
  page.evaluate(
    (masks) => {
      const clean = (text) =>
        String(text ?? '')
          .replace(/\s+/g, ' ')
          .trim();
      const rect = (element) => {
        const box = element.getBoundingClientRect();
        return {
          x: Math.round(box.left + window.scrollX),
          y: Math.round(box.top + window.scrollY),
          width: Math.round(box.width),
          height: Math.round(box.height),
        };
      };
      const candidates = [
        ...document.querySelectorAll('header, section, footer'),
      ];
      const outermost = candidates.filter(
        (element) =>
          !candidates.some(
            (other) => other !== element && other.contains(element),
          ),
      );
      const counts = {};
      const blocks = outermost
        .map((element) => {
          const heading = element.querySelector('h1, h2, h3');
          const signature = [
            element.tagName.toLowerCase(),
            element.id ? `#${element.id}` : '',
            element.getAttribute('role')
              ? `[role=${element.getAttribute('role')}]`
              : '',
            heading ? ` "${clean(heading.textContent).slice(0, 40)}"` : '',
          ].join('');
          counts[signature] = (counts[signature] ?? 0) + 1;
          return {
            key:
              counts[signature] > 1
                ? `${signature} (${counts[signature]})`
                : signature,
            ...rect(element),
          };
        })
        .filter((block) => block.width > 0 && block.height > 0);
      const maskRects = masks.map(({ key, category, selector }) => ({
        key,
        category,
        rects: [...document.querySelectorAll(selector)]
          .map(rect)
          .filter((box) => box.width > 0 && box.height > 0),
      }));
      return {
        height: Math.ceil(document.documentElement.scrollHeight),
        width: window.innerWidth,
        blocks,
        masks: maskRects,
      };
    },
    maskKeys
      .map((key) => (MASKS[key] ? { key, ...MASKS[key] } : null))
      .filter(Boolean),
  );

export const screenshotPage = async (page, path, { width, height }) => {
  const clipHeight = Math.min(height, MAX_SCREENSHOT_HEIGHT);
  await page.screenshot({
    path,
    clip: { x: 0, y: 0, width, height: clipHeight },
    captureBeyondViewport: true,
  });
  return { width, height: clipHeight, truncated: height > clipHeight };
};
