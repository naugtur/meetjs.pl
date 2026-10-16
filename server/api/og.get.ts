import { ImageResponse } from '@vercel/og';

// City name over the meet.js background; used as og:image of the city pages.
export default defineEventHandler((event) => {
  try {
    const { searchParams } = getRequestURL(event);
    const city = searchParams.has('city')
      ? searchParams.get('city')?.slice(0, 100)
      : 'Poland';
    const { SITE_URL } = useServerEnv();

    const element = ogNode(
      'div',
      { style: { display: 'flex', position: 'relative' } },
      ogNode('img', {
        width: '1200',
        height: '630',
        src: `${SITE_URL}/assets/og-image-city.png`,
        style: { position: 'absolute', top: 0, left: 0, zIndex: 1 },
        alt: '',
      }),
      ogNode(
        'p',
        { tw: 'text-white font-bold pt-77 pl-62 text-8xl' },
        city ?? '',
      ),
    );

    return new ImageResponse(element as unknown as OgElement, {
      width: 1200,
      height: 630,
      headers: { 'cache-control': 'public, max-age=0, must-revalidate' },
    });
  } catch (error) {
    console.log(error);
    return new Response('Failed to generate the image', { status: 500 });
  }
});
