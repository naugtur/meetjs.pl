import type { NextRequest } from 'next/server';
import {
  QUIZ_CATEGORIES,
  QUIZ_DIFFICULTIES,
  QuizCategorySchema,
  QuizDifficultySchema,
} from '@/app/quiz/_model/question';
import { filterQuestions, getAllQuestions } from '@/app/quiz/_lib/quizEngine';
import { randomElement } from '@/utils/randomElement';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const rawCategory = searchParams.get('category');
  const rawDifficulty = searchParams.get('difficulty');
  const rawExclude = searchParams.get('exclude');

  const categoryParsed = rawCategory
    ? QuizCategorySchema.safeParse(rawCategory)
    : null;
  if (categoryParsed && !categoryParsed.success) {
    return Response.json(
      {
        error: `Invalid category "${rawCategory}". Valid categories: ${QUIZ_CATEGORIES.join(', ')}`,
      },
      { status: 400, headers: CORS_HEADERS },
    );
  }

  const difficultyParsed = rawDifficulty
    ? QuizDifficultySchema.safeParse(rawDifficulty)
    : null;
  if (difficultyParsed && !difficultyParsed.success) {
    return Response.json(
      {
        error: `Invalid difficulty "${rawDifficulty}". Valid difficulties: ${QUIZ_DIFFICULTIES.join(', ')}`,
      },
      { status: 400, headers: CORS_HEADERS },
    );
  }

  const excludeIds = rawExclude
    ? new Set(
        rawExclude
          .split(',')
          .map((id) => id.trim())
          .filter(Boolean),
      )
    : undefined;

  const pool = filterQuestions(getAllQuestions(), {
    category: categoryParsed?.data,
    difficulty: difficultyParsed?.data,
    excludeIds,
  });

  if (pool.length === 0) {
    return Response.json(
      { error: 'No quiz questions matched the provided filters.' },
      { status: 404, headers: CORS_HEADERS },
    );
  }

  return Response.json(randomElement(pool), {
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': 'no-store',
    },
  });
}
