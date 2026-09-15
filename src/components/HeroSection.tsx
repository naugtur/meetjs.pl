'use client';

import { RankingBanner } from '@/components/RankingBanner';
import { AwardNomination } from '@/components/AwardNomination';
import { Instagram, MessagesSquare } from 'lucide-react';
import { useTranslate } from '@tolgee/react';
import Link from 'next/link';
import { OrganizerLink } from '@/components/OrganizerLink';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const HeroSection = () => {
  const { t } = useTranslate();

  return (
    <header className="relative grid min-h-[60vh] bg-[url('/conference.jpg')] bg-cover text-center text-white md:min-h-[70vh]">
      <div className="col-start-1 row-start-1 h-full w-full bg-gray-800 bg-opacity-70"></div>

      <RankingBanner
        href="https://crossweb.pl/blog/ranking-najpopularniejsze-wydarzenia-i-cykle-wydarzen-w-crossweb-w-2025/"
        text={`🏆 ${t('hero.ranking_banner')}`}
      />

      <div className="col-start-1 row-start-1 mx-auto my-auto w-full max-w-3xl px-5 py-12 md:pt-20">
        <h1 className="mx-auto w-fit -rotate-2 bg-blue px-8 py-2 text-5xl font-bold sm:text-6xl">
          {t('hero.title')}
        </h1>
        <p className="mt-5 text-balance text-xl font-semibold">
          {t('hero.subtitle')}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-white/90 sm:text-base">
          {t('hero.description')}
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/events"
            className={cn(
              buttonVariants(),
              'h-auto min-h-11 whitespace-normal bg-green px-6 py-3 text-purple hover:bg-green/80',
            )}
          >
            {t('hero.cta')}
          </Link>
          <OrganizerLink
            source="hero"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'h-auto min-h-11 whitespace-normal border-white/70 bg-white/10 px-6 py-3 text-white hover:bg-white hover:text-purple',
            )}
          >
            {t('hero.organize_cta')}
          </OrganizerLink>
        </div>

        {/* Social links */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            href="https://instagram.com/meet.js_poland"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            <Instagram className="h-4 w-4" />
            {t('hero.follow_us')}
          </a>
          <a
            href="https://discord.gg/8r9XKTeNW8"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 rounded-full bg-[#5865F2] px-4 py-2 text-sm transition-colors hover:bg-[#4752C4] hover:shadow-md"
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
