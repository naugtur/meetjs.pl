import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import {
  GET as getQuestions,
  OPTIONS as optionsQuestions,
} from '../questions/route';
import {
  GET as getRandomQuestion,
  OPTIONS as optionsRandom,
} from '../questions/random/route';
import { QuestionSchema } from '@/app/quiz/_model/question';
import { getAllQuestions } from '@/app/quiz/_lib/quizEngine';

describe('Quiz Public API routes', () => {
  it('returns all questions with metadata and CORS headers', async () => {
    const req = new NextRequest('https://meetjs.pl/api/quiz/questions');
    const res = await getQuestions(req);

    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');

    const body = await res.json();
    expect(body.total).toBe(getAllQuestions().length);
    expect(body.count).toBe(body.total);
    expect(Array.isArray(body.questions)).toBe(true);
  });

  it('filters questions by category, difficulty, and limit', async () => {
    const req = new NextRequest(
      'https://meetjs.pl/api/quiz/questions?category=js-quirks&limit=3&shuffle=true',
    );
    const res = await getQuestions(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('Cache-Control')).toBe('no-store');

    const body = await res.json();
    expect(body.count).toBe(3);
    expect(
      body.questions.every(
        (q: { category: string }) => q.category === 'js-quirks',
      ),
    ).toBe(true);
  });

  it('returns 400 on invalid category, difficulty, or limit', async () => {
    const badCategory = await getQuestions(
      new NextRequest('https://meetjs.pl/api/quiz/questions?category=cobol'),
    );
    expect(badCategory.status).toBe(400);

    const badDifficulty = await getQuestions(
      new NextRequest('https://meetjs.pl/api/quiz/questions?difficulty=god'),
    );
    expect(badDifficulty.status).toBe(400);

    const badLimit = await getQuestions(
      new NextRequest('https://meetjs.pl/api/quiz/questions?limit=0'),
    );
    expect(badLimit.status).toBe(400);
  });

  it('handles OPTIONS preflight on both endpoints', async () => {
    const res1 = await optionsQuestions();
    const res2 = await optionsRandom();
    expect(res1.status).toBe(204);
    expect(res2.status).toBe(204);
    expect(res1.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(res2.headers.get('Access-Control-Allow-Origin')).toBe('*');
  });

  it('returns a valid random question and supports exclude list', async () => {
    const req = new NextRequest(
      'https://meetjs.pl/api/quiz/questions/random?category=typescript',
    );
    const res = await getRandomQuestion(req);

    expect(res.status).toBe(200);
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    const json = await res.json();
    const parsed = QuestionSchema.safeParse(json);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.category).toBe('typescript');
    }
  });

  it('returns 404 when all matching questions are excluded', async () => {
    const allIds = getAllQuestions()
      .map((q) => q.id)
      .join(',');
    const req = new NextRequest(
      `https://meetjs.pl/api/quiz/questions/random?exclude=${encodeURIComponent(allIds)}`,
    );
    const res = await getRandomQuestion(req);
    expect(res.status).toBe(404);
  });
});
