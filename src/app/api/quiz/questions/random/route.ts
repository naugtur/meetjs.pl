import questions from '@/data/quiz/questions.json';
import { randomElement } from '@/utils/randomElement';

export const GET = async () => Response.json(randomElement(questions));
