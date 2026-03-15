'use client';

import { useState } from 'react';
import { SurveyQuestion } from '@/components/loading/survey-question';
import { SurveyProgress } from '@/components/loading/survey-progress';
import { LoadingSpinner } from '@/components/loading/loading-spinner';

interface Question {
  id: number;
  question: string;
  type: 'multiple-choice' | 'rating' | 'text' | 'nps';
  options?: string[];
}

interface SurveyContainerProps {
  title: string;
  description: string;
  questions: Question[];
  onSubmit: (answers: Record<number, string | number>) => void;
}

export function SurveyContainer({
  title,
  description,
  questions,
  onSubmit,
}: SurveyContainerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState<number | null>(null);

  const handleAnswer = (questionId: number, answer: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setLoadingQuestion(currentQuestion);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setLoadingQuestion(null);
      }, 800);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(answers);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#00a368]/5 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00a368]/10">
            <svg
              className="w-10 h-10 text-[#00a368]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Thank you!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your survey has been submitted successfully.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setIsSubmitted(false);
            }}
            className="mt-8 px-8 py-3 bg-[#00a368] hover:bg-[#00a368]/90 text-white font-semibold rounded-xl transition-colors"
          >
            Start New Survey
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00a368]/5 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <SurveyProgress
            current={currentQuestion + 1}
            total={questions.length}
          />
        </div>

        {/* Question */}
        {loadingQuestion === currentQuestion ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg flex items-center justify-center min-h-96">
            <LoadingSpinner
              variant="pulse"
              size="lg"
              text="Loading next question..."
            />
          </div>
        ) : (
          <SurveyQuestion
            {...questions[currentQuestion]}
            onAnswer={(answer) =>
              handleAnswer(questions[currentQuestion].id, answer)
            }
            isLoading={isSubmitting && currentQuestion === questions.length - 1}
          />
        )}

        {/* Navigation */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex-1 py-3 px-6 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-[#00a368] hover:text-[#00a368] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!answers[questions[currentQuestion].id]}
              className="flex-1 py-3 px-6 bg-[#00a368] hover:bg-[#00a368]/90 text-white font-semibold rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!answers[questions[currentQuestion].id] || isSubmitting}
              className="flex-1 py-3 px-6 bg-[#00a368] hover:bg-[#00a368]/90 text-white font-semibold rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner variant="dots" size="sm" />
                  <span>Submitting...</span>
                </>
              ) : (
                'Submit Survey'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
