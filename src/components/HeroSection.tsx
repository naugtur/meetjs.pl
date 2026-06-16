'use client';

import { RankingBanner } from '@/components/RankingBanner';
import { AwardNomination } from '@/components/AwardNomination';
import {
  Instagram,
  MessagesSquare,
} from 'lucide-react';
import { useTranslate } from '@tolgee/react';

export const HeroSection = () => {
  const { t } = useTranslate();

  return (
    <header className="relative grid min-h-[60vh] bg-[url('/conference.jpg')] bg-cover text-center text-white md:min-h-[70vh]">
      <div className="col-start-1 row-start-1 h-full w-full bg-gray-800 bg-opacity-70"></div>

      <RankingBanner
        href="https://crossweb.pl/blog/ranking-najpopularniejsze-wydarzenia-i-cykle-wydarzen-w-crossweb-w-2025/"
        text={`🏆 ${t('hero.ranking_banner')}`}
      />

      <div className="col-start-1 row-start-1 mx-auto my-auto">
        <h1 className="-rotate-2 bg-blue p-2 text-6xl font-bold">
          {t('hero.title')}
        </h1>
        <h2 className="p-4 text-xl font-medium">{t('hero.subtitle')}</h2>

        {/* Social links */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            href="https://instagram.com/meet.js_poland"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-sm transition-all hover:bg-white/30"
          >
            <Instagram className="h-4 w-4" />
            {t('hero.follow_us')}
          </a>
          <a
            href="https://discord.gg/8r9XKTeNW8"
            target="_blank"
            rel="noopener"
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
