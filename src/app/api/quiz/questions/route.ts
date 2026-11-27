import type { NextRequest } from 'next/server';
import {
  QUIZ_CATEGORIES,
  QUIZ_DIFFICULTIES,
  QuizCategorySchema,
  QuizDifficultySchema,
} from '@/app/quiz/_model/question';
import {
  filterQuestions,
  getAllQuestions,
  shuffleArray,
} from '@/app/quiz/_lib/quizEngine';

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
  const rawLimit = searchParams.get('limit');
  const rawSearch = searchParams.get('search') ?? undefined;
  const shouldShuffle = searchParams.get('shuffle') === 'true';

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

  let limit: number | undefined;
  if (rawLimit !== null) {
    const parsedLimit = Number(rawLimit);
    if (
      !Number.isInteger(parsedLimit) ||
      parsedLimit < 1 ||
      parsedLimit > 100
    ) {
      return Response.json(
        { error: 'Invalid limit. Expected an integer between 1 and 100.' },
        { status: 400, headers: CORS_HEADERS },
      );
    }
    limit = parsedLimit;
  }

  const allQuestions = getAllQuestions();
  let filtered = filterQuestions(allQuestions, {
    category: categoryParsed?.data,
    difficulty: difficultyParsed?.data,
    search: rawSearch,
  });

  if (shouldShuffle) {
    filtered = shuffleArray(filtered);
  }

  const questions = limit ? filtered.slice(0, limit) : filtered;

  return Response.json(
    {
      total: allQuestions.length,
      count: questions.length,
      categories: QUIZ_CATEGORIES,
      difficulties: QUIZ_DIFFICULTIES,
      questions,
    },
    {
      headers: {
        ...CORS_HEADERS,
        'Cache-Control': shouldShuffle
          ? 'no-store'
          : 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  );
}
