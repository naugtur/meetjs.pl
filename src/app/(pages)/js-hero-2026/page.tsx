import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Camera,
  ExternalLink,
  MapPin,
  Mic,
  Trophy,
  Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getTranslate } from '@/tolgee/server';
import { env } from '@/env';

const ADRIAN_CROSSWEB_URL =
  'https://crossweb.pl/profile/adrian-romanski/127753/';
const JS_POLAND_URL = 'https://js-poland.pl/';
const ADRIAN_TALK_YOUTUBE_ID = 'EVEzJzkZfzI';

export default async function JSHero2026Page() {
  const t = await getTranslate();
  const pageUrl = `${env.SITE_URL}/js-hero-2026`;
  const shareText = `${t('js_hero_2026.share_tweet_text')} ${pageUrl} #JSPoland #JSAwards2026 #JavaScriptHero #meetjs`;

  return (
    <main className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
      {/* Hero Header */}
      <header className="mb-12 text-center">
        <div className="mb-6 flex justify-center" aria-hidden="true">
          <span className="text-5xl">🏆</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {t('js_hero_2026.title')}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {t('js_hero_2026.subtitle_before')}{' '}
          <span className="font-semibold text-yellow-600">
            {t('js_hero_2026.subtitle_highlight')}
          </span>{' '}
          {t('js_hero_2026.subtitle_after')}
        </p>

        <div className="mt-5 flex justify-center">
          <Badge
            variant="default"
            className="flex items-center gap-1.5 border-yellow-300 bg-yellow-100 px-3 py-1 text-yellow-800 hover:bg-yellow-100"
          >
            <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
            {t('js_hero_2026.badge')}
          </Badge>
        </div>
      </header>

      {/* Photos from JS Poland 2026 */}
      <section
        id="photos"
        aria-labelledby="photos-heading"
        className="my-12 scroll-mt-20"
      >
        <h2
          id="photos-heading"
          className="mb-8 text-center text-3xl font-bold tracking-tight text-yellow-600 sm:text-4xl"
        >
          {t('js_hero_2026.photos_heading')}
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <article className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg">
            <Image
              src="/js-hero-2026/adrian-stage.jpg"
              alt={t('js_hero_2026.photo_stage_alt')}
              width={768}
              height={1024}
              sizes="(min-width: 768px) 420px, 100vw"
              priority
              fetchPriority="high"
              className="aspect-[3/4] w-full object-cover"
            />
            <header className="flex items-center gap-2 px-6 pt-6">
              <Camera
                className="h-5 w-5 shrink-0 text-yellow-600"
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold leading-snug tracking-tight">
                {t('js_hero_2026.photo_stage_title')}
              </h3>
            </header>
            <p className="px-6 pb-6 pt-2 text-muted-foreground">
              {t('js_hero_2026.photo_stage_caption')}
            </p>
          </article>

          <article className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg">
            <Image
              src="/js-hero-2026/js-awards-trophy.jpg"
              alt={t('js_hero_2026.photo_trophy_alt')}
              width={768}
              height={1024}
              sizes="(min-width: 768px) 420px, 100vw"
              className="aspect-[3/4] w-full object-cover"
            />
            <header className="flex items-center gap-2 px-6 pt-6">
              <Award
                className="h-5 w-5 shrink-0 text-yellow-600"
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold leading-snug tracking-tight">
                {t('js_hero_2026.photo_trophy_title')}
              </h3>
            </header>
            <p className="px-6 pb-6 pt-2 text-muted-foreground">
              {t('js_hero_2026.photo_trophy_caption')}
            </p>
          </article>
        </div>
      </section>

      {/* Story Section */}
      <section
        aria-label={t('js_hero_2026.title')}
        className="mb-16 overflow-hidden rounded-xl bg-gradient-to-r from-yellow-500 via-amber-500 to-emerald-500 p-1 shadow-xl"
      >
        <div className="rounded-lg bg-background p-6 sm:p-8">
          <div className="prose prose-lg mx-auto max-w-3xl">
            <p className="lead mb-6 text-xl font-medium">
              {t('js_hero_2026.story_lead_before')}{' '}
              <strong>{t('js_hero_2026.story_lead_name')}</strong>{' '}
              {t('js_hero_2026.story_lead_middle')}{' '}
              <strong className="text-yellow-600">
                {t('js_hero_2026.subtitle_highlight')}
              </strong>{' '}
              {t('js_hero_2026.story_lead_after')}
            </p>

            <p className="mb-6">{t('js_hero_2026.story_p1')}</p>
            <p className="mb-6">{t('js_hero_2026.story_p2')}</p>
            <p>{t('js_hero_2026.story_p3')}</p>
          </div>
        </div>
      </section>

      {/* Highlight Cards */}
      <section
        aria-label={t('js_hero_2026.card_award_title')}
        className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3"
      >
        <article className="flex flex-col rounded-lg border border-yellow-300 bg-yellow-50 text-card-foreground shadow-md">
          <header className="flex items-center gap-2 p-6 pb-2">
            <Trophy
              className="h-5 w-5 shrink-0 text-yellow-600"
              aria-hidden="true"
            />
            <h2 className="text-xl font-semibold leading-tight tracking-tight">
              {t('js_hero_2026.card_award_title')}
            </h2>
          </header>
          <div className="flex-1 p-6 pt-2">
            <p className="text-sm text-muted-foreground">
              {t('js_hero_2026.card_award_description')}
            </p>
            <div className="mt-4 rounded-md border border-yellow-200 bg-white p-3">
              <p className="text-sm font-medium">
                {t('js_hero_2026.card_award_date')}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('js_hero_2026.card_award_location')}
              </p>
            </div>
          </div>
          <footer className="flex flex-col items-start gap-2 p-6 pt-0">
            <a
              href={JS_POLAND_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-800 hover:underline"
            >
              {t('js_hero_2026.card_award_link')}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </footer>
        </article>

        <article className="flex flex-col rounded-lg border border-green-200 bg-card text-card-foreground shadow-md">
          <header className="flex items-center gap-2 p-6 pb-2">
            <MapPin
              className="h-5 w-5 shrink-0 text-green-600"
              aria-hidden="true"
            />
            <h2 className="text-xl font-semibold leading-tight tracking-tight">
              {t('js_hero_2026.card_passport_title')}
            </h2>
          </header>
          <div className="flex-1 p-6 pt-2">
            <p className="text-sm text-muted-foreground">
              {t('js_hero_2026.card_passport_description')}
            </p>
            <div className="mt-4 rounded-md bg-muted p-3">
              <p className="text-sm font-medium">
                {t('js_hero_2026.card_passport_stat_cities')}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t('js_hero_2026.card_passport_stat_bracket')}
              </p>
            </div>
          </div>
          <footer className="flex flex-col items-start gap-2 p-6 pt-0">
            <Link
              href="/passport/adrian-romanski"
              className="inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-800 hover:underline"
            >
              {t('js_hero_2026.card_passport_link')}
            </Link>
            <Link
              href="/passport"
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:underline"
            >
              {t('js_hero_2026.card_passport_hof_link')}
            </Link>
          </footer>
        </article>

        <article className="flex flex-col rounded-lg border border-purple-200 bg-card text-card-foreground shadow-md">
          <header className="flex items-center gap-2 p-6 pb-2">
            <Mic
              className="h-5 w-5 shrink-0 text-purple-600"
              aria-hidden="true"
            />
            <h2 className="text-xl font-semibold leading-tight tracking-tight">
              {t('js_hero_2026.card_community_title')}
            </h2>
          </header>
          <div className="flex-1 p-6 pt-2">
            <p className="text-sm text-muted-foreground">
              {t('js_hero_2026.card_community_description')}
            </p>
          </div>
          <footer className="flex flex-col items-start gap-2 p-6 pt-0">
            <a
              href={ADRIAN_CROSSWEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-800 hover:underline"
            >
              {t('js_hero_2026.card_community_crossweb_link')}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <Link
              href="/speakers"
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:underline"
            >
              {t('js_hero_2026.card_community_speakers_link')}
            </Link>
          </footer>
        </article>
      </section>

      {/* Recorded Talk at meet.js */}
      <section aria-labelledby="talk-heading" className="mb-16">
        <h2
          id="talk-heading"
          className="mb-6 text-center text-2xl font-bold tracking-tight"
        >
          {t('js_hero_2026.talk_heading')}
        </h2>
        <article className="mx-auto max-w-2xl overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${ADRIAN_TALK_YOUTUBE_ID}`}
              title={t('js_hero_2026.talk_title')}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <header className="flex items-center gap-2 px-6 pt-6">
            <Video
              className="h-5 w-5 shrink-0 text-yellow-600"
              aria-hidden="true"
            />
            <h3 className="text-xl font-semibold leading-snug tracking-tight">
              {t('js_hero_2026.talk_title')}
            </h3>
          </header>
          <p className="px-6 pb-6 pt-2 text-muted-foreground">
            {t('js_hero_2026.talk_description')}
          </p>
        </article>
      </section>

      {/* Share Section */}
      <section aria-labelledby="share-heading" className="mb-12 text-center">
        <h2 id="share-heading" className="mb-6 text-center text-2xl font-bold">
          {t('js_hero_2026.share_heading')}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="outline"
            className="border-yellow-300 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900"
            asChild
          >
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('js_hero_2026.share_x')}
            </a>
          </Button>
          <Button
            variant="outline"
            className="border-yellow-300 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900"
            asChild
          >
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('js_hero_2026.share_linkedin')}
            </a>
          </Button>
          <Button
            variant="outline"
            className="border-yellow-300 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900"
            asChild
          >
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('js_hero_2026.share_facebook')}
            </a>
          </Button>
        </div>
      </section>

      {/* Closing Note */}
      <footer className="text-center">
        <p className="text-muted-foreground">
          {t('js_hero_2026.closing_thanks')}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t('js_hero_2026.hashtags')}
        </p>
      </footer>
    </main>
  );
}
