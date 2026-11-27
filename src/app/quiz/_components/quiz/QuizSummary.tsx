'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Confetti from 'react-confetti';
import { useReducedMotion } from 'motion/react';
import { useTranslate } from '@tolgee/react';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  RotateCcw,
  Share2,
  XCircle,
} from 'lucide-react';
import { type Question, type QuizMode } from '../../_model/question';
import {
  buildEmojiGrid,
  buildShareText,
  getQuizRank,
} from '../../_lib/quizEngine';
import { InlineCodeText } from '../CodeBlock';

export interface AnsweredItem {
  question: Question;
  selectedOption: number;
  isCorrect: boolean;
}

interface QuizSummaryProps {
  mode: QuizMode;
  score: number;
  total: number;
  answers: readonly AnsweredItem[];
  dayNumber?: number;
  bestStreak?: number;
  onRestart: () => void;
  restartLabel?: string;
}

const subscribeResize = (callback: () => void) => {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};

const getViewportSnapshot = () => `${window.innerWidth}x${window.innerHeight}`;
const getServerViewportSnapshot = () => '0x0';

export const QuizSummary = ({
  mode,
  score,
  total,
  answers,
  dayNumber,
  bestStreak,
  onRestart,
  restartLabel,
}: QuizSummaryProps) => {
  const { t } = useTranslate();
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const viewportKey = useSyncExternalStore(
    subscribeResize,
    getViewportSnapshot,
    getServerViewportSnapshot,
  );
  const [viewportWidth, viewportHeight] = viewportKey.split('x').map(Number);

  const ratio = total > 0 ? score / total : 0;
  const shouldCelebrate =
    !prefersReducedMotion &&
    ((mode === 'survival' && score >= 5) ||
      (mode !== 'survival' && ratio >= 0.7));

  const results = answers.map((item) => item.isCorrect);
  const emojiGrid = buildEmojiGrid(results);
  const rank =
    mode === 'survival'
      ? getQuizRank(Math.min(score, 10), 10)
      : getQuizRank(score, total);

  const shareUrl = `https://meetjs.pl/quiz${mode === 'classic' ? '' : `?mode=${mode}`}`;
  const shareText = buildShareText({
    mode,
    score,
    total,
    results,
    dayNumber,
    url: shareUrl,
  });

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <section className="space-y-6">
      {shouldCelebrate && viewportWidth > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50"
        >
          <Confetti
            width={viewportWidth}
            height={viewportHeight}
            recycle={false}
            numberOfPieces={180}
            colors={['#bcd35d', '#219eab', '#2b1932', '#7c3aed', '#fb923b']}
          />
        </div>
      )}

      <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple/20 bg-purple/5 px-4 py-1.5 text-sm font-semibold text-purple">
          <span aria-hidden="true">{rank.emoji}</span>
          <span>{t(`quiz.ranks.${rank.id}.title`)}</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {mode === 'survival'
              ? t('quiz.survival_score', { score })
              : t('quiz.score_heading', { score, total })}
          </h2>
          <p className="mx-auto max-w-md text-sm text-slate-600 sm:text-base">
            {t(`quiz.ranks.${rank.id}.subtitle`)}
          </p>
          {mode === 'survival' && typeof bestStreak === 'number' && (
            <p className="text-sm font-semibold text-purple">
              {t('quiz.personal_best', { best: bestStreak })}
            </p>
          )}
        </div>

        {emojiGrid && (
          <div className="mx-auto inline-flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3">
            {mode === 'daily' && dayNumber && (
              <span className="font-mono text-xs font-semibold text-slate-600">
                meet.js Daily #{dayNumber}
              </span>
            )}
            <p
              className="text-2xl tracking-widest"
              aria-label={t('quiz.result_grid_aria', { score, total })}
            >
              {emojiGrid}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-purple px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            {copied ? (
              <Check aria-hidden="true" className="h-4 w-4 text-green" />
            ) : (
              <Copy aria-hidden="true" className="h-4 w-4" />
            )}
            <span>{copied ? t('quiz.copied') : t('quiz.copy_result')}</span>
          </button>

          <a
            href={xShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            <Share2 aria-hidden="true" className="h-4 w-4" />
            <span>{t('quiz.share_x')}</span>
          </a>

          <a
            href={linkedInShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0077b5] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#006399] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
            <span>{t('quiz.share_linkedin')}</span>
          </a>

          <button
            type="button"
            onClick={onRestart}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-purple hover:text-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            <span>{restartLabel ?? t('quiz.play_again')}</span>
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          {copied ? t('quiz.copied_announcement') : ''}
        </p>
      </div>

      {/* Expandable Answer Review */}
      {answers.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <h3 className="m-0">
            <button
              type="button"
              aria-expanded={showReview}
              onClick={() => setShowReview((open) => !open)}
              className="flex min-h-12 w-full items-center justify-between px-6 py-4 text-left text-base font-bold text-slate-900 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              <span>{t('quiz.review_answers', { count: answers.length })}</span>
              {showReview ? (
                <ChevronUp
                  aria-hidden="true"
                  className="h-5 w-5 text-slate-500"
                />
              ) : (
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 text-slate-500"
                />
              )}
            </button>
          </h3>

          {showReview && (
            <ol className="divide-y divide-slate-200 border-t border-slate-200">
              {answers.map((item, idx) => (
                <li
                  key={`${item.question.id}-${idx}`}
                  className="space-y-2 p-5"
                >
                  <div className="flex items-start gap-2.5">
                    {item.isCorrect ? (
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-0.5 h-5 w-5 flex-none text-green-700"
                      />
                    ) : (
                      <XCircle
                        aria-hidden="true"
                        className="mt-0.5 h-5 w-5 flex-none text-red-600"
                      />
                    )}
                    <div className="space-y-1.5">
                      <p className="font-semibold text-slate-900">
                        {idx + 1}.{' '}
                        <InlineCodeText text={item.question.question} />
                      </p>
                      <p className="font-mono text-xs text-slate-700">
                        {t('quiz.correct_answer_label')}:{' '}
                        <span className="font-semibold text-green-700">
                          {item.question.options[item.question.correct]}
                        </span>
                        {!item.isCorrect && (
                          <>
                            {' · '}
                            {t('quiz.your_answer_label')}:{' '}
                            <span className="font-semibold text-red-600">
                              {item.question.options[item.selectedOption]}
                            </span>
                          </>
                        )}
                      </p>
                      <p className="text-sm text-slate-600">
                        <InlineCodeText text={item.question.explanation} />
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {/* Community Meetup CTA */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-purple p-6 text-white sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-green">
            {t('quiz.meetup_cta_title')}
          </h3>
          <p className="text-sm text-slate-200">
            {t('quiz.meetup_cta_description')}
          </p>
        </div>
        <Link
          href="/events"
          className="inline-flex min-h-11 flex-none items-center gap-2 rounded-xl bg-green px-5 py-2.5 text-sm font-bold text-purple transition-colors hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
        >
          <span>{t('quiz.meetup_cta_button')}</span>
        </Link>
      </div>
    </section>
  );
};
