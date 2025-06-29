'use client';

import Link from 'next/link';
import type { Promo } from '@/types/promo';

const getDomain = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return domain.startsWith('www.') ? domain.substring(4) : domain;
  } catch (e) {
    console.error('Failed to extract domain from URL:', e);
    return url;
  }
};

// Format date to be more readable
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

interface PromoCardProps {
  promo: Promo;
}

export function PromoCard({ promo }: PromoCardProps) {
  const expiryDate = formatDate(promo.expiresAt);

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-xl border-2 border-purple ${promo.gradient || 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-500'} shadow-lg transition-transform hover:scale-[1.01]`}
    >
      <div className="flex items-center gap-3 border-b border-white/20 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl">
          {promo.icon || '🎟️'}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white drop-shadow-md">
            {promo.name}
          </h3>
          <p className="text-sm text-white/80 drop-shadow-sm">
            {promo.message}
          </p>
        </div>
      </div>

      <div className="flex-1 p-4 text-white">
        {promo.description && (
          <div className="mb-4">
            <p className="text-sm text-white/70">About</p>
            <p className="text-sm leading-relaxed">{promo.description}</p>
          </div>
        )}

        <div className="mb-4 grid grid-cols-2 gap-4">
          {promo.city && promo.country && (
            <div>
              <p className="text-sm text-white/70">Location</p>
              <div className="flex items-center gap-1">
                <span className="font-medium">{promo.city}</span>
                <span className="text-white/70">•</span>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{promo.country}</span>
                  <span role="img" aria-label={promo.country}>
                    {promo.emojiRight}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div>
            <p className="text-sm text-white/70">Valid Until</p>
            <p className="font-medium">{expiryDate}</p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div>
            <p className="text-sm text-white/70">Event Website</p>
            <a
              href={promo.eventLink || promo.ticketLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white underline hover:text-white/90"
            >
              {getDomain(promo.eventLink || promo.ticketLink)}
            </a>
          </div>

          {promo.eventLink && (
            <div>
              <p className="text-sm text-white/70">Tickets</p>
              <a
                href={promo.ticketLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white underline hover:text-white/90"
              >
                {getDomain(promo.ticketLink)}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto border-t border-white/20 bg-black/10 p-4">
        <Link
          href={promo.ticketLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-lg bg-white py-2 text-center font-semibold text-purple shadow transition-colors hover:bg-purple hover:text-white"
        >
          {promo.cta}
        </Link>
      </div>
    </div>
  );
}
