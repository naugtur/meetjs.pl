import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// next/og replacement: satori builds the SVG, resvg rasterizes to PNG.
// Assets are read from public/ on disk — satori's SSRF protection blocks
// fetching from the server's own origin anyway.
const asset = (name: string) =>
  readFileSync(join(process.cwd(), 'public', 'assets', name));

const fontData = asset('Montserrat-Bold.ttf');
const background = `data:image/png;base64,${asset('og-image-city.png').toString('base64')}`;

export const GET = async (event: { request: Request }) => {
  try {
    const { searchParams } = new URL(event.request.url);

    const hasCity = searchParams.has('city');
    const city = hasCity ? searchParams.get('city')?.slice(0, 100) : 'Poland';

    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            position: 'relative',
            width: '1200px',
            height: '630px',
          },
          children: [
            {
              type: 'img',
              props: {
                width: 1200,
                height: 630,
                src: background,
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                },
                alt: '',
              },
            },
            {
              type: 'p',
              props: {
                style: {
                  position: 'absolute',
                  top: '308px',
                  left: '248px',
                  zIndex: 2,
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '96px',
                },
                children: city,
              },
            },
          ],
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Montserrat',
            data: fontData,
            weight: 700,
            style: 'normal',
          },
        ],
      },
    );

    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
      .render()
      .asPng();

    return new Response(new Uint8Array(png), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch (e) {
    console.log(e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};
