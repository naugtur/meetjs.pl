'use client';

import { FaYoutube, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import type { Route } from 'next';

export const YouTubeSubscribeBanner = () => {
  return (
    <section className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left side - Icon and text */}
          <div className="flex items-center gap-4 text-white">
            <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm">
              <FaYoutube className="h-12 w-12" />
            </div>
            <div>
              <h3 className="mb-1 text-2xl font-bold">
                Subscribe to our YouTube Channel
              </h3>
              <p className="text-white/90">
                Watch talks, workshops, and community highlights
              </p>
            </div>
          </div>

          {/* Right side - CTA buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/youtube"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-6 py-3 font-semibold text-red-600 shadow-lg transition-colors duration-200 hover:bg-gray-100 hover:shadow-xl"
            >
              <FaYoutube className="h-5 w-5" />
              Subscribe Now
            </a>
            <Link
              href={'/videos' as Route}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
            >
              Browse Videos
              <FaArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
