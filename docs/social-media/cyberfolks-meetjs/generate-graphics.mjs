/**
 * cyber_Folks × meet.js — promo graphics generator.
 *
 * Uses @vercel/og (satori) bundled with Next.js: proper flexbox layout
 * + the site's brand font (Montserrat), matching the /discounts OG style.
 *
 * Run: node docs/social-media/cyberfolks-meetjs/generate-graphics.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const { ImageResponse } =
  await import('next/dist/compiled/@vercel/og/index.node.js');

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../../..');
const outDir = join(__dirname, 'graphics');
const fontsDir = join(__dirname, '.fonts');
mkdirSync(outDir, { recursive: true });
mkdirSync(fontsDir, { recursive: true });

/* ---------------------------------- brand ---------------------------------- */
const PURPLE = '#2b1932';
const CARD = '#241329';
const GREEN = '#bcd25f';
const BLUE = '#239eab';
const BG_IMAGE =
  'radial-gradient(circle at 85% 15%, rgba(35,158,171,0.4), transparent 50%), ' +
  'radial-gradient(circle at 5% 95%, rgba(188,210,95,0.3), transparent 45%)';

/* ---------------------------------- assets --------------------------------- */
const logoSvg = readFileSync(join(root, 'public/logo.svg'), 'utf8');
const meetjsLogo = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;
const cyberLogo = `data:image/png;base64,${readFileSync(
  join(root, 'public/discounts/cyber_folks_cf_large.png'),
).toString('base64')}`;

/* ---------------------------------- fonts ---------------------------------- */
async function fetchFont(family, weight, file) {
  const cached = join(fontsDir, file);
  if (existsSync(cached)) return readFileSync(cached);
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`,
    )
  ).text();
  const url = css.match(
    /src: url\((.+?)\) format\('(?:truetype|opentype)'\)/,
  )?.[1];
  if (!url) throw new Error(`No TTF url for ${family} ${weight}`);
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  writeFileSync(cached, buf);
  return buf;
}

const fonts = [
  {
    name: 'Montserrat',
    data: await fetchFont('Montserrat', 500, 'montserrat-500.ttf'),
    weight: 500,
    style: 'normal',
  },
  {
    name: 'Montserrat',
    data: await fetchFont('Montserrat', 800, 'montserrat-800.ttf'),
    weight: 800,
    style: 'normal',
  },
  {
    name: 'JetBrains Mono',
    data: await fetchFont('JetBrains+Mono', 700, 'jetbrains-mono-700.ttf'),
    weight: 700,
    style: 'normal',
  },
];

/* --------------------------------- helpers --------------------------------- */
/** Build a satori element (plain object tree — no JSX needed). */
const h = (type, style = {}, ...children) => ({
  type,
  props: {
    style,
    children:
      children.length === 0
        ? undefined
        : children.length === 1
          ? children[0]
          : children,
  },
});
const img = (src, width, height, style = {}) => ({
  type: 'img',
  props: { src, width, height, style },
});

const label = (text, size = 20) =>
  h(
    'div',
    {
      fontSize: size,
      letterSpacing: size * 0.28,
      color: 'rgba(255,255,255,0.55)',
      fontWeight: 500,
    },
    text,
  );

const codePill = (text, size = 30) =>
  h(
    'div',
    {
      display: 'flex',
      backgroundColor: 'rgba(188,210,95,0.12)',
      border: `${Math.max(2, Math.round(size / 12))}px solid ${GREEN}`,
      borderRadius: 999,
      padding: `${size * 0.5}px ${size * 1.1}px`,
      fontSize: size,
      fontFamily: 'JetBrains Mono',
      fontWeight: 700,
      letterSpacing: size * 0.12,
      color: '#ffffff',
    },
    text,
  );

/** Rotated partner "ticket" with perforation — echoes the /discounts OG. */
function ticket({ width = 340, monogram = 150, rotate = 6, codeSize = 26 }) {
  const stubH = Math.round(Math.max(110, codeSize * 3.3));
  return h(
    'div',
    {
      display: 'flex',
      transform: `rotate(${rotate}deg)`,
      backgroundImage: `linear-gradient(135deg, ${GREEN}, ${BLUE})`,
      borderRadius: 28,
      padding: 4,
      boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
    },
    h(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: CARD,
        borderRadius: 24,
        width,
        position: 'relative',
      },
      // top: partner identity
      h(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          padding: '34px 32px 26px',
        },
        label('TECHNOLOGY PARTNER', Math.round(width * 0.045)),
        img(cyberLogo, monogram, monogram, { borderRadius: monogram * 0.18 }),
        h(
          'div',
          {
            fontSize: Math.round(width * 0.085),
            fontWeight: 800,
            color: '#ffffff',
          },
          'cyber_Folks',
        ),
      ),
      // perforation
      h('div', {
        height: 0,
        margin: '0 18px',
        borderTop: '3px dashed rgba(255,255,255,0.3)',
      }),
      // bottom: the code
      h(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: stubH,
        },
        codePill('MEETJS', codeSize),
      ),
    ),
  );
}

const page = (w, h_, style, ...children) =>
  h(
    'div',
    {
      width: w,
      height: h_,
      display: 'flex',
      backgroundColor: PURPLE,
      backgroundImage: BG_IMAGE,
      fontFamily: 'Montserrat',
      color: '#ffffff',
      ...style,
    },
    ...children,
  );

async function render(name, element, width, height) {
  const res = new ImageResponse(element, { width, height, fonts });
  writeFileSync(join(outDir, name), Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${name}`);
}

/* ------------------------------------------------------------------ */
/*  LinkedIn / Facebook  1200×630                                      */
/* ------------------------------------------------------------------ */
const landscape = page(
  1200,
  630,
  {},
  // left column
  h(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '56px 0 56px 64px',
      width: 690,
    },
    img(meetjsLogo, 216, 60),
    h(
      'div',
      { display: 'flex', flexDirection: 'column', gap: 10 },
      label('COMMUNITY PERK', 20),
      h(
        'div',
        { display: 'flex', alignItems: 'flex-end', gap: 20 },
        h(
          'div',
          { fontSize: 120, fontWeight: 800, color: GREEN, lineHeight: 1 },
          '20%',
        ),
        h(
          'div',
          {
            display: 'flex',
            flexDirection: 'column',
            fontSize: 40,
            fontWeight: 800,
            lineHeight: 1.15,
            paddingBottom: 8,
          },
          h('div', {}, 'na hosting'),
          h('div', {}, 'i domeny'),
        ),
      ),
      h(
        'div',
        { fontSize: 25, color: 'rgba(255,255,255,0.75)' },
        'Kupujesz — wspierasz meet.js',
      ),
    ),
    h(
      'div',
      { display: 'flex', alignItems: 'center', gap: 24 },
      codePill('CODE: MEETJS', 24),
      h(
        'div',
        { fontSize: 23, color: 'rgba(255,255,255,0.5)' },
        'meetjs.pl/discounts',
      ),
    ),
  ),
  // right: ticket
  h(
    'div',
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 510,
    },
    ticket({ width: 330, monogram: 140, rotate: 6, codeSize: 26 }),
  ),
);

/* ------------------------------------------------------------------ */
/*  Instagram feed  1080×1080                                          */
/* ------------------------------------------------------------------ */
const feed = page(
  1080,
  1080,
  {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '48px 48px 44px',
  },
  img(meetjsLogo, 300, 83),
  h(
    'div',
    { display: 'flex', alignItems: 'center', gap: 56 },
    ticket({ width: 430, monogram: 190, rotate: -5, codeSize: 36 }),
    h(
      'div',
      { display: 'flex', flexDirection: 'column', gap: 14 },
      h(
        'div',
        { fontSize: 190, fontWeight: 800, color: GREEN, lineHeight: 1 },
        '20%',
      ),
      h(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          fontSize: 56,
          fontWeight: 800,
          lineHeight: 1.2,
        },
        h('div', {}, 'na hosting'),
        h('div', {}, 'i domeny'),
      ),
    ),
  ),
  h(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
    },
    h(
      'div',
      { fontSize: 36, color: 'rgba(255,255,255,0.85)' },
      'Kupujesz — wspierasz meet.js 💜',
    ),
    h(
      'div',
      { fontSize: 30, color: 'rgba(255,255,255,0.5)' },
      'meetjs.pl/discounts',
    ),
  ),
);

/* ------------------------------------------------------------------ */
/*  Instagram story  1080×1920  (IG UI safe zone ~250 top / 280 bottom)*/
/* ------------------------------------------------------------------ */
const story = page(
  1080,
  1920,
  {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 88,
    },
    img(meetjsLogo, 400, 111),
    ticket({ width: 620, monogram: 270, rotate: -4, codeSize: 52 }),
    h(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      },
      h(
        'div',
        { fontSize: 210, fontWeight: 800, color: GREEN, lineHeight: 1 },
        '20%',
      ),
      h('div', { fontSize: 58, fontWeight: 800 }, 'zniżki na hosting i domeny'),
      h(
        'div',
        {
          fontSize: 40,
          color: 'rgba(255,255,255,0.85)',
          marginTop: 18,
        },
        'Kupujesz — wspierasz meet.js 💜',
      ),
    ),
    h(
      'div',
      { fontSize: 34, color: 'rgba(255,255,255,0.5)' },
      'meetjs.pl/discounts',
    ),
  ),
);

/* ---------------------------------- run ------------------------------------ */
await render('linkedin-facebook-1200x630.png', landscape, 1200, 630);
await render('instagram-feed-1080x1080.png', feed, 1080, 1080);
await render('instagram-story-1080x1920.png', story, 1080, 1920);
console.log(`\nDone → ${outDir}`);
