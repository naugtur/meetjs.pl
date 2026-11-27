'use client';

import { useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { Check, Code2, Copy, GitPullRequest, PlusCircle } from 'lucide-react';
import { buildGitHubSuggestUrl } from '../_lib/quizEngine';

const API_SNIPPET = `const url = 'https://meetjs.pl/api/quiz/questions';
const res = await fetch(\`\${url}?category=js-quirks\`);
const { questions } = await res.json();`;

interface QuizApiSectionProps {
  totalQuestions: number;
}

export const QuizApiSection = ({ totalQuestions }: QuizApiSectionProps) => {
  const { t } = useTranslate();
  const [copied, setCopied] = useState(false);

  const handleCopySnippet = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(API_SNIPPET);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      aria-labelledby="quiz-community-heading"
      className="mt-12 grid gap-6 md:grid-cols-2"
    >
      <h2 id="quiz-community-heading" className="sr-only">
        {t('quiz.community_section_heading')}
      </h2>

      {/* Contribute a question */}
      <div className="flex min-w-0 flex-col justify-between space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple/10 text-purple">
            <PlusCircle aria-hidden="true" className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {t('quiz.contribute_title')}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600">
            {t('quiz.contribute_description', { count: totalQuestions })}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={buildGitHubSuggestUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-purple px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            <PlusCircle aria-hidden="true" className="h-4 w-4" />
            <span>{t('quiz.suggest_question_cta')}</span>
          </a>
          <a
            href="https://github.com/naugtur/meetjs.pl/blob/main/src/data/quiz/questions.json"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-purple hover:text-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            <GitPullRequest aria-hidden="true" className="h-4 w-4" />
            <span>{t('quiz.edit_json_cta')}</span>
          </a>
        </div>
      </div>

      {/* Public Quiz API */}
      <div className="flex min-w-0 flex-col justify-between space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="min-w-0 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue/15 text-[#146c76]">
              <Code2 aria-hidden="true" className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-green/25 px-3 py-1 font-mono text-xs font-semibold text-purple">
              CORS · JSON
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {t('quiz.api_title')}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600">
            {t('quiz.api_description')}
          </p>

          <div className="relative overflow-hidden rounded-xl bg-[#1a1021] p-3.5 pr-12">
            <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
              <code>{API_SNIPPET}</code>
            </pre>
            <button
              type="button"
              onClick={handleCopySnippet}
              aria-label={t('quiz.copy_api_snippet')}
              className="absolute right-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-slate-200 transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
            >
              {copied ? (
                <Check aria-hidden="true" className="h-4 w-4 text-green" />
              ) : (
                <Copy aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <a
            href="/api/quiz/questions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple underline decoration-purple/40 underline-offset-4 hover:decoration-purple"
          >
            /api/quiz/questions
          </a>
          <a
            href="/api/quiz/questions/random"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple underline decoration-purple/40 underline-offset-4 hover:decoration-purple"
          >
            /api/quiz/questions/random
          </a>
        </div>
      </div>
    </section>
  );
};
