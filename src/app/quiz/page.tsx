'use client';

import { useState } from 'react';

import { questions } from './questions';

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (selectedOption: number) => {
    if (selectedOption === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      {!showResults ? (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">
            Question {currentQuestion + 1} of {questions.length}
          </h1>
          <p className="text-xl">{questions[currentQuestion].question}</p>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full p-4 text-left bg-white border rounded-lg hover:bg-gray-50"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold">Quiz Complete!</h1>
          <p className="text-xl">
            Your score: {score} out of {questions.length}
          </p>
          <div className="space-x-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-green-500 text-black rounded-lg bg-white border hover:bg-gray-50"
            >
              Try Again
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=I scored ${score} out of ${questions.length} on the JavaScript Quiz!&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Share on X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#0077b5] text-white rounded-lg hover:bg-[#006399]"
            >
              Share on LinkedIn
            </a>
          </div>
        </div>
      )}
    </div>
  );
} 