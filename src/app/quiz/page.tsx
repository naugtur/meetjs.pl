import { Quiz } from './_components/quiz/Quiz';
import { questions } from './_questions/questions';

export default function QuizPage() {
	return (
		<div className="mx-auto min-h-screen max-w-2xl p-8">
			<Quiz questions={questions} />
		</div>
	);
}
