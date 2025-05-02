interface Props {
	score: number;
	maxScore: number;
	children: React.ReactNode;
}

export const QuizSummary = ({ score, maxScore, children }: Props) => (
	<div className="space-y-6 text-center">
		<h1 className="text-2xl font-bold">Quiz Complete!</h1>
		<p className="text-xl">
			Your score: {score} out of {maxScore}
		</p>

		{children}
	</div>
);
