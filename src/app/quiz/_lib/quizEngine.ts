import rawQuestions from '@/data/quiz/questions.json';
import {
  type Question,
  type QuizCategory,
  type QuizDifficulty,
  type QuizMode,
  QuestionsListSchema,
} from '../_model/question';

const DAILY_EPOCH_UTC = Date.UTC(2026, 10, 26); // 2026-11-26 (Day #1)
const MS_PER_DAY = 86_400_000;
export const DAILY_QUESTION_COUNT = 5;

let cachedQuestions: readonly Question[] | null = null;

export function getAllQuestions(): readonly Question[] {
  if (!cachedQuestions) {
    cachedQuestions = Object.freeze(QuestionsListSchema.parse(rawQuestions));
  }
  return cachedQuestions;
}

export interface QuestionFilters {
  category?: QuizCategory | 'all';
  difficulty?: QuizDifficulty | 'all';
  search?: string;
  excludeIds?: ReadonlySet<string>;
}

export function filterQuestions(
  questions: readonly Question[],
  filters: QuestionFilters = {},
): Question[] {
  const normalizedSearch = filters.search?.trim().toLowerCase();

  return questions.filter((q) => {
    if (
      filters.category &&
      filters.category !== 'all' &&
      q.category !== filters.category
    ) {
      return false;
    }

    if (
      filters.difficulty &&
      filters.difficulty !== 'all' &&
      q.difficulty !== filters.difficulty
    ) {
      return false;
    }

    if (filters.excludeIds?.has(q.id)) {
      return false;
    }

    if (normalizedSearch) {
      const haystack = [
        q.question,
        q.code ?? '',
        q.explanation,
        ...q.options,
        q.category,
        q.difficulty,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(normalizedSearch)) {
        return false;
      }
    }

    return true;
  });
}

export function hashStringToSeed(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function createSeededRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffleArray<T>(
  items: readonly T[],
  rng: () => number = Math.random,
): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function prepareQuestionForRun(
  question: Question,
  rng: () => number = Math.random,
): Question {
  const indexed = question.options.map((text, index) => ({
    text,
    isCorrect: index === question.correct,
  }));
  const shuffled = shuffleArray(indexed, rng);
  const newCorrectIndex = shuffled.findIndex((item) => item.isCorrect);

  return {
    ...question,
    options: shuffled.map((item) => item.text),
    correct: newCorrectIndex,
  };
}

export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDayNumber(dateKey: string): number {
  const [year, month, day] = dateKey.split('-').map(Number);
  if (!year || !month || !day) return 1;
  const currentUtc = Date.UTC(year, month - 1, day);
  const diff = Math.floor((currentUtc - DAILY_EPOCH_UTC) / MS_PER_DAY);
  return Math.max(1, diff + 1);
}

export interface DailyChallenge {
  dateKey: string;
  dayNumber: number;
  questions: Question[];
}

export function getDailyChallenge(
  questions: readonly Question[],
  dateKey: string = getLocalDateKey(),
): DailyChallenge {
  const seed = hashStringToSeed(`meetjs-daily-quiz:${dateKey}`);
  const rng = createSeededRng(seed);
  const shuffled = shuffleArray(questions, rng);

  // Prefer one question per category first for variety, then fill remaining slots.
  const selected: Question[] = [];
  const usedCategories = new Set<QuizCategory>();
  const usedIds = new Set<string>();

  for (const question of shuffled) {
    if (selected.length >= DAILY_QUESTION_COUNT) break;
    if (!usedCategories.has(question.category)) {
      selected.push(question);
      usedCategories.add(question.category);
      usedIds.add(question.id);
    }
  }

  for (const question of shuffled) {
    if (selected.length >= DAILY_QUESTION_COUNT) break;
    if (!usedIds.has(question.id)) {
      selected.push(question);
      usedIds.add(question.id);
    }
  }

  return {
    dateKey,
    dayNumber: getDayNumber(dateKey),
    questions: selected.map((q) => prepareQuestionForRun(q, rng)),
  };
}

export interface ClassicRunOptions {
  category?: QuizCategory | 'all';
  difficulty?: QuizDifficulty | 'all';
  count?: number;
  rng?: () => number;
}

export function createClassicRun(
  questions: readonly Question[],
  options: ClassicRunOptions = {},
): Question[] {
  const rng = options.rng ?? Math.random;
  const filtered = filterQuestions(questions, {
    category: options.category,
    difficulty: options.difficulty,
  });
  const shuffled = shuffleArray(filtered, rng);
  const limit =
    options.count && options.count > 0
      ? Math.min(options.count, shuffled.length)
      : shuffled.length;

  return shuffled.slice(0, limit).map((q) => prepareQuestionForRun(q, rng));
}

export type QuizRankId =
  | 'tc39'
  | 'async_master'
  | 'promise_keeper'
  | 'callback_survivor'
  | 'undefined_not_fn';

export interface QuizRank {
  id: QuizRankId;
  emoji: string;
}

export function getQuizRank(score: number, total: number): QuizRank {
  if (total <= 0) return { id: 'undefined_not_fn', emoji: '🐛' };
  const ratio = score / total;
  if (ratio >= 1) return { id: 'tc39', emoji: '👑' };
  if (ratio >= 0.8) return { id: 'async_master', emoji: '⚡' };
  if (ratio >= 0.6) return { id: 'promise_keeper', emoji: '🚀' };
  if (ratio >= 0.4) return { id: 'callback_survivor', emoji: '🛠️' };
  return { id: 'undefined_not_fn', emoji: '🐛' };
}

export interface ShareTextParams {
  mode: QuizMode;
  score: number;
  total: number;
  results: readonly boolean[];
  dayNumber?: number;
  url: string;
}

export function buildEmojiGrid(results: readonly boolean[]): string {
  return results.map((ok) => (ok ? '🟩' : '🟥')).join('');
}

export function buildShareText({
  mode,
  score,
  total,
  results,
  dayNumber,
  url,
}: ShareTextParams): string {
  const grid = buildEmojiGrid(results);

  if (mode === 'daily') {
    const streak = score === total ? ' 🔥' : '';
    return `meet.js Daily JS Quiz #${dayNumber ?? 1} — ${score}/${total}${streak}\n${grid}\n${url}`;
  }

  if (mode === 'survival') {
    return `I reached a streak of ${score} in meet.js JS Quiz Survival mode! 🔥\n${url}`;
  }

  return `I scored ${score}/${total} on the meet.js JS Quiz!\n${grid}\n${url}`;
}

const GITHUB_ISSUES_BASE = 'https://github.com/naugtur/meetjs.pl/issues/new';

export function buildGitHubReportUrl(question: Question): string {
  const params = new URLSearchParams({
    title: `Quiz bug: ${question.id}`,
    body: [
      `### Question ID`,
      `\`${question.id}\``,
      '',
      `### Question`,
      question.question,
      '',
      `### What looks wrong or could be improved?`,
      '<!-- Describe the technical issue or suggested correction -->',
    ].join('\n'),
  });
  return `${GITHUB_ISSUES_BASE}?${params.toString()}`;
}

export function buildGitHubSuggestUrl(): string {
  const params = new URLSearchParams({
    title: 'Quiz question suggestion: <short topic>',
    body: [
      '### Suggested JS Quiz Question',
      '',
      '```json',
      JSON.stringify(
        {
          id: 'category-short-slug',
          category: 'js-quirks',
          difficulty: 'mid',
          question: 'What does this snippet log?',
          code: 'console.log(...);',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correct: 0,
          explanation: 'Explain why this answer is right.',
          docsUrl: 'https://developer.mozilla.org/...',
          author: 'your-github-handle',
        },
        null,
        2,
      ),
      '```',
    ].join('\n'),
  });
  return `${GITHUB_ISSUES_BASE}?${params.toString()}`;
}
