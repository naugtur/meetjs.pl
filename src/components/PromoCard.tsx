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

export function PromoCard(props: PromoCardProps) {
  const promo = props.promo;
  const expiryDate = formatDate(promo.expiresAt);

  return (
    <div
      class={`relative flex flex-col overflow-hidden rounded-xl border-2 border-purple ${promo.gradient || 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-500'} shadow-lg transition-transform hover:scale-[1.01]`}
    >
      <div class="flex items-center gap-3 border-b border-white/20 p-4">
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl">
          {promo.icon || '🎟️'}
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-bold text-white drop-shadow-md">
            {promo.name}
          </h3>
          <p class="text-sm text-white/80 drop-shadow-sm">{promo.message}</p>
        </div>
      </div>

      <div class="flex-1 p-4 text-white">
        {promo.description && (
          <div class="mb-4">
            <p class="text-sm text-white/70">About</p>
            <p class="text-sm leading-relaxed">{promo.description}</p>
          </div>
        )}

        <div class="mb-4 grid grid-cols-2 gap-4">
          {promo.city && promo.country && (
            <div>
              <p class="text-sm text-white/70">Location</p>
              <div class="flex items-center gap-1">
                <span class="font-medium">{promo.city}</span>
                <span class="text-white/70">•</span>
                <div class="flex items-center gap-1">
                  <span class="font-medium">{promo.country}</span>
                  <span role="img" aria-label={promo.country}>
                    {promo.emojiRight}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div>
            <p class="text-sm text-white/70">Valid Until</p>
            <p class="font-medium">{expiryDate}</p>
          </div>
        </div>

        <div class="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div>
            <p class="text-sm text-white/70">Event Website</p>
            <a
              href={promo.eventLink || promo.ticketLink}
              target="_blank"
              rel="noopener"
              class="font-medium text-white underline hover:text-white/90"
            >
              {getDomain(promo.eventLink || promo.ticketLink)}
            </a>
          </div>

          {promo.eventLink && (
            <div>
              <p class="text-sm text-white/70">Tickets</p>
              <a
                href={promo.ticketLink}
                target="_blank"
                rel="noopener"
                class="font-medium text-white underline hover:text-white/90"
              >
                {getDomain(promo.ticketLink)}
              </a>
            </div>
          )}
        </div>
      </div>

      <div class="mt-auto border-t border-white/20 bg-black/10 p-4">
        {promo.ticketLink ? (
          <a
            href={promo.ticketLink}
            target="_blank"
            rel="noopener"
            class="block w-full rounded-lg bg-white py-2 text-center font-semibold text-purple shadow transition-colors hover:bg-purple hover:text-white"
          >
            {promo.cta}
          </a>
        ) : (
          <span class="block w-full rounded-lg bg-white/60 py-2 text-center font-semibold text-purple opacity-60">
            {promo.cta}
          </span>
        )}
      </div>
    </div>
  );
}
