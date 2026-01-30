'use client';

import { Calendar, MapPin, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslate } from '@tolgee/react';

export const Summit2026Banner = () => {
  const { t } = useTranslate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [eventStatus, setEventStatus] = useState<'upcoming' | 'live' | 'ended'>(
    'upcoming',
  );

  useEffect(() => {
    const eventStartDate = new Date('2026-03-04T09:00:00+02:00').getTime();
    const eventEndDate = new Date('2026-03-04T18:00:00+02:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = eventStartDate - now;

      if (now >= eventEndDate) {
        setEventStatus('ended');
      } else if (now >= eventStartDate) {
        setEventStatus('live');
      } else {
        setEventStatus('upcoming');
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative flex min-h-[60vh] w-full flex-col overflow-hidden bg-cover bg-center py-12 md:min-h-[70vh] md:overflow-hidden md:bg-contain md:py-16"
      style={{ backgroundImage: 'url(/summit-2026-bg.png)' }}
    >
      {/* Lighter overlay matching summit website */}
      <div className="absolute left-0 top-0 h-full w-full bg-black opacity-25"></div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left">
          {/* Anniversary Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span className="text-sm font-semibold text-white">
              {t('summit_2026.anniversary_badge')}
            </span>
            <Sparkles className="h-5 w-5 text-yellow-300" />
          </div>

          {/* Main Title */}
          <h2 className="mb-2 text-4xl font-bold text-white md:text-6xl">
            {t('summit_2026.title')}
          </h2>
          <p className="mb-6 text-xl text-white/90 md:text-2xl">
            15th Anniversary <span className="text-[#75f66d]">AI_devs</span>{' '}
            Edition
          </p>

          {/* Event Details */}
          <div className="mb-8 flex flex-wrap justify-center gap-4 text-white">
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">{t('summit_2026.date')}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">{t('summit_2026.location')}</span>
            </div>
          </div>

          {/* Countdown Timer / Event Status */}
          <div className="mb-8">
            {eventStatus === 'upcoming' && (
              <>
                <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-white/80">
                  {t('summit_2026.countdown_label')}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    { value: timeLeft.days, label: t('summit_2026.days') },
                    { value: timeLeft.hours, label: t('summit_2026.hours') },
                    {
                      value: timeLeft.minutes,
                      label: t('summit_2026.minutes'),
                    },
                    {
                      value: timeLeft.seconds,
                      label: t('summit_2026.seconds'),
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex min-w-[80px] flex-col items-center rounded-lg bg-white/10 p-4 backdrop-blur-sm md:min-w-[100px]"
                    >
                      <span className="text-3xl font-bold text-white md:text-4xl">
                        {String(item.value).padStart(2, '0')}
                      </span>
                      <span className="mt-1 text-xs font-medium uppercase tracking-wide text-white/80">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {eventStatus === 'live' && (
              <div className="space-y-4">
                {/* Large HAPPENING NOW text */}
                <div className="text-center">
                  <div className="mb-3 inline-block animate-pulse rounded-full bg-red-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-red-500/50">
                    🔴 {t('summit_2026.live_badge')}
                  </div>
                  <h3 className="mb-2 text-5xl font-black text-white md:text-6xl">
                    {t('summit_2026.live_title')}
                  </h3>
                  <p className="text-xl text-white/90 md:text-2xl">
                    {t('summit_2026.live_subtitle')}{' '}
                    <span className="text-[#75f66d]">AI_devs</span> Edition
                  </p>
                </div>

                {/* Event details in cards */}
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <p className="text-sm text-white/70">
                      {t('summit_2026.live_location_label')}
                    </p>
                    <p className="font-semibold text-white">
                      {t('summit_2026.live_location')}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <p className="text-sm text-white/70">
                      {t('summit_2026.live_time_label')}
                    </p>
                    <p className="font-semibold text-white">
                      {t('summit_2026.live_time')}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {eventStatus === 'ended' && (
              <div className="rounded-2xl border-2 border-white/20 bg-white/10 px-8 py-8 backdrop-blur-sm">
                <div className="mb-3 text-center text-4xl">🎉</div>
                <p className="mb-2 text-center text-2xl font-bold text-white md:text-3xl">
                  {t('summit_2026.ended_title')}
                </p>
                <p className="mb-4 text-center text-base text-white/80 md:text-lg">
                  {t('summit_2026.ended_subtitle')}
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-sm text-white/70">
                  <span>📹 {t('summit_2026.ended_recordings')}</span>
                  <span>•</span>
                  <span>📸 {t('summit_2026.ended_photos')}</span>
                  <span>•</span>
                  <span>✨ {t('summit_2026.ended_highlights')}</span>
                </div>
                <p className="mt-2 text-center text-xs text-white/60">
                  {t('summit_2026.ended_coming_soon')}
                </p>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href="https://summit.meetjs.pl/2026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-fit rounded-lg bg-[#bcd35d] px-8 py-4 text-base font-bold text-black transition-all hover:bg-[#bcd35d]/90 hover:shadow-lg hover:shadow-[#bcd35d]/20"
            >
              {t('summit_2026.cta_get_tickets')}
            </a>
            <a
              href="https://summit.meetjs.pl/2026#speakers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              {t('summit_2026.cta_view_speakers')}
            </a>
          </div>

          {/* Additional Info */}
          <p className="mt-6 text-sm text-white/70">
            {t('summit_2026.description')}
          </p>
          <p className="mt-2 text-xs font-medium text-white/60">
            🌍 {t('summit_2026.language_note')}
          </p>
        </div>
      </div>
    </div>
  );
};
