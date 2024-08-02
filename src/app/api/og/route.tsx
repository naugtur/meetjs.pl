import { ImageResponse } from 'next/og';
import { env } from '@/env';

export const GET = async (request: Request) => {
	try {
		const { searchParams } = new URL(request.url);

		const hasCity = searchParams.has('city');
		const city = hasCity ? searchParams.get('city')?.slice(0, 100) : 'Poland';

		const fontData = await fetch(
			new URL(`${env.SITE_URL}/assets/Montserrat-Bold.ttf`, import.meta.url),
		).then((res) => res.arrayBuffer());

		return new ImageResponse(
			(
				<div
					style={{
						display: 'flex',
						position: 'relative',
					}}
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						width="1200"
						height="630"
						src={`${env.SITE_URL}/assets/og-image-city.png`}
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							zIndex: 1,
						}}
						alt=""
					/>
					<p tw="text-white font-bold pt-77 pl-62 text-8xl">{city}</p>
				</div>
			),
			{
				width: 1200,
				height: 630,
				fonts: [{ name: 'Montserrat-Bold', data: fontData, style: 'normal' }],
			},
		);
	} catch (e) {
		console.log(e);
		return new Response(`Failed to generate the image`, {
			status: 500,
		});
	}
};
