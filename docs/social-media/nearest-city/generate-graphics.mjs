/**
 * "Find my nearest meetup" (<geolocation>) — promo graphics generator.
 *
 * Uses @vercel/og (satori) bundled with Next.js: proper flexbox layout
 * + the site's brand font (Montserrat). Map SVG reuses the real Poland
 * polygon + city positions from PolandMap.tsx / cities.tsx.
 *
 * Run: node docs/social-media/nearest-city/generate-graphics.mjs
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

// Poland outline + real city positions (viewBox 280x244, from cities.tsx)
const CITY_DOTS = [
  [220, 80],
  [120, 210],
  [110, 25],
  [130, 200],
  [150, 164],
  [130, 130],
  [190, 160],
  [60, 110],
  [160, 110],
  [70, 170],
  [20, 50],
  [100, 80],
];
const KRAKOW = [150, 210];
const POLAND_POINTS =
  '70.067,190.289 70.067,198.219 63.458,204.828 51.563,190.289 51.563,181.698 ' +
  '22.156,168.481 12.494,128.164 13.526,97.904 3.783,87.567 2,46.886 ' +
  '48.259,29.704 65.771,12.192 103.77,2.165 111.039,21.774 132.186,31.026 ' +
  '145.403,23.096 222.061,24.418 235.938,33.009 248.825,97.771 235.071,103.595 ' +
  '227.678,115.944 241.225,122.222 239.904,153.943 258,180.096 216.774,223.992 ' +
  '215.452,241.835 200.253,238.531 189.019,229.279 144.081,241.835 ' +
  '133.508,225.314 121.613,227.957 110.378,212.097';

const mapSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 244">
  <polygon points="${POLAND_POINTS}" fill="${GREEN}" stroke="${PURPLE}" stroke-width="3"/>
  ${CITY_DOTS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${PURPLE}"/>`).join('')}
  <circle cx="${KRAKOW[0]}" cy="${KRAKOW[1]}" r="11" fill="none" stroke="${PURPLE}" stroke-width="4"/>
</svg>`;
const mapImg = `data:image/svg+xml;base64,${Buffer.from(mapSvg).toString('base64')}`;

const pinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
const pinImg = `data:image/svg+xml;base64,${Buffer.from(pinSvg).toString('base64')}`;

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

const monoChip = (text, size = 22) =>
  h(
    'div',
    {
      display: 'flex',
      backgroundColor: 'rgba(35,158,171,0.15)',
      border: `2px solid ${BLUE}`,
      borderRadius: 999,
      padding: `${size * 0.4}px ${size * 0.9}px`,
      fontSize: size,
      fontFamily: 'JetBrains Mono',
      fontWeight: 700,
      color: '#ffffff',
    },
    text,
  );

/** Mock of the actual UI: map + button + in-city result. */
function uiMock(scale = 1) {
  const s = (v) => Math.round(v * scale);
  return h(
    'div',
    {
      display: 'flex',
      transform: `rotate(${scale > 1 ? -2 : 2}deg)`,
      backgroundImage: `linear-gradient(135deg, ${GREEN}, ${BLUE})`,
      borderRadius: s(28),
      padding: s(4),
      boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
    },
    h(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: s(22),
        backgroundColor: CARD,
        borderRadius: s(24),
        padding: `${s(30)}px ${s(28)}px`,
      },
      img(mapImg, s(190), s(166)),
      // button
      h(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          gap: s(10),
          backgroundColor: PURPLE,
          border: `${s(2)}px solid rgba(255,255,255,0.18)`,
          borderRadius: s(10),
          padding: `${s(12)}px ${s(20)}px`,
          fontSize: s(19),
          fontWeight: 500,
          color: '#ffffff',
        },
        img(pinImg, s(18), s(18)),
        'Find my nearest meetup',
      ),
      // result
      h(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: s(6),
        },
        h(
          'div',
          { fontSize: s(17), color: 'rgba(255,255,255,0.75)' },
          "Looks like you're in a meet.js city:",
        ),
        h(
          'div',
          {
            fontSize: s(24),
            fontWeight: 800,
            color: GREEN,
            textDecoration: 'underline',
          },
          'Kraków',
        ),
      ),
      monoChip('<geolocation>', s(15)),
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
/*  Landscape (LinkedIn 1200x630 / X 1200x675)                          */
/* ------------------------------------------------------------------ */
function landscape(w, h_) {
  return page(
    w,
    h_,
    {},
    // left column
    h(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: `${h_ * 0.09}px 0 ${h_ * 0.09}px 64px`,
        width: w - 500,
      },
      img(meetjsLogo, 216, 60),
      h(
        'div',
        { display: 'flex', flexDirection: 'column', gap: 14 },
        label('NOWOŚĆ NA MEETJS.PL', 20),
        h(
          'div',
          {
            display: 'flex',
            flexDirection: 'column',
            fontSize: 62,
            fontWeight: 800,
            lineHeight: 1.1,
          },
          h('div', {}, 'Znajdź swój'),
          h('div', { color: GREEN }, 'najbliższy meetup'),
        ),
        h(
          'div',
          { fontSize: 26, color: 'rgba(255,255,255,0.75)', lineHeight: 1.35 },
          'Jeden klik — a mapa podpowie Twoje miasto.',
        ),
      ),
      h(
        'div',
        { display: 'flex', alignItems: 'center', gap: 20 },
        monoChip('meetjs.pl', 22),
        h(
          'div',
          { fontSize: 21, color: 'rgba(255,255,255,0.5)' },
          'sekcja „Join Us”',
        ),
      ),
    ),
    // right: UI mock card
    h(
      'div',
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 500,
      },
      uiMock(1),
    ),
  );
}

/* ---------------------------------- run ------------------------------------ */
await render('linkedin-1200x630.png', landscape(1200, 630), 1200, 630);
await render('x-1200x675.png', landscape(1200, 675), 1200, 675);
console.log(`\nDone → ${outDir}`);
