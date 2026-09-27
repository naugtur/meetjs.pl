import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, TicketPercent } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Promo } from '@/types/promo';
import { getActivePromos } from '@/utils/promos';
import { getTranslate } from '@/tolgee/server';

interface Props {
  promos: Promo[];
}

export const PromoTicker = async ({ promos }: Props) => {
  const t = await getTranslate();
  const activePromos = getActivePromos(promos);

  if (activePromos.length === 0) return null;

  return (
    <section
      aria-label={t('promo_ticker.label')}
      className="border-y border-white/10 bg-purple text-white"
    >
      <div className="flex items-stretch">
        <Link
          href="/discounts"
          className="z-10 flex shrink-0 items-center gap-2 border-r border-white/10 bg-purple px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/10 sm:px-4"
        >
          <TicketPercent className="h-4 w-4 text-green" aria-hidden />
          <span className="hidden sm:inline">{t('promo_ticker.label')}</span>
        </Link>

        <div className="group relative flex-1 motion-safe:overflow-hidden motion-safe:[mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)] motion-reduce:overflow-x-auto">
          <div
            className="flex w-max items-center group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-safe:animate-marquee"
            style={
              {
                '--marquee-duration': `${Math.max(activePromos.length * 6, 30)}s`,
              } as CSSProperties
            }
          >
            <PromoList promos={activePromos} />
            <PromoList promos={activePromos} duplicated />
          </div>
        </div>

        <Link
          href="/discounts"
          className="z-10 hidden shrink-0 items-center gap-1.5 border-l border-white/10 bg-purple px-4 py-2 text-xs font-semibold transition-colors hover:bg-white/10 sm:flex"
        >
          {t('promo_ticker.view_all')}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
};

const PromoList = ({
  promos,
  duplicated = false,
}: {
  promos: Promo[];
  duplicated?: boolean;
}) => (
  <ul
    aria-hidden={duplicated || undefined}
    className={`flex items-center ${duplicated ? 'motion-reduce:hidden' : ''}`}
  >
    {promos.map((promo) => (
      <li key={promo.id} className="shrink-0">
        <a
          href={promo.ticketLink}
          target="_blank"
          rel="noopener"
          tabIndex={duplicated ? -1 : undefined}
          className="mx-1 flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-xs transition-colors hover:bg-white/15 sm:text-sm"
        >
          <PromoIcon promo={promo} />
          <span className="font-semibold">{promo.name}</span>
          <span className="hidden max-w-64 truncate text-white/75 md:inline">
            {promo.message}
          </span>
          {promo.discountCode && (
            <code className="rounded bg-green/20 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-green">
              {promo.discountCode}
            </code>
          )}
        </a>
      </li>
    ))}
  </ul>
);

const PromoIcon = ({ promo }: { promo: Promo }) => {
  const iconIsUrl =
    typeof promo.icon === 'string' && /^(https?:\/\/|\/)/.test(promo.icon);
  const src = promo.image || (iconIsUrl ? (promo.icon as string) : undefined);

  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={20}
        height={20}
        className="h-4 w-4 object-contain sm:h-5 sm:w-5"
      />
    );
  }
  if (promo.icon) {
    return <span className="text-base sm:text-lg">{promo.icon}</span>;
  }
  if (promo.emojiLeft) {
    return (
      <span className="text-base sm:text-lg" role="img" aria-label="emoji">
        {promo.emojiLeft}
      </span>
    );
  }
  return null;
};
