/**
 * meet.js — 2026/2027 Partners & Discounts LinkedIn/Social promo graphic generator.
 *
 * Uses @vercel/og (satori) bundled with Next.js, following docs/social-media/cyberfolks-meetjs/.
 *
 * Run: node docs/social-media/partners-discounts-2026-2027/generate-graphics.mjs
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
  'radial-gradient(circle at 88% 12%, rgba(35,158,171,0.42), transparent 52%), ' +
  'radial-gradient(circle at 8% 92%, rgba(188,210,95,0.28), transparent 46%)';

/* ---------------------------------- assets --------------------------------- */
const toSvgUri = (svg) =>
  `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
const toPngUri = (buf) => `data:image/png;base64,${buf.toString('base64')}`;

const meetjsLogo = toSvgUri(
  readFileSync(join(root, 'public/logo.svg'), 'utf8'),
);

const reactDaySvg = readFileSync(
  join(root, 'public/discounts/react-day-berlin.svg'),
  'utf8',
).replace('<path ', '<path fill="#61dafb" ');
const reactDayLogo = toSvgUri(reactDaySvg);

const aiCodingSvg = readFileSync(
  join(root, 'public/discounts/ai-coding-summit-berlin.svg'),
  'utf8',
)
  .replace(
    'width="190" height="48" viewBox="0 0 190 48"',
    'width="48" height="48" viewBox="0 0 48 48"',
  )
  .replaceAll('fill="black"', 'fill="#ffffff"');
const aiCodingLogo = toSvgUri(aiCodingSvg);

const smashingSvg = readFileSync(
  join(root, 'public/partners/smashingconf-white.svg'),
  'utf8',
).replace('viewBox="0 0 244 66"', 'viewBox="0 0 64 66"');
const smashingLogo = toSvgUri(smashingSvg);
const boilingFrogsLogo = toPngUri(
  readFileSync(join(root, 'public/partners/boiling-frogs.png')),
);
const devoxxLogo = toSvgUri(
  readFileSync(join(root, 'public/partners/devoxx-poland-white.svg'), 'utf8'),
);
const jetbrainsLogo = toSvgUri(
  readFileSync(join(root, 'public/partners/jetbrains-white.svg'), 'utf8'),
);

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
    data: await fetchFont('Montserrat', 700, 'montserrat-700.ttf'),
    weight: 700,
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

const label = (text, size = 18) =>
  h(
    'div',
    {
      fontSize: size,
      letterSpacing: size * 0.24,
      color: 'rgba(255,255,255,0.58)',
      fontWeight: 700,
    },
    text,
  );

const codeBadge = (text, size = 16) =>
  h(
    'div',
    {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(188,210,95,0.14)',
      border: `2px solid ${GREEN}`,
      borderRadius: 999,
      padding: `${Math.round(size * 0.28)}px ${Math.round(size * 0.7)}px`,
      fontSize: size,
      fontFamily: 'JetBrains Mono',
      fontWeight: 700,
      letterSpacing: size * 0.04,
      color: GREEN,
      whiteSpace: 'nowrap',
    },
    text,
  );

const discountRow = ({
  title,
  meta,
  code,
  badge = '-15%',
  iconNode,
  compact = false,
}) =>
  h(
    'div',
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 16,
      padding: compact ? '13px 16px' : '15px 18px',
      gap: 10,
      width: '100%',
    },
    h(
      'div',
      {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      },
      iconNode,
      h(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        },
        h(
          'div',
          {
            fontSize: compact ? 17 : 20,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
          },
          title,
        ),
        h(
          'div',
          {
            fontSize: compact ? 13 : 14,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.62)',
          },
          meta,
        ),
      ),
    ),
    h(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 5,
        flexShrink: 0,
      },
      h(
        'div',
        {
          fontSize: compact ? 15 : 18,
          fontWeight: 800,
          color: GREEN,
          lineHeight: 1,
        },
        badge,
      ),
      codeBadge(code, compact ? 12 : 14),
    ),
  );

function dealsTicket({ width = 500, rotate = 2, compact = false }) {
  return h(
    'div',
    {
      display: 'flex',
      transform: `rotate(${rotate}deg)`,
      backgroundImage: `linear-gradient(135deg, ${GREEN}, ${BLUE})`,
      borderRadius: 28,
      padding: 3,
      boxShadow: '0 28px 60px rgba(0,0,0,0.52)',
    },
    h(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: CARD,
        borderRadius: 25,
        width,
      },
      // top section: active discounts
      h(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          gap: compact ? 10 : 12,
          padding: compact ? '22px 22px 20px' : '26px 26px 22px',
        },
        h(
          'div',
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 4,
          },
          label('AKTYWNE KODY RABATOWE', compact ? 13 : 14),
          h(
            'div',
            {
              display: 'flex',
              backgroundColor: 'rgba(35,158,171,0.22)',
              border: `1px solid ${BLUE}`,
              borderRadius: 999,
              padding: '4px 12px',
              fontSize: 12,
              fontWeight: 700,
              color: '#8de4ee',
            },
            '2026 / 2027',
          ),
        ),
        discountRow({
          title: 'React Day Berlin',
          meta: '4 & 7.12.2026 • Berlin + Online',
          code: 'MEETJS',
          compact,
          iconNode: h(
            'div',
            {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: 'rgba(97,218,251,0.12)',
            },
            img(reactDayLogo, 28, 29),
          ),
        }),
        discountRow({
          title: 'AI Coding Summit Berlin',
          meta: '4 & 7.12.2026 • Berlin + Online',
          code: 'MEETJS',
          compact,
          iconNode: h(
            'div',
            {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: 'rgba(168,85,247,0.22)',
            },
            img(aiCodingLogo, 28, 28),
          ),
        }),
        discountRow({
          title: 'SmashingConf Amsterdam',
          meta: '18–21.05.2027 • Amsterdam',
          code: 'welovecommunity',
          compact,
          iconNode: h(
            'div',
            {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: 'rgba(211,58,44,0.85)',
            },
            img(smashingLogo, 26, 27),
          ),
        }),
      ),
      // perforation
      h('div', {
        height: 0,
        margin: '0 20px',
        borderTop: '3px dashed rgba(255,255,255,0.25)',
      }),
      // bottom stub: new 2027 partners
      h(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          padding: compact ? '16px 22px 20px' : '18px 26px 22px',
        },
        label('NOWI PARTNERZY NA 2027 + KONKURSY', compact ? 11 : 12),
        h(
          'div',
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            gap: 16,
          },
          img(boilingFrogsLogo, 126, 48, { objectFit: 'contain' }),
          img(devoxxLogo, 108, 40, { objectFit: 'contain' }),
          img(jetbrainsLogo, 136, 29, { objectFit: 'contain' }),
        ),
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
const linkedin = page(
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
      padding: '50px 0 50px 54px',
      width: 556,
    },
    img(meetjsLogo, 196, 54),
    h(
      'div',
      { display: 'flex', flexDirection: 'column', gap: 14 },
      label('COMMUNITY PERKS', 18),
      h(
        'div',
        { display: 'flex', alignItems: 'flex-end', gap: 16 },
        h(
          'div',
          { fontSize: 102, fontWeight: 800, color: GREEN, lineHeight: 0.95 },
          '-15%',
        ),
        h(
          'div',
          {
            display: 'flex',
            flexDirection: 'column',
            fontSize: 34,
            fontWeight: 800,
            lineHeight: 1.12,
            paddingBottom: 5,
          },
          h('div', {}, 'na topowe'),
          h('div', {}, 'konferencje'),
        ),
      ),
      h(
        'div',
        {
          fontSize: 21,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.78)',
          lineHeight: 1.38,
          maxWidth: 465,
        },
        'Nowe partnerstwa, rabaty na bilety i konkursy o wejściówki dla społeczności meet.js.',
      ),
    ),
    h(
      'div',
      { display: 'flex', alignItems: 'center', gap: 18 },
      h(
        'div',
        {
          display: 'flex',
          backgroundColor: GREEN,
          borderRadius: 999,
          padding: '12px 26px',
          fontSize: 21,
          fontFamily: 'JetBrains Mono',
          fontWeight: 700,
          color: PURPLE,
        },
        'meetjs.pl/discounts',
      ),
    ),
  ),
  // right column: ticket card
  h(
    'div',
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 644,
      paddingRight: 24,
    },
    dealsTicket({ width: 556, rotate: 2, compact: true }),
  ),
);

/* ------------------------------------------------------------------ */
/*  Square 1080×1080 (LinkedIn square / Instagram feed)                */
/* ------------------------------------------------------------------ */
const square = page(
  1080,
  1080,
  {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '54px 64px 52px',
  },
  h(
    'div',
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    img(meetjsLogo, 224, 62),
    label('COMMUNITY PERKS', 18),
  ),
  h(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
      textAlign: 'center',
    },
    h(
      'div',
      { display: 'flex', alignItems: 'baseline', gap: 22 },
      h(
        'div',
        { fontSize: 120, fontWeight: 800, color: GREEN, lineHeight: 0.95 },
        '-15%',
      ),
      h(
        'div',
        { fontSize: 48, fontWeight: 800, lineHeight: 1.05 },
        'na konferencje IT',
      ),
    ),
    h(
      'div',
      {
        fontSize: 26,
        fontWeight: 500,
        color: 'rgba(255,255,255,0.78)',
      },
      'Nowe partnerstwa, rabaty i darmowe wejściówki dla społeczności',
    ),
  ),
  dealsTicket({ width: 820, rotate: -1.5, compact: false }),
  h(
    'div',
    {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    },
    h(
      'div',
      {
        display: 'flex',
        backgroundColor: GREEN,
        borderRadius: 999,
        padding: '14px 34px',
        fontSize: 26,
        fontFamily: 'JetBrains Mono',
        fontWeight: 700,
        color: PURPLE,
      },
      'meetjs.pl/discounts',
    ),
  ),
);

/* ---------------------------------- run ------------------------------------ */
await render('linkedin-1200x630.png', linkedin, 1200, 630);
await render('square-1080x1080.png', square, 1080, 1080);
console.log(`\nDone → ${outDir}`);
