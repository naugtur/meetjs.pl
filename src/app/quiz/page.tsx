import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslate } from '@/tolgee/server';
import { env } from '@/env';
import { QUIZ_CATEGORIES } from './_model/question';
import { getAllQuestions, getLocalDateKey } from './_lib/quizEngine';
import { QuizApp } from './_components/QuizApp';
import { QuizApiSection } from './_components/QuizApiSection';

export const metadata: Metadata = {
  title: 'JavaScript Quiz | meet.js',
  description:
    'Test your JavaScript, TypeScript, async, and Web API knowledge with the daily meet.js challenge, classic quiz runs, and survival streak mode.',
  openGraph: {
    title: 'JavaScript Quiz | meet.js',
    description:
      'Daily 5-question JS challenge, code puzzles with explanations, and an open public JSON API by the meet.js community.',
    url: `${env.SITE_URL}/quiz`,
    siteName: 'meet.js',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JavaScript Quiz | meet.js',
    description:
      'Test your JavaScript & TypeScript skills with the daily meet.js quiz!',
  },
  alternates: {
    canonical: `${env.SITE_URL}/quiz`,
  },
};

export default async function QuizPage() {
  const t = await getTranslate();
  const questions = getAllQuestions();
  const initialDateKey = getLocalDateKey();

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      {/* Branded Hero Banner */}
      <section className="relative overflow-hidden bg-purple py-12 text-white sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #bcd35d 0, transparent 40%), radial-gradient(circle at 80% 80%, #219eab 0, transparent 45%)',
          }}
        />
        <div className="container relative mx-auto max-w-3xl px-4">
          <div className="space-y-4">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold text-green">
              <span className="font-mono">$ npx meetjs-quiz</span>
              <span aria-hidden="true">·</span>
              <span>
                {t('quiz.hero_stats', {
                  questions: questions.length,
                  categories: QUIZ_CATEGORIES.length,
                })}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              {t('quiz.hero_title')}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
              {t('quiz.hero_subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Quiz Workspace */}
      <div className="container mx-auto max-w-3xl px-4 pt-8">
        <Suspense
          fallback={
            <div
              role="status"
              className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="h-6 w-48 rounded bg-slate-200" />
              <div className="h-28 w-full rounded-xl bg-slate-100" />
              <div className="space-y-3">
                <div className="h-12 w-full rounded-xl bg-slate-100" />
                <div className="h-12 w-full rounded-xl bg-slate-100" />
                <div className="h-12 w-full rounded-xl bg-slate-100" />
                <div className="h-12 w-full rounded-xl bg-slate-100" />
              </div>
            </div>
          }
        >
          <QuizApp questions={questions} initialDateKey={initialDateKey} />
        </Suspense>

        <QuizApiSection totalQuestions={questions.length} />
      </div>
    </main>
  );
}
