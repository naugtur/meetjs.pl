'use client';

import { FaYoutube, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import type { Route } from 'next';

export const YouTubeSubscribeBanner = () => {
  return (
    <section className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Icon and text */}
          <div className="flex items-center gap-4 text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <FaYoutube className="h-12 w-12" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">
                Subscribe to our YouTube Channel
              </h3>
              <p className="text-white/90">
                Watch talks, workshops, and community highlights
              </p>
            </div>
          </div>

          {/* Right side - CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/youtube"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <FaYoutube className="h-5 w-5" />
              Subscribe Now
            </a>
            <Link
              href={'/videos' as Route}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold px-6 py-3 rounded-lg transition-colors duration-200 border-2 border-white/30 whitespace-nowrap"
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
