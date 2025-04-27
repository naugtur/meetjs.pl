'use client';

import { useState } from 'react';

import { QuestionCard } from './QuestionCard';
import { QuizSummary } from './QuizSummary';
import { Question } from '../../_questions/questions';

interface Props {
	questions: Question[];
}

export const Quiz = ({ questions }: Props) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [score, setScore] = useState(0);

	const currentQuestion = questions[currentQuestionIndex];
	const total = questions.length;

	const allQuestionsCompleted = currentQuestionIndex + 1 >= total;

	const handleAnswer = (optionIndex: number) => {
		const isCorrectAnswer = optionIndex === currentQuestion.correct;

		if (isCorrectAnswer) {
			setScore((score) => score + 1);
		}

		if (!allQuestionsCompleted) {
			setCurrentQuestionIndex((i) => i + 1);
		}
	};

	const resetQuiz = () => {
		setCurrentQuestionIndex(0);
		setScore(0);
	};

	if (allQuestionsCompleted) {
		return (
			<QuizSummary score={score} maxScore={total}>
				<div className="space-x-4">
					<button
						onClick={resetQuiz}
						className="bg-green-500 rounded-lg border bg-white px-6 py-3 text-black hover:bg-gray-50"
					>
						Try Again
					</button>
					<a
						href={`https://twitter.com/intent/tweet?text=I scored ${score} out of ${total} on the JavaScript Quiz!&url=${encodeURIComponent(window.location.href)}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
					>
						Share on X
					</a>
					<a
						href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block rounded-lg bg-[#0077b5] px-6 py-3 text-white hover:bg-[#006399]"
					>
						Share on LinkedIn
					</a>
				</div>
			</QuizSummary>
		);
	}

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold">
				Question {currentQuestionIndex + 1} of {total}
			</h1>

			<QuestionCard
				question={currentQuestion.question}
				answers={currentQuestion.options}
				chooseAnswer={handleAnswer}
			/>
		</div>
	);
};
