import { z } from 'zod';

export const QUIZ_CATEGORIES = [
  'js-quirks',
  'async-event-loop',
  'modern-js',
  'typescript',
  'web-apis',
  'js-history',
] as const;

export const QUIZ_DIFFICULTIES = ['junior', 'mid', 'senior', 'wtf'] as const;

export const QuizCategorySchema = z.enum(QUIZ_CATEGORIES);
export type QuizCategory = z.infer<typeof QuizCategorySchema>;

export const QuizDifficultySchema = z.enum(QUIZ_DIFFICULTIES);
export type QuizDifficulty = z.infer<typeof QuizDifficultySchema>;

export const QuestionSchema = z
  .object({
    id: z.string().min(1),
    category: QuizCategorySchema,
    difficulty: QuizDifficultySchema,
    question: z.string().min(1),
    code: z.string().min(1).optional(),
    options: z.array(z.string().min(1)).min(2).max(6),
    correct: z.number().int().nonnegative(),
    explanation: z.string().min(1),
    docsUrl: z.string().url().optional(),
    author: z.string().min(1).optional(),
  })
  .refine((item) => item.correct < item.options.length, {
    message: 'correct index must be within options bounds',
    path: ['correct'],
  });

export type Question = z.infer<typeof QuestionSchema>;

export const QuestionsListSchema = z.array(QuestionSchema);
export type Questions = z.infer<typeof QuestionsListSchema>;

export type QuizMode = 'daily' | 'classic' | 'survival';
