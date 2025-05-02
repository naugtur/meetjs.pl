interface Props {
	question: string;
	answers: string[];
	chooseAnswer: (answerIndex: number) => void;
}

// Todo: Move to shared components - /components/quiz
export const QuestionCard = ({ question, answers, chooseAnswer }: Props) => {
	return (
		<article className="space-y-6">
			<p className="text-xl">{question}</p>

			<div className="space-y-3">
				{answers.map((option, index) => (
					<button
						key={index}
						onClick={() => chooseAnswer(index)}
						className="w-full rounded-lg border bg-white p-4 text-left hover:bg-gray-50"
					>
						{option}
					</button>
				))}
			</div>
		</article>
	);
};
