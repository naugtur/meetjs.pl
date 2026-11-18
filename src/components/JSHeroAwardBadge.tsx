'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslate } from '@tolgee/react';

export const JSHeroAwardBadge = () => {
  const { t } = useTranslate();

  return (
    <Link
      href="/js-hero-2026"
      className="group relative inline-flex h-[85px] items-center gap-3.5 rounded-2xl border border-yellow-400/60 bg-gradient-to-br from-[#2b1932]/90 via-gray-900/90 to-black/90 px-4 pr-5 text-left shadow-[0_0_24px_rgba(234,179,8,0.28)] backdrop-blur-md transition-[border-color,box-shadow,transform] duration-300 hover:border-yellow-300 hover:shadow-[0_0_32px_rgba(234,179,8,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 motion-safe:hover:scale-105"
    >
      {/* Clipped metallic sheen overlay inside the badge card (separate from focus ring) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      >
        <span className="trophy-sheen-layer absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent" />
        <span className="trophy-sheen-hover absolute inset-y-0 left-0 w-1/2 -translate-x-[160%] skew-x-[-22deg] bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0" />
      </span>

      {/* Cutout JS Awards 2026 trophy with warm golden aura and silhouette-masked gleam */}
      <span className="relative -my-3 flex h-[96px] w-[54px] shrink-0 items-center justify-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-1 rounded-full bg-yellow-400/35 blur-md transition-opacity duration-300 group-hover:opacity-100"
        />
        <Image
          src="/js-hero-2026/trophy-icon.png"
          alt={t('js_hero_2026.badge_trophy_alt')}
          width={180}
          height={320}
          sizes="54px"
          className="relative h-[96px] w-[54px] object-contain drop-shadow-[0_4px_12px_rgba(234,179,8,0.55)] transition-transform duration-300 motion-safe:group-hover:-rotate-2 motion-safe:group-hover:scale-105"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            maskImage: "url('/js-hero-2026/trophy-icon.png')",
            WebkitMaskImage: "url('/js-hero-2026/trophy-icon.png')",
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
          }}
        >
          <span className="trophy-sheen-layer absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-transparent via-white/75 to-transparent" />
          <span className="trophy-sheen-hover absolute inset-y-0 left-0 w-2/3 -translate-x-[160%] skew-x-[-22deg] bg-gradient-to-r from-transparent via-white/85 to-transparent opacity-0" />
        </span>
      </span>

      {/* Award label */}
      <span className="relative z-10 flex flex-col">
        <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-300">
          {t('js_hero_2026.badge_eyebrow')}
        </span>
        <span className="text-lg font-extrabold leading-tight text-white">
          {t('js_hero_2026.badge_title')}
        </span>
        <span className="text-xs font-medium text-yellow-100/90">
          {t('js_hero_2026.badge_recipient')}
        </span>
      </span>
    </Link>
  );
};
