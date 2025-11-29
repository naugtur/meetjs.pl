'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});

const shareText = `🎉 Happy 14th Birthday, meet.js! 🎉

Fourteen years ago, meet.js started as a small gathering of JavaScript enthusiasts. Today, we're a thriving community that has brought together thousands of developers, shared countless lines of code, and sparked friendships that go beyond tech.

Thank you to everyone—speakers, organizers, attendees—who have made meet.js. Your passion and dedication keep this community alive and growing! 🚀

Here's to more meetups, knowledge-sharing, and JavaScript magic! 🥳

#meetjs #HappyBirthday #14YearsOfMeetjs #JavaScript #CodingCommunity #WebDevelopment`;

function ShareButton({
  platform,
  onClick,
  children,
}: {
  platform: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-6 py-2 font-semibold text-white transition-transform hover:scale-105 ${platform === 'twitter' ? 'bg-[#1DA1F2]' : ''} ${platform === 'linkedin' ? 'bg-[#0A66C2]' : ''} ${platform === 'facebook' ? 'bg-[#1877F2]' : ''} `}
    >
      {children}
    </button>
  );
}

export default function Page() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const confettiTimeout = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => {
      clearTimeout(confettiTimeout);
    };
  }, []);

  const shareOnTwitter = () => {
    const url = encodeURIComponent('https://meetjs.pl/14-birthday');
    const text = encodeURIComponent(shareText);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank',
    );
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent('https://meetjs.pl/14-birthday');
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      '_blank',
    );
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent('https://meetjs.pl/14-birthday');
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      '_blank',
    );
  };

  return (
    <>
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0">
          <Confetti
            numberOfPieces={200}
            recycle={true}
            colors={[
              '#FFD700',
              '#FF6B6B',
              '#4ECDC4',
              '#45B7D1',
              '#96CEB4',
              '#FFEEAD',
            ]}
            gravity={0.3}
            tweenDuration={5000}
            initialVelocityY={15}
            wind={0.01}
          />
        </div>
      )}
      <div className="container relative mx-auto max-w-4xl py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-6xl font-bold text-transparent">
            🎉 14 Years of meet.js! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            Celebrating Poland&apos;s JavaScript Community Since 2011
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
            What started as a gathering on February 12, 2011 in Klub ZAK, Poznań
            has blossomed into Poland&apos;s largest JavaScript community. For
            14 incredible years, we&apos;ve been:
          </p>
          <div className="my-6">
            <Image
              src="/IMG_0093.JPG"
              alt="First meet.js meetup at Klub ZAK in 2011"
              width={400}
              height={300}
              className="mx-auto mb-2 rounded-lg shadow-lg"
            />
            <p className="text-center text-sm italic text-gray-500">
              A snapshot from the very first meet.js meetup at Klub ZAK, Poznań
              (February 12, 2011)
            </p>
          </div>
          <div className="rounded-r-lg border-l-4 border-blue-600 bg-gray-50 p-4 shadow-sm">
            <p className="text-sm leading-relaxed text-gray-700">
              The first meet.js featured talks on cutting-edge topics of the
              time, including jQuery Mobile, Box2D physics engine, HTML5 audio,
              and IndexedDB API - setting the stage for our community&apos;s
              focus on sharing knowledge about emerging web technologies.{' '}
              <a
                href="https://web.archive.org/web/20110121031140/http://jsnews.pl/2011/01/18/meet-js-12-lutego-w-poznaniu/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
              >
                <span>View original announcement</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </p>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
            <div className="mb-2 text-3xl font-bold text-blue-600">14</div>
            <div className="text-gray-600">Years Strong</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
            <div className="mb-2 text-3xl font-bold text-blue-600">8+</div>
            <div className="text-gray-600">Active Cities</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
            <div className="mb-2 text-3xl font-bold text-blue-600">500+</div>
            <div className="text-gray-600">Meetups Held</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
            <div className="mb-2 text-3xl font-bold text-blue-600">1000+</div>
            <div className="text-gray-600">Talks Given</div>
          </div>
        </div>

        <div className="my-12">
          <h2 className="mb-6 text-center text-2xl font-semibold">
            Key Milestones
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-24 flex-shrink-0 font-bold text-blue-600">
                2011
              </div>
              <div className="flex-grow">First meet.js in Poznań</div>
            </div>
            <div className="flex items-start">
              <div className="w-24 flex-shrink-0 font-bold text-blue-600">
                2012
              </div>
              <div className="flex-grow">Expansion to Warsaw and Wrocław</div>
            </div>
            <div className="flex items-start">
              <div className="w-24 flex-shrink-0 font-bold text-blue-600">
                2015
              </div>
              <div className="flex-grow">First meet.js Summit conference</div>
            </div>
            <div className="flex items-start">
              <div className="w-24 flex-shrink-0 font-bold text-blue-600">
                2024
              </div>
              <div className="flex-grow">
                14th Anniversary - Still growing strong!
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-blue-600">
              Our Impact
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Organizing hundreds of free meetups</li>
              <li>Building a nationwide tech community</li>
              <li>Hosting successful Summit conferences</li>
              <li>Connecting thousands of developers</li>
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-blue-600">
              Our Pride
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>100% Non-Commercial Spirit</li>
              <li>Community-First Approach</li>
              <li>Knowledge Sharing Culture</li>
              <li>Nationwide Presence</li>
            </ul>
          </div>
        </div>

        <div className="mb-12 text-center">
          <h2 className="mb-6 text-3xl font-semibold">Thank You!</h2>
          <p className="mb-4 text-lg">
            To all organizers, speakers, attendees, and supporters who&apos;ve
            made these 14 years possible.
          </p>
          <p className="text-lg">
            Here&apos;s to many more years of learning, sharing, and growing
            together! 🚀
          </p>
        </div>

        <div className="text-center">
          <h3 className="mb-4 text-xl font-semibold">Join the Celebration!</h3>
          <p className="mb-4">
            Find your local meet.js chapter or{' '}
            <a
              href="/how-to-become-an-organizer"
              className="font-bold text-blue-600 hover:underline"
            >
              become an organizer
            </a>{' '}
            to help write the next chapter of our story.
          </p>
        </div>

        <div className="mt-12 text-center">
          <h3 className="mb-6 text-2xl font-semibold">
            Share the Celebration! 🎈
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <ShareButton platform="twitter" onClick={shareOnTwitter}>
              Share on Twitter
            </ShareButton>
            <ShareButton platform="linkedin" onClick={shareOnLinkedIn}>
              Share on LinkedIn
            </ShareButton>
            <ShareButton platform="facebook" onClick={shareOnFacebook}>
              Share on Facebook
            </ShareButton>
          </div>
        </div>
      </div>
    </>
  );
}
