import { env } from '@/env';
import { Quiz } from './_components/quiz/Quiz';
import { QuestionsListSchema } from './_model/question';
import { ReportError } from './_components/ReportError';
import { RandomQuestion } from './_components/RandomQuestion';
// import { sleep } from '@/utils/sleep';

const FIFTEEN_MINUTES = 900;
const getQuizQuestions = async () => {
	// await sleep(25_000); // todo: remove sleep.

	const response = await fetch(`${env.SITE_URL}/api/quiz/questions`, {
		next: { revalidate: FIFTEEN_MINUTES },
	});

	if (!response.ok) {
		return { data: null, error: 'Failed to fetch questions' };
	}

	const json: unknown = await response.json();

	// Todo: Make reusable GET with validation
	const result = QuestionsListSchema.safeParse(json);

	return result.success
		? { data: result.data, error: null }
		: { data: null, error: 'Failed to parse questions' };
};

export default async function QuizPage() {
	const { data: questions, error } = await getQuizQuestions();

	if (error) return <ReportError error={error} />;

	// Todo: Handle no questions
	// Todo: Question menu: Random question, search & filter, tabs for adding, API docs etc.
	return (
		<div className="mx-auto min-h-screen max-w-2xl p-8">
			<div className="space-y-10">
				{questions && <Quiz questions={questions} />}

				<hr />

				<h2 className="text-2xl font-bold">Random question</h2>
				<RandomQuestion />

				{/* Todo */}
				<h2 className="text-2xl font-bold">Rate/flag question</h2>
				<h2 className="text-2xl font-bold">Comment question</h2>
				<h2 className="text-2xl font-bold">Add/Suggest question</h2>
				<h2 className="text-2xl font-bold">Question API</h2>
			</div>
		</div>
	);
}
