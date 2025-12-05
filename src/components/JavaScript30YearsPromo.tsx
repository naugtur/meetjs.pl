'use client';

import { FaCalendar, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';

export const JavaScript30YearsPromo = () => {
  return (
    <section className="w-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left side - Icon and text */}
          <div className="flex items-center gap-4 text-white">
            <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm">
              <FaCalendar className="h-12 w-12" />
            </div>
            <div>
              <h3 className="mb-1 text-2xl font-bold">
                30 Years of JavaScript
              </h3>
              <p className="text-white/90">
                Explore the interactive timeline of JavaScript&apos;s evolution
              </p>
            </div>
          </div>

          {/* Right side - CTA button */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/30-years-of-javascript"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-6 py-3 font-semibold text-yellow-600 shadow-lg transition-colors duration-200 hover:bg-gray-100 hover:shadow-xl"
            >
              <FaCalendar className="h-5 w-5" />
              Explore Timeline
              <FaArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
