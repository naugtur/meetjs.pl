import React from 'react';
import { Camera, Heart, Users, ImageIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="container mx-auto max-w-3xl py-16">
      <h1 className="mb-8 text-4xl font-bold">📸 Share Your Memories</h1>

      <div className="mb-12 space-y-4">
        <p>
          We would love to hear from you! Share your memories and photos with us to help build the story of our community.
        </p>
        <p>
          Whether it&apos;s a photo from your first meetup, a memorable talk, or just a fun moment with fellow developers - every memory helps tell the story of meet.js.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">💡 What Can You Share?</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 flex items-center gap-2 font-semibold dark:text-gray-100">
              <ImageIcon className="h-5 w-5 text-purple dark:text-green" />
              Photos & Videos
            </h3>
            <ul className="list-disc space-y-1 pl-6 text-sm text-gray-700 dark:text-gray-300">
              <li>Meetup moments and networking</li>
              <li>Speaker presentations</li>
              <li>Team photos and group shots</li>
              <li>Behind-the-scenes moments</li>
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 flex items-center gap-2 font-semibold dark:text-gray-100">
              <Heart className="h-5 w-5 text-purple dark:text-green" />
              Stories & Experiences
            </h3>
            <ul className="list-disc space-y-1 pl-6 text-sm text-gray-700 dark:text-gray-300">
              <li>Your first meet.js experience</li>
              <li>Memorable talks or workshops</li>
              <li>Connections you&apos;ve made</li>
              <li>How meet.js impacted your career</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">🤝 Why Share?</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 flex items-center gap-2 font-semibold dark:text-gray-100">
              <Users className="h-5 w-5 text-purple dark:text-green" />
              Build Community
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Your stories inspire others and strengthen our JavaScript community.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 flex items-center gap-2 font-semibold dark:text-gray-100">
              <Camera className="h-5 w-5 text-purple dark:text-green" />
              Preserve History
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Since 2011, we&apos;ve created countless memories. Help us document our journey.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 flex items-center gap-2 font-semibold dark:text-gray-100">
              <Heart className="h-5 w-5 text-purple dark:text-green" />
              Celebrate Together
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Every photo and story celebrates the people who make meet.js amazing.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">📧 How to Share</h2>
        <p className="mb-6">
          Send your contributions to:{' '}
          <a
            href="mailto:contact@meetjs.pl"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            contact@meetjs.pl
          </a>
        </p>
        
        <div className="flex justify-center md:justify-start">
          <Link
            href="mailto:contact@meetjs.pl?subject=Sharing%20My%20meet.js%20Memory"
            className={buttonVariants({
              className:
                'w-fit bg-purple px-8 py-4 text-center text-black hover:bg-purple/80 dark:bg-green dark:hover:bg-green/80',
            })}
          >
            Share Your Memory
          </Link>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <p className="mb-2 text-sm font-semibold dark:text-gray-100">Important Information:</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          By submitting materials, you agree to their free distribution and use for marketing and promotional purposes. 
          You have the right to withdraw your consent at any time by contacting us.
        </p>
      </div>
    </div>
  );
}
