import questions from '@/data/quiz/questions.json';

// Todo: Create question presets/lists. Add random question.
// - Question search (text search, category, difficulty, filter, pagination)
export const GET = async (request: Request) => Response.json(questions);
