'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { useSearchParams } from 'next/navigation';
import { MotionConfig } from 'motion/react';
import { useTranslate } from '@tolgee/react';
import {
  CalendarDays,
  Flame,
  Heart,
  Layers,
  Shuffle,
  SlidersHorizontal,
} from 'lucide-react';
import {
  QUIZ_CATEGORIES,
  QUIZ_DIFFICULTIES,
  type Question,
  type QuizCategory,
  type QuizDifficulty,
  type QuizMode,
} from '../_model/question';
import {
  createClassicRun,
  createSeededRng,
  filterQuestions,
  getDailyChallenge,
  getLocalDateKey,
  hashStringToSeed,
  prepareQuestionForRun,
  shuffleArray,
} from '../_lib/quizEngine';
import { QuestionCard } from './QuestionCard';
import { type AnsweredItem, QuizSummary } from './quiz/QuizSummary';

const MODES: readonly QuizMode[] = ['daily', 'classic', 'survival'];
const CLASSIC_COUNTS = [5, 10, 0] as const; // 0 = All matching
const SURVIVAL_MAX_LIVES = 3;

const DAILY_STORAGE_KEY = 'meetjs_quiz_daily_v1';
const SURVIVAL_BEST_STORAGE_KEY = 'meetjs_quiz_survival_best_v1';

interface SavedDailyResult {
  dateKey: string;
  score: number;
  total: number;
  selectedOptions: number[];
}

function readSavedDaily(dateKey: string): SavedDailyResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(DAILY_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavedDailyResult>;
    if (
      parsed.dateKey === dateKey &&
      typeof parsed.score === 'number' &&
      typeof parsed.total === 'number' &&
      Array.isArray(parsed.selectedOptions)
    ) {
      return parsed as SavedDailyResult;
    }
  } catch {
    // Ignore corrupt localStorage entries
  }
  return null;
}

function writeSavedDaily(result: SavedDailyResult): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(result));
  } catch {
    // Ignore storage quota errors
  }
}

function readBestStreak(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = window.localStorage.getItem(SURVIVAL_BEST_STORAGE_KEY);
    const parsed = raw ? Number(raw) : 0;
    return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0;
  } catch {
    return 0;
  }
}

function writeBestStreak(streak: number): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SURVIVAL_BEST_STORAGE_KEY, String(streak));
  } catch {
    // Ignore storage quota errors
  }
}

const emptySubscribe = () => () => {};

function isValidMode(value: string | null): value is QuizMode {
  return value === 'daily' || value === 'classic' || value === 'survival';
}

interface QuizAppProps {
  questions: readonly Question[];
  initialDateKey: string;
}

export const QuizApp = ({ questions, initialDateKey }: QuizAppProps) => {
  const { t } = useTranslate();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode');

  const todayDateKey = useSyncExternalStore(
    emptySubscribe,
    () => getLocalDateKey(),
    () => initialDateKey,
  );

  const [mode, setMode] = useState<QuizMode>(() =>
    isValidMode(modeParam) ? modeParam : 'daily',
  );

  // Tab refs for roving focus keyboard support
  const tabRefs = useRef<Record<QuizMode, HTMLButtonElement | null>>({
    daily: null,
    classic: null,
    survival: null,
  });

  // --- Daily Mode State ---
  const dailyChallenge = useMemo(
    () => getDailyChallenge(questions, todayDateKey),
    [questions, todayDateKey],
  );
  const [dailyPracticeOverride, setDailyPracticeOverride] = useState(false);
  const [dailyIndex, setDailyIndex] = useState(0);
  const [dailySelected, setDailySelected] = useState<number | null>(null);
  const [dailyAnswers, setDailyAnswers] = useState<AnsweredItem[]>([]);
  const [dailyCompleted, setDailyCompleted] = useState(false);

  const savedDaily = useSyncExternalStore(
    emptySubscribe,
    () => {
      const saved = readSavedDaily(todayDateKey);
      return saved ? JSON.stringify(saved) : null;
    },
    () => null,
  );

  const hydratedSavedDaily: SavedDailyResult | null = useMemo(() => {
    if (!savedDaily) return null;
    try {
      return JSON.parse(savedDaily) as SavedDailyResult;
    } catch {
      return null;
    }
  }, [savedDaily]);

  const showSavedDailySummary =
    !dailyPracticeOverride && !dailyCompleted && hydratedSavedDaily !== null;

  const savedDailyAnswers: AnsweredItem[] = useMemo(() => {
    if (!hydratedSavedDaily) return [];
    return dailyChallenge.questions.map((question, idx) => {
      const selectedOption = hydratedSavedDaily.selectedOptions[idx] ?? -1;
      return {
        question,
        selectedOption,
        isCorrect: selectedOption === question.correct,
      };
    });
  }, [dailyChallenge.questions, hydratedSavedDaily]);

  // --- Classic Mode State ---
  const [classicCategory, setClassicCategory] = useState<QuizCategory | 'all'>(
    'all',
  );
  const [classicDifficulty, setClassicDifficulty] = useState<
    QuizDifficulty | 'all'
  >('all');
  const [classicCount, setClassicCount] = useState<number>(10);
  const [classicQuestions, setClassicQuestions] = useState<Question[]>(() =>
    createClassicRun(questions, {
      count: 10,
      rng: createSeededRng(hashStringToSeed(`classic-init:${initialDateKey}`)),
    }),
  );
  const [classicIndex, setClassicIndex] = useState(0);
  const [classicSelected, setClassicSelected] = useState<number | null>(null);
  const [classicAnswers, setClassicAnswers] = useState<AnsweredItem[]>([]);
  const [classicCompleted, setClassicCompleted] = useState(false);

  const classicMatchingCount = useMemo(
    () =>
      filterQuestions(questions, {
        category: classicCategory,
        difficulty: classicDifficulty,
      }).length,
    [questions, classicCategory, classicDifficulty],
  );

  const startClassicRun = useCallback(
    (
      category: QuizCategory | 'all' = classicCategory,
      difficulty: QuizDifficulty | 'all' = classicDifficulty,
      count: number = classicCount,
    ) => {
      const nextQuestions = createClassicRun(questions, {
        category,
        difficulty,
        count: count === 0 ? undefined : count,
      });
      setClassicQuestions(nextQuestions);
      setClassicIndex(0);
      setClassicSelected(null);
      setClassicAnswers([]);
      setClassicCompleted(false);
    },
    [questions, classicCategory, classicDifficulty, classicCount],
  );

  // --- Survival Mode State ---
  const [survivalQueue, setSurvivalQueue] = useState<Question[]>(() => {
    const rng = createSeededRng(
      hashStringToSeed(`survival-init:${initialDateKey}`),
    );
    return shuffleArray(questions, rng).map((q) =>
      prepareQuestionForRun(q, rng),
    );
  });
  const [survivalIndex, setSurvivalIndex] = useState(0);
  const [survivalSelected, setSurvivalSelected] = useState<number | null>(null);
  const [survivalAnswers, setSurvivalAnswers] = useState<AnsweredItem[]>([]);
  const [survivalLives, setSurvivalLives] = useState(SURVIVAL_MAX_LIVES);
  const [survivalStreak, setSurvivalStreak] = useState(0);
  const [survivalCompleted, setSurvivalCompleted] = useState(false);
  const storedBestStreak = useSyncExternalStore(
    emptySubscribe,
    () => readBestStreak(),
    () => 0,
  );
  const [sessionBestStreak, setSessionBestStreak] = useState(0);
  const bestStreak = Math.max(storedBestStreak, sessionBestStreak);

  const restartSurvival = useCallback(() => {
    const nextQueue = shuffleArray(questions).map((q) =>
      prepareQuestionForRun(q),
    );
    setSurvivalQueue(nextQueue);
    setSurvivalIndex(0);
    setSurvivalSelected(null);
    setSurvivalAnswers([]);
    setSurvivalLives(SURVIVAL_MAX_LIVES);
    setSurvivalStreak(0);
    setSurvivalCompleted(false);
  }, [questions]);

  const restartDaily = useCallback(() => {
    setDailyPracticeOverride(true);
    setDailyIndex(0);
    setDailySelected(null);
    setDailyAnswers([]);
    setDailyCompleted(false);
  }, []);

  // --- Active question helpers ---
  const activeQuestion: Question | null = useMemo(() => {
    if (mode === 'daily') {
      if (dailyCompleted || showSavedDailySummary) return null;
      return dailyChallenge.questions[dailyIndex] ?? null;
    }
    if (mode === 'classic') {
      if (classicCompleted) return null;
      return classicQuestions[classicIndex] ?? null;
    }
    if (survivalCompleted) return null;
    return survivalQueue[survivalIndex] ?? null;
  }, [
    mode,
    dailyCompleted,
    showSavedDailySummary,
    dailyChallenge.questions,
    dailyIndex,
    classicCompleted,
    classicQuestions,
    classicIndex,
    survivalCompleted,
    survivalQueue,
    survivalIndex,
  ]);

  const activeSelectedOption =
    mode === 'daily'
      ? dailySelected
      : mode === 'classic'
        ? classicSelected
        : survivalSelected;

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      if (!activeQuestion) return;
      const isCorrect = optionIndex === activeQuestion.correct;

      if (mode === 'daily') {
        if (dailySelected !== null) return;
        setDailySelected(optionIndex);
        const nextAnswers: AnsweredItem[] = [
          ...dailyAnswers,
          { question: activeQuestion, selectedOption: optionIndex, isCorrect },
        ];
        setDailyAnswers(nextAnswers);
        if (
          dailyIndex + 1 >= dailyChallenge.questions.length &&
          !dailyPracticeOverride
        ) {
          const score = nextAnswers.filter((a) => a.isCorrect).length;
          writeSavedDaily({
            dateKey: todayDateKey,
            score,
            total: dailyChallenge.questions.length,
            selectedOptions: nextAnswers.map((a) => a.selectedOption),
          });
        }
        return;
      }

      if (mode === 'classic') {
        if (classicSelected !== null) return;
        setClassicSelected(optionIndex);
        setClassicAnswers((prev) => [
          ...prev,
          { question: activeQuestion, selectedOption: optionIndex, isCorrect },
        ]);
        return;
      }

      // Survival mode
      if (survivalSelected !== null) return;
      setSurvivalSelected(optionIndex);
      setSurvivalAnswers((prev) => [
        ...prev,
        { question: activeQuestion, selectedOption: optionIndex, isCorrect },
      ]);
      if (isCorrect) {
        const nextStreak = survivalStreak + 1;
        setSurvivalStreak(nextStreak);
        if (nextStreak > bestStreak) {
          setSessionBestStreak(nextStreak);
          writeBestStreak(nextStreak);
        }
      } else {
        setSurvivalLives((lives) => Math.max(0, lives - 1));
      }
    },
    [
      activeQuestion,
      mode,
      dailySelected,
      dailyAnswers,
      dailyIndex,
      dailyChallenge.questions.length,
      dailyPracticeOverride,
      todayDateKey,
      classicSelected,
      survivalSelected,
      survivalStreak,
      bestStreak,
    ],
  );

  const handleNext = useCallback(() => {
    if (mode === 'daily') {
      if (dailyIndex + 1 >= dailyChallenge.questions.length) {
        setDailyCompleted(true);
      } else {
        setDailyIndex((i) => i + 1);
      }
      setDailySelected(null);
      return;
    }

    if (mode === 'classic') {
      if (classicIndex + 1 >= classicQuestions.length) {
        setClassicCompleted(true);
      } else {
        setClassicIndex((i) => i + 1);
      }
      setClassicSelected(null);
      return;
    }

    // Survival mode
    if (survivalLives <= 0) {
      setSurvivalCompleted(true);
      setSurvivalSelected(null);
      return;
    }

    if (survivalIndex + 1 >= survivalQueue.length) {
      const freshCycle = shuffleArray(questions).map((q) =>
        prepareQuestionForRun(q),
      );
      setSurvivalQueue(freshCycle);
      setSurvivalIndex(0);
    } else {
      setSurvivalIndex((i) => i + 1);
    }
    setSurvivalSelected(null);
  }, [
    mode,
    dailyIndex,
    dailyChallenge.questions.length,
    classicIndex,
    classicQuestions.length,
    survivalLives,
    survivalIndex,
    survivalQueue.length,
    questions,
  ]);

  // Keyboard shortcuts: 1-4 select option, Enter advances when answered
  useEffect(() => {
    if (!activeQuestion) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (activeSelectedOption === null) {
        const digit = Number(event.key);
        if (
          Number.isInteger(digit) &&
          digit >= 1 &&
          digit <= activeQuestion.options.length
        ) {
          event.preventDefault();
          handleSelectOption(digit - 1);
        }
      } else if (event.key === 'Enter' && tag !== 'A' && tag !== 'BUTTON') {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeQuestion, activeSelectedOption, handleSelectOption, handleNext]);

  // Accessible tablist arrow key navigation (selection follows focus)
  const selectMode = (nextMode: QuizMode, moveFocus = false) => {
    setMode(nextMode);
    if (moveFocus) {
      const btn = tabRefs.current[nextMode];
      btn?.focus();
      btn?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  };

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % MODES.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + MODES.length) % MODES.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = MODES.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      selectMode(MODES[nextIndex], true);
    }
  };

  const modeMeta: Record<
    QuizMode,
    { label: string; icon: React.ReactNode; badge?: string }
  > = {
    daily: {
      label: t('quiz.modes.daily'),
      icon: <CalendarDays aria-hidden="true" className="h-4 w-4" />,
      badge: `#${dailyChallenge.dayNumber}`,
    },
    classic: {
      label: t('quiz.modes.classic'),
      icon: <Layers aria-hidden="true" className="h-4 w-4" />,
    },
    survival: {
      label: t('quiz.modes.survival'),
      icon: <Flame aria-hidden="true" className="h-4 w-4" />,
      badge: bestStreak > 0 ? `${bestStreak}` : undefined,
    },
  };

  const renderProgressHeader = () => {
    if (mode === 'daily') {
      const total = dailyChallenge.questions.length;
      const current = Math.min(dailyIndex + 1, total);
      const pct = (current / total) * 100;
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
            <span>
              {t('quiz.daily_header', { day: dailyChallenge.dayNumber })}
            </span>
            <span className="font-mono text-purple">
              {current} / {total}
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label={t('quiz.progress_aria_label')}
            className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple to-blue transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      );
    }

    if (mode === 'classic') {
      const total = classicQuestions.length;
      const current = Math.min(classicIndex + 1, total);
      const scoreSoFar = classicAnswers.filter((a) => a.isCorrect).length;
      const pct = total > 0 ? (current / total) * 100 : 0;

      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
            <span>{t('quiz.question_counter', { current, total })}</span>
            <span className="font-mono text-green-700">
              {t('quiz.score_inline', { score: scoreSoFar })}
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={1}
            aria-valuemax={Math.max(1, total)}
            aria-label={t('quiz.progress_aria_label')}
            className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple to-green transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      );
    }

    // Survival header
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div
          className="flex items-center gap-1.5"
          aria-label={t('quiz.lives_remaining', {
            lives: survivalLives,
            max: SURVIVAL_MAX_LIVES,
          })}
        >
          {Array.from({ length: SURVIVAL_MAX_LIVES }).map((_, idx) => {
            const alive = idx < survivalLives;
            return (
              <Heart
                key={idx}
                aria-hidden="true"
                className={`h-5 w-5 ${
                  alive ? 'fill-red text-red' : 'fill-slate-200 text-slate-300'
                }`}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-4 text-sm font-semibold">
          <span className="inline-flex items-center gap-1.5 text-orange-600">
            <Flame aria-hidden="true" className="h-4 w-4" />
            <span>{t('quiz.streak_label', { streak: survivalStreak })}</span>
          </span>
          <span className="font-mono text-xs text-slate-500">
            {t('quiz.best_label', { best: bestStreak })}
          </span>
        </div>
      </div>
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="space-y-6">
        {/* Accessible single-row scrollable mode tablist */}
        <div
          role="tablist"
          aria-label={t('quiz.mode_tablist_label')}
          className="flex snap-x snap-proximity gap-1 overflow-x-auto border-b border-slate-200 pb-0"
        >
          {MODES.map((modeKey, index) => {
            const isSelected = mode === modeKey;
            const meta = modeMeta[modeKey];
            return (
              <button
                key={modeKey}
                ref={(el) => {
                  tabRefs.current[modeKey] = el;
                }}
                id={`quiz-tab-${modeKey}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => selectMode(modeKey)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className="relative inline-flex min-h-12 flex-none snap-start items-center gap-1.5 px-3 py-3 text-xs font-semibold text-slate-600 transition-colors hover:text-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-purple-600 aria-selected:text-purple aria-selected:after:absolute aria-selected:after:inset-x-0 aria-selected:after:bottom-0 aria-selected:after:border-b-[3px] aria-selected:after:border-purple-600 aria-selected:after:content-[''] sm:gap-2 sm:px-4 sm:text-sm"
              >
                {meta.icon}
                <span>{meta.label}</span>
                {meta.badge && (
                  <span className="rounded-full bg-purple/10 px-2 py-0.5 font-mono text-xs font-bold text-purple">
                    {meta.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tabpanel */}
        <div
          role="tabpanel"
          aria-labelledby={`quiz-tab-${mode}`}
          className="space-y-5"
        >
          {/* Classic Mode Filters */}
          {mode === 'classic' && (
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <SlidersHorizontal
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  />
                  <span>{t('quiz.filter_label')}</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    startClassicRun(
                      classicCategory,
                      classicDifficulty,
                      classicCount,
                    )
                  }
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-purple hover:text-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  <Shuffle aria-hidden="true" className="h-3.5 w-3.5" />
                  <span>{t('quiz.new_shuffle')}</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  aria-pressed={classicCategory === 'all'}
                  onClick={() => {
                    setClassicCategory('all');
                    startClassicRun('all', classicDifficulty, classicCount);
                  }}
                  className={`min-h-9 rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 ${
                    classicCategory === 'all'
                      ? 'border-purple bg-purple text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-purple'
                  }`}
                >
                  {t('quiz.all_topics')}
                </button>
                {QUIZ_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={classicCategory === category}
                    onClick={() => {
                      setClassicCategory(category);
                      startClassicRun(
                        category,
                        classicDifficulty,
                        classicCount,
                      );
                    }}
                    className={`min-h-9 rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 ${
                      classicCategory === category
                        ? 'border-purple bg-purple text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-purple'
                    }`}
                  >
                    {t(`quiz.categories.${category}`)}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    aria-pressed={classicDifficulty === 'all'}
                    onClick={() => {
                      setClassicDifficulty('all');
                      startClassicRun(classicCategory, 'all', classicCount);
                    }}
                    className={`min-h-8 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 ${
                      classicDifficulty === 'all'
                        ? 'border-purple-600 bg-purple/10 text-purple'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-purple'
                    }`}
                  >
                    {t('quiz.all_levels')}
                  </button>
                  {QUIZ_DIFFICULTIES.map((difficulty) => (
                    <button
                      key={difficulty}
                      type="button"
                      aria-pressed={classicDifficulty === difficulty}
                      onClick={() => {
                        setClassicDifficulty(difficulty);
                        startClassicRun(
                          classicCategory,
                          difficulty,
                          classicCount,
                        );
                      }}
                      className={`min-h-8 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 ${
                        classicDifficulty === difficulty
                          ? 'border-purple-600 bg-purple/10 text-purple'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-purple'
                      }`}
                    >
                      {t(`quiz.difficulties.${difficulty}`)}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  {CLASSIC_COUNTS.map((countOption) => (
                    <button
                      key={countOption}
                      type="button"
                      aria-pressed={classicCount === countOption}
                      onClick={() => {
                        setClassicCount(countOption);
                        startClassicRun(
                          classicCategory,
                          classicDifficulty,
                          countOption,
                        );
                      }}
                      className={`min-h-8 rounded-lg border px-2.5 py-1 font-mono text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 ${
                        classicCount === countOption
                          ? 'border-purple bg-purple text-white'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-purple'
                      }`}
                    >
                      {countOption === 0
                        ? t('quiz.count_all', { count: classicMatchingCount })
                        : `${countOption}Q`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mode content: summary, empty state, or active question */}
          {mode === 'daily' && (dailyCompleted || showSavedDailySummary) ? (
            <QuizSummary
              mode="daily"
              score={
                showSavedDailySummary && hydratedSavedDaily
                  ? hydratedSavedDaily.score
                  : dailyAnswers.filter((a) => a.isCorrect).length
              }
              total={dailyChallenge.questions.length}
              answers={showSavedDailySummary ? savedDailyAnswers : dailyAnswers}
              dayNumber={dailyChallenge.dayNumber}
              onRestart={restartDaily}
              restartLabel={t('quiz.practice_daily_again')}
            />
          ) : mode === 'classic' && classicCompleted ? (
            <QuizSummary
              mode="classic"
              score={classicAnswers.filter((a) => a.isCorrect).length}
              total={classicQuestions.length}
              answers={classicAnswers}
              onRestart={() =>
                startClassicRun(
                  classicCategory,
                  classicDifficulty,
                  classicCount,
                )
              }
            />
          ) : mode === 'survival' && survivalCompleted ? (
            <QuizSummary
              mode="survival"
              score={survivalStreak}
              total={survivalAnswers.length}
              answers={survivalAnswers}
              bestStreak={bestStreak}
              onRestart={restartSurvival}
            />
          ) : !activeQuestion ? (
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-base font-semibold text-slate-800">
                {t('quiz.no_matching_questions')}
              </p>
              <button
                type="button"
                onClick={() => {
                  setClassicCategory('all');
                  setClassicDifficulty('all');
                  startClassicRun('all', 'all', classicCount);
                }}
                className="inline-flex min-h-11 items-center rounded-xl bg-purple px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-600"
              >
                {t('quiz.reset_filters')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {renderProgressHeader()}
              <QuestionCard
                question={activeQuestion}
                selectedOption={activeSelectedOption}
                onSelectOption={handleSelectOption}
                onNext={handleNext}
                isLastQuestion={
                  (mode === 'daily' &&
                    dailyIndex + 1 >= dailyChallenge.questions.length) ||
                  (mode === 'classic' &&
                    classicIndex + 1 >= classicQuestions.length) ||
                  (mode === 'survival' && survivalLives <= 0)
                }
                nextLabel={
                  mode === 'survival' && survivalLives <= 0
                    ? t('quiz.see_results')
                    : undefined
                }
              />
            </div>
          )}
        </div>
      </div>
    </MotionConfig>
  );
};
