// Will have to figure out where to put it. Maybe some models with zod schemas.
import z from 'zod';

// Todo: Add id, category, difficulty(intern, junior, regular, senior)
export const QuestionSchema = z.object({
	question: z.string(),
	options: z.array(z.string()),
	correct: z.number().nonnegative(),
});

export type Question = z.infer<typeof QuestionSchema>;

export const QuestionsListSchema = z.array(QuestionSchema);

export type Questions = z.infer<typeof QuestionsListSchema>;
