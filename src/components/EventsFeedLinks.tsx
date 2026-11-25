'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Calendar, CalendarPlus, Check, Code2, Copy } from 'lucide-react';
import { useTranslate } from '@tolgee/react';

interface EventsFeedLinksProps {
  city?: string | null;
  siteUrl?: string;
}

type CopyState = 'idle' | 'copied' | 'failed';

export const EventsFeedLinks = ({ city, siteUrl }: EventsFeedLinksProps) => {
  const { t } = useTranslate();
  const urlInputId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastAnnouncementRef = useRef('');

  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const query = city ? `?city=${encodeURIComponent(city)}` : '';
  const icsPath = `/api/events.ics${query}`;
  const jsonPath = `/api/events${query}`;

  const baseOrigin =
    siteUrl?.replace(/\/$/, '') ||
    (typeof window !== 'undefined'
      ? window.location.origin
      : 'https://meetjs.pl');
  const subscribeUrl = `${baseOrigin}${icsPath}`;
  const webcalUrl = subscribeUrl.replace(/^https?:\/\//, 'webcal://');
  const googleCalendarUrl = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcalUrl)}`;

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const announce = (ok: boolean) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setCopyState(ok ? 'copied' : 'failed');

      let message = ok
        ? t('events_page.feeds.copied')
        : t('events_page.feeds.copy_failed');
      // VoiceOver skips identical consecutive status updates; append NBSP so repeat clicks announce
      if (message === lastAnnouncementRef.current) {
        message += '\u00A0';
      }
      lastAnnouncementRef.current = message;
      setStatusMessage(message);

      timerRef.current = setTimeout(() => {
        setCopyState('idle');
        setStatusMessage('');
      }, 2_000);
    };

    const runCopy = async (target: HTMLElement | null) => {
      const text =
        target instanceof HTMLInputElement
          ? target.value
          : target?.textContent?.trim();
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        announce(true);
      } catch {
        announce(false);
      }
    };

    // Register either native Invoker Commands or click fallback — never both
    if ('CommandEvent' in window) {
      const onCommand = (event: Event) => {
        const cmdEvent = event as Event & {
          command?: string;
          source?: EventTarget | null;
        };
        if (cmdEvent.source === button && cmdEvent.command === '--copy') {
          void runCopy(event.target as HTMLElement | null);
        }
      };
      document.addEventListener('command', onCommand, true);
      return () => {
        document.removeEventListener('command', onCommand, true);
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const targetId = button.getAttribute('commandfor');
      const target = targetId ? document.getElementById(targetId) : null;
      void runCopy(target);
    };
    button.addEventListener('click', onClick);
    return () => {
      button.removeEventListener('click', onClick);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [t]);

  const subscribeLabel = city
    ? t('events_page.feeds.subscribe_city_calendar', { city })
    : t('events_page.feeds.subscribe_calendar');

  const invokerAttrs = {
    command: '--copy',
    commandfor: urlInputId,
  } as Record<string, string>;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
      <a
        href={webcalUrl}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-purple px-3.5 py-1.5 font-medium text-white transition-colors hover:bg-purple/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
      >
        <CalendarPlus aria-hidden="true" className="h-4 w-4 shrink-0" />
        <span>{subscribeLabel}</span>
      </a>

      <a
        href={googleCalendarUrl}
        target="_blank"
        rel="noopener"
        className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-800 transition-colors hover:border-purple hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
      >
        <Calendar aria-hidden="true" className="h-4 w-4 shrink-0" />
        <span>{t('events_page.feeds.google_calendar')}</span>
      </a>

      <span className="relative inline-flex items-center gap-1.5">
        <button
          ref={buttonRef}
          type="button"
          {...invokerAttrs}
          data-copied={copyState === 'copied' ? '' : undefined}
          data-failed={copyState === 'failed' ? '' : undefined}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-800 transition-colors hover:border-purple hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
        >
          {copyState === 'copied' ? (
            <Check
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-emerald-700"
            />
          ) : (
            <Copy aria-hidden="true" className="h-4 w-4 shrink-0" />
          )}
          <span>{t('events_page.feeds.copy_subscribe_url')}</span>
        </button>

        <span
          role="status"
          aria-live="polite"
          className={`pointer-events-none rounded-md px-2 py-1 text-xs font-medium transition-opacity duration-150 ${
            statusMessage
              ? copyState === 'failed'
                ? 'bg-red-100 text-red-800 opacity-100'
                : 'bg-green/40 text-purple opacity-100'
              : 'sr-only opacity-0'
          }`}
        >
          {statusMessage}
        </span>
      </span>

      <input
        id={urlInputId}
        type="text"
        readOnly
        value={subscribeUrl}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
      />

      <a
        href={jsonPath}
        target="_blank"
        rel="noopener"
        className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-800 transition-colors hover:border-purple hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
      >
        <Code2 aria-hidden="true" className="h-4 w-4 shrink-0" />
        <span>{t('events_page.feeds.json_api')}</span>
      </a>
    </div>
  );
};
