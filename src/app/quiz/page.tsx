import { env } from '@/env';
import { Quiz } from './_components/quiz/Quiz';
import { QuestionsListSchema } from './_model/question';

const FIFTEEN_MINUTES = 900;
const getQuizQuestions = async () => {
	const url = `${env.SITE_URL}/api/quiz/questions`;
	console.log({ url });
	const response = await fetch(url, {
		next: { revalidate: FIFTEEN_MINUTES },
	});

	if (!response.ok) {
		return { data: null, error: 'Failed to fetch questions' };
	}

	const json: unknown = await response.json();

	const result = QuestionsListSchema.safeParse(json);

	return result.success
		? { data: result.data, error: null }
		: { data: null, error: 'Failed to parse questions' };
};

export default async function QuizPage() {
	const { data: questions, error } = await getQuizQuestions();

	if (error) {
		// Todo: Proper handling - report on Discord (Add widget) or GitHub issues (you can fix it urself, PR)
		return (
			<div className="mx-auto min-h-screen max-w-2xl p-8">
				<p className="text-red-500">There was an error.</p>
				<p className="text-red-500">{error}</p>
			</div>
		);
	}

	// Todo: Handle no questions
	return (
		<div className="mx-auto min-h-screen max-w-2xl p-8">
			<div className="space-y-10">
				{questions && <Quiz questions={questions} />}

				<hr />
				{/* Todo */}
				<h2 className="text-2xl font-bold">Rate/flag question</h2>
				<h2 className="text-2xl font-bold">Comment question</h2>
				<h2 className="text-2xl font-bold">Add/Suggest question</h2>
				<h2 className="text-2xl font-bold">Question API</h2>
			</div>
		</div>
	);
}
