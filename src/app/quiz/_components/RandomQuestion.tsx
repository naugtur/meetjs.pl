'use client';

import { type Question, QuestionSchema } from '../_model/question';
import { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { Loader } from './Loader';
import { sleep } from '@/utils/sleep';

const getRandomQuestion = async () => {
	const response = await fetch(`/api/quiz/questions/random`);

	if (!response.ok) {
		return { data: null, error: 'Failed to fetch random question' };
	}

	const json: unknown = await response.json();

	const result = QuestionSchema.safeParse(json);

	return result.success
		? { data: result.data, error: null }
		: { data: null, error: 'Failed to parse questions' };
};

// Todo: Figure out.
export const RandomQuestion = () => {
	const [question, setQuestion] = useState<Question | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	console.log({ question, isLoading, error }); // todo: remove

	const loadQuestion = async () => {
		setError(null);
		setIsLoading(true);

		await sleep(1_500);

		getRandomQuestion()
			.then(({ data, error }) => (error ? setError(error) : setQuestion(data)))
			.catch(({ error }) => setError(error))
			.finally(() => setIsLoading(false));
	};

	const renderStuff = () => {
		if (error) return <p className="font-bold text-red-500">Ooops. {error}</p>;
		if (isLoading) return <Loader text="$ npm install questions/random" />;
		if (question) return <RandomQuiz question={question} />;
	};

	return (
		<article>
			<button
				onClick={loadQuestion}
				className="cursor-pointer rounded-full bg-purple px-4 py-2 text-white hover:brightness-90"
			>
				Load random question
			</button>

			<section key={Math.random()}>{renderStuff()}</section>
		</article>
	);
};

// todo: rename
const RandomQuiz = ({ question }: { question: Question }) => {
	const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);

	const msg =
		correctAnswer === null ? null : correctAnswer ? (
			// add confetti
			<p className="text-green">That is correct answer!</p>
		) : (
			<p className="text-red-500">That is not the correct answer :c</p>
		); // add retry or reroll(?) button

	// todo: Split to components so it won't exist in invalid state where no question is loaded.
	// Container component passing down question object.
	const handleAnswer = (answerIndex: number) => {
		// block re-answering or add Retry.
		if (correctAnswer !== null) return;

		const isCorrect = answerIndex === question?.correct;
		setCorrectAnswer(isCorrect);
	};

	return (
		<>
			<QuestionCard
				question={question.question}
				answers={question.options}
				chooseAnswer={handleAnswer}
			/>

			<div>{msg}</div>
		</>
	);
};
