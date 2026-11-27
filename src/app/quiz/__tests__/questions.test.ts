import { describe, expect, it } from 'vitest';
import rawQuestions from '@/data/quiz/questions.json';
import {
  QUIZ_CATEGORIES,
  QuestionSchema,
  QuestionsListSchema,
} from '../_model/question';
import {
  DAILY_QUESTION_COUNT,
  buildEmojiGrid,
  buildGitHubReportUrl,
  buildGitHubSuggestUrl,
  buildShareText,
  createClassicRun,
  createSeededRng,
  filterQuestions,
  getAllQuestions,
  getDailyChallenge,
  getDayNumber,
  getQuizRank,
  prepareQuestionForRun,
} from '../_lib/quizEngine';

describe('Quiz question bank schema & integrity', () => {
  it('validates all questions against QuestionsListSchema', () => {
    const parsed = QuestionsListSchema.safeParse(rawQuestions);
    expect(parsed.success).toBe(true);
  });

  it('has unique IDs, distinct options per question, and covers all categories', () => {
    const questions = getAllQuestions();
    expect(questions.length).toBeGreaterThanOrEqual(30);

    const ids = new Set<string>();
    const categoriesSeen = new Set<string>();

    for (const q of questions) {
      expect(ids.has(q.id)).toBe(false);
      ids.add(q.id);
      categoriesSeen.add(q.category);

      const uniqueOptions = new Set(q.options);
      expect(uniqueOptions.size).toBe(q.options.length);
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThan(q.options.length);
      expect(q.explanation.trim().length).toBeGreaterThan(10);
    }

    for (const category of QUIZ_CATEGORIES) {
      expect(categoriesSeen.has(category)).toBe(true);
    }
  });

  it('rejects out-of-bounds correct index in QuestionSchema', () => {
    const result = QuestionSchema.safeParse({
      id: 'bad-q',
      category: 'js-quirks',
      difficulty: 'junior',
      question: 'Broken question?',
      options: ['A', 'B'],
      correct: 2,
      explanation: 'Out of bounds index should fail.',
    });
    expect(result.success).toBe(false);
  });
});

describe('Quiz engine', () => {
  const questions = getAllQuestions();

  it('filters questions by category, difficulty, search, and excludeIds', () => {
    const tsQuestions = filterQuestions(questions, { category: 'typescript' });
    expect(tsQuestions.length).toBeGreaterThan(0);
    expect(tsQuestions.every((q) => q.category === 'typescript')).toBe(true);

    const wtfQuestions = filterQuestions(questions, { difficulty: 'wtf' });
    expect(wtfQuestions.length).toBeGreaterThan(0);
    expect(wtfQuestions.every((q) => q.difficulty === 'wtf')).toBe(true);

    const searchHits = filterQuestions(questions, {
      search: 'structuredClone',
    });
    expect(searchHits.some((q) => q.id === 'web-structured-clone')).toBe(true);

    const excluded = filterQuestions(questions, {
      excludeIds: new Set([questions[0].id]),
    });
    expect(excluded.length).toBe(questions.length - 1);
  });

  it('preserves the exact correct answer text when shuffling options', () => {
    const sample = questions[0];
    const originalCorrectText = sample.options[sample.correct];
    const prepared = prepareQuestionForRun(sample, createSeededRng(12345));

    expect(prepared.options).toHaveLength(sample.options.length);
    expect(prepared.options[prepared.correct]).toBe(originalCorrectText);
  });

  it('generates deterministic Daily Challenges per date with diverse categories', () => {
    const dayA1 = getDailyChallenge(questions, '2026-11-26');
    const dayA2 = getDailyChallenge(questions, '2026-11-26');
    const dayB = getDailyChallenge(questions, '2026-11-27');

    expect(dayA1.dayNumber).toBe(1);
    expect(dayB.dayNumber).toBe(2);
    expect(dayA1.questions).toHaveLength(DAILY_QUESTION_COUNT);
    expect(dayA1.questions.map((q) => q.id)).toEqual(
      dayA2.questions.map((q) => q.id),
    );
    expect(dayA1.questions.map((q) => q.options)).toEqual(
      dayA2.questions.map((q) => q.options),
    );
    expect(dayA1.questions.map((q) => q.id)).not.toEqual(
      dayB.questions.map((q) => q.id),
    );

    const uniqueCategories = new Set(dayA1.questions.map((q) => q.category));
    expect(uniqueCategories.size).toBe(DAILY_QUESTION_COUNT);
  });

  it('clamps dayNumber to at least 1 for dates before epoch', () => {
    expect(getDayNumber('2025-01-01')).toBe(1);
  });

  it('builds Classic runs respecting limit and filters without skipping the last question', () => {
    const run = createClassicRun(questions, {
      category: 'modern-js',
      count: 4,
      rng: createSeededRng(42),
    });
    expect(run).toHaveLength(4);
    expect(run.every((q) => q.category === 'modern-js')).toBe(true);
  });

  it('computes ranks and share text cleanly', () => {
    expect(getQuizRank(10, 10).id).toBe('tc39');
    expect(getQuizRank(8, 10).id).toBe('async_master');
    expect(getQuizRank(6, 10).id).toBe('promise_keeper');
    expect(getQuizRank(4, 10).id).toBe('callback_survivor');
    expect(getQuizRank(1, 10).id).toBe('undefined_not_fn');

    expect(buildEmojiGrid([true, false, true])).toBe('🟩🟥🟩');

    const dailyShare = buildShareText({
      mode: 'daily',
      score: 4,
      total: 5,
      results: [true, true, false, true, true],
      dayNumber: 7,
      url: 'https://meetjs.pl/quiz?mode=daily',
    });
    expect(dailyShare).toContain('meet.js Daily JS Quiz #7 — 4/5');
    expect(dailyShare).toContain('🟩🟩🟥🟩🟩');

    expect(buildGitHubReportUrl(questions[0])).toContain(
      `Quiz+bug%3A+${questions[0].id}`,
    );
    expect(buildGitHubSuggestUrl()).toContain(
      'https://github.com/naugtur/meetjs.pl/issues/new',
    );
  });
});
