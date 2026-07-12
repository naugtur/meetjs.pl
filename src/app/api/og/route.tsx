import { ImageResponse } from 'next/og';
import { getLogoDataUri } from '@/utils/og';

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);

    const hasCity = searchParams.has('city');
    const city = hasCity
      ? (searchParams.get('city')?.slice(0, 100) ?? 'Poland')
      : 'Poland';

    return new ImageResponse(
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#2b1932',
          padding: '72px 0 56px 150px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative blocks */}
        <div
          style={{
            position: 'absolute',
            top: 45,
            right: 0,
            width: 250,
            height: 22,
            backgroundColor: '#bcd25f',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 315,
            right: 80,
            width: 205,
            height: 55,
            backgroundColor: '#219eab',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 430,
            right: 165,
            width: 18,
            height: 120,
            backgroundColor: '#bcd25f',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 45,
            width: 55,
            height: 80,
            backgroundColor: '#219eab',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 0,
            width: 45,
            height: 45,
            backgroundColor: '#bcd25f',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: 0,
            width: 22,
            height: 60,
            backgroundColor: '#219eab',
          }}
        />

        {/* Logo */}
        <div style={{ display: 'flex' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={getLogoDataUri()} width={295} height={82} alt="" />
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              position: 'relative',
              alignSelf: 'flex-start',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '38%',
                bottom: '2%',
                left: 60,
                right: -120,
                backgroundColor: '#219eab',
              }}
            />
            <span
              style={{
                fontSize: 84,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              javascript meetups
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              position: 'relative',
              alignSelf: 'flex-start',
              marginTop: 20,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '30%',
                bottom: '-6%',
                left: -150,
                right: -60,
                backgroundColor: '#bcd25f',
              }}
            />
            <span
              style={{
                fontSize: 84,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              in {city.toLowerCase()}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: '#ffffff',
              marginRight: 150,
            }}
          >
            meetjs.pl
          </span>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.log(e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};
