'use client';

import { useTranslate } from '@tolgee/react';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Flag,
  XCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  type Question,
  type QuizCategory,
  type QuizDifficulty,
} from '../_model/question';
import { buildGitHubReportUrl } from '../_lib/quizEngine';
import { CodeBlock, InlineCodeText } from './CodeBlock';

const DIFFICULTY_STYLES: Record<QuizDifficulty, string> = {
  junior: 'bg-emerald-500/15 text-green-700 border-emerald-500/30',
  mid: 'bg-blue/15 text-[#146c76] border-blue/30',
  senior: 'bg-purple/10 text-purple border-purple/25',
  wtf: 'bg-pink/15 text-pink-600 border-pink/30',
};

const CATEGORY_LANGUAGE: Record<QuizCategory, string> = {
  'js-quirks': 'js',
  'async-event-loop': 'js',
  'modern-js': 'js',
  typescript: 'ts',
  'web-apis': 'js',
  'js-history': 'js',
};

interface QuestionCardProps {
  question: Question;
  selectedOption: number | null;
  onSelectOption: (optionIndex: number) => void;
  onNext: () => void;
  isLastQuestion?: boolean;
  nextLabel?: string;
}

export const QuestionCard = ({
  question,
  selectedOption,
  onSelectOption,
  onNext,
  isLastQuestion = false,
  nextLabel,
}: QuestionCardProps) => {
  const { t } = useTranslate();
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === question.correct;

  return (
    <motion.article
      key={question.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
    >
      {/* Metadata badges */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {t(`quiz.categories.${question.category}`)}
          </span>
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${DIFFICULTY_STYLES[question.difficulty]}`}
          >
            {t(`quiz.difficulties.${question.difficulty}`)}
          </span>
        </div>
        {question.author && (
          <span className="text-xs text-slate-500">@{question.author}</span>
        )}
      </div>

      {/* Question heading */}
      <h2 className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
        <InlineCodeText text={question.question} />
      </h2>

      {/* Optional code snippet */}
      {question.code && (
        <CodeBlock
          code={question.code}
          language={CATEGORY_LANGUAGE[question.category]}
        />
      )}

      {/* Answer options */}
      <div
        className="space-y-3"
        role="group"
        aria-label={t('quiz.options_aria_label')}
      >
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrectOption = index === question.correct;

          let stateClasses =
            'border-slate-200 bg-white text-slate-900 hover:border-purple-600 hover:bg-purple/5';
          if (isAnswered) {
            if (isCorrectOption) {
              stateClasses =
                'border-green-700 bg-emerald-500/15 text-slate-900 ring-1 ring-green-700/30';
            } else if (isSelected && !isCorrectOption) {
              stateClasses =
                'border-red-600 bg-red/10 text-slate-900 ring-1 ring-red-600/30';
            } else {
              stateClasses =
                'border-slate-200 bg-slate-50 text-slate-500 opacity-75';
            }
          }

          return (
            <button
              key={index}
              type="button"
              aria-disabled={isAnswered}
              onClick={() => {
                if (!isAnswered) onSelectOption(index);
              }}
              className={`group flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 ${stateClasses} ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-md border font-mono text-xs font-bold ${
                    isAnswered && isCorrectOption
                      ? 'border-green-700 bg-green-700 text-white'
                      : isAnswered && isSelected
                        ? 'border-red-600 bg-red-600 text-white'
                        : 'border-slate-300 bg-slate-100 text-slate-600 group-hover:border-purple-600 group-hover:text-purple'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="font-mono text-sm leading-relaxed sm:text-base">
                  {option}
                </span>
              </span>

              {isAnswered && isCorrectOption && (
                <CheckCircle2
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-green-700"
                />
              )}
              {isAnswered && isSelected && !isCorrectOption && (
                <XCircle
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-red-600"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Live region for answer feedback + explanation */}
      <div aria-live="polite" aria-atomic="true">
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className={`space-y-4 rounded-xl border p-4 sm:p-5 ${
              isCorrect
                ? 'border-emerald-500/40 bg-emerald-500/10'
                : 'border-red/30 bg-red/5'
            }`}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2
                  aria-hidden="true"
                  className="h-5 w-5 text-green-700"
                />
              ) : (
                <XCircle aria-hidden="true" className="h-5 w-5 text-red-600" />
              )}
              <p
                className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-600'}`}
              >
                {isCorrect
                  ? t('quiz.feedback_correct')
                  : t('quiz.feedback_incorrect')}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-slate-800 sm:text-base">
              <InlineCodeText text={question.explanation} />
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
                {question.docsUrl && (
                  <a
                    href={question.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-purple underline decoration-purple/40 underline-offset-4 hover:decoration-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                  >
                    <span>{t('quiz.read_docs')}</span>
                    <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                )}
                <a
                  href={buildGitHubReportUrl(question)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  <Flag aria-hidden="true" className="h-3.5 w-3.5" />
                  <span>{t('quiz.report_issue')}</span>
                </a>
              </div>

              <button
                type="button"
                onClick={onNext}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-purple px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                <span>
                  {nextLabel ??
                    (isLastQuestion
                      ? t('quiz.see_results')
                      : t('quiz.next_question'))}
                </span>
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Subtle keyboard hint */}
      <p className="hidden text-xs text-slate-500 sm:block">
        {isAnswered
          ? t('quiz.keyboard_hint_next')
          : t('quiz.keyboard_hint_select')}
      </p>
    </motion.article>
  );
};
