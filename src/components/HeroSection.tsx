import { RankingBanner } from '@/components/RankingBanner';
import { AwardNomination } from '@/components/AwardNomination';
import { Instagram, MessagesSquare, Sparkles } from 'lucide-react';
import { getTranslate } from '@/tolgee/server';
import Link from 'next/link';
import type { Route } from 'next';

export const HeroSection = async () => {
  const t = await getTranslate();
  return (
    <header className="relative grid h-96 bg-[url('/conference.jpg')] bg-cover text-center text-white md:h-[35rem]">
      <div className="col-start-1 row-start-1 h-full w-full bg-gray-800 bg-opacity-70"></div>

      <RankingBanner
        href="https://crossweb.pl/blog/ranking-najpopularniejsze-wydarzenia-podcasty-wideo-cykle-w-crossweb-w-2024/"
        text={`🏆 ${t('hero.ranking_banner')}`}
      />

      <div className="col-start-1 row-start-1 mx-auto my-auto">
        <h1 className="-rotate-2 bg-blue p-2 text-6xl font-bold">
          {t('hero.title')}
        </h1>
        <h2 className="p-4 text-xl font-medium">{t('hero.subtitle')}</h2>

        {/* 2025 Wrapped - Standalone prominent button */}
        <div className="mt-6">
          <Link
            href={'/2025-review' as Route}
            className="inline-flex animate-[pulse-scale_2s_ease-in-out_infinite] items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-6 py-3 text-base font-bold shadow-lg shadow-purple-500/30 transition-all hover:scale-110 hover:animate-none hover:shadow-xl hover:shadow-pink-500/40"
          >
            <Sparkles className="h-5 w-5" />
            {t('hero.2025_wrapped')}
            <span className="ml-1">→</span>
          </Link>
        </div>

        {/* Social links - separate row */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            href="https://instagram.com/meet.js_poland"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-sm transition-all hover:bg-white/30"
          >
            <Instagram className="h-4 w-4" />
            {t('hero.follow_us')}
          </a>
          <a
            href="https://discord.gg/8r9XKTeNW8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#5865F2] px-4 py-2 text-sm transition-all hover:bg-[#4752C4] hover:shadow-md"
          >
            <MessagesSquare className="h-4 w-4" />
            {t('hero.join_discord')}
          </a>
        </div>

        <AwardNomination />
      </div>
    </header>
  );
};
