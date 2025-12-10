'use client';

import { FaArrowRight } from 'react-icons/fa6';

export const The5ContestBanner = () => {
  return (
    <section className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left side - Icon and text */}
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center justify-center bg-white/10">
              <img src="/partners/the5.png" alt="THE5 Logo" />
            </div>
            <div>
              <h3 className="mb-1 text-2xl font-bold">
                🎁 The 5. LIVE już dzisiaj!
              </h3>
              <p className="text-white/90">Dołącz do LIVE już dziś od 12:00</p>
            </div>
          </div>

          {/* Right side - CTA buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="https://the5.live?r=5VqoY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
            >
              Dołącz do THE 5. LIVE
              <FaArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
