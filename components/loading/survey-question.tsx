'use client';

import { useState } from 'react';
import { LoadingSpinner } from './loading-spinner';

interface SurveyQuestionProps {
  id: number;
  question: string;
  type: 'multiple-choice' | 'rating' | 'text' | 'nps';
  options?: string[];
  onAnswer: (answer: string | number) => void;
  isLoading?: boolean;
}

export function SurveyQuestion({
  id,
  question,
  type,
  options = [],
  onAnswer,
  isLoading = false,
}: SurveyQuestionProps) {
  const [answer, setAnswer] = useState<string | number>('');

  const handleAnswer = (value: string | number) => {
    setAnswer(value);
    onAnswer(value);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-[#00a368] bg-[#00a368]/10 px-3 py-1 rounded-full">
            Question {id}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {question}
        </h3>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner variant="orbit" size="md" text="Submitting..." />
        </div>
      )}

      {!isLoading && type === 'multiple-choice' && (
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full p-4 text-left rounded-xl transition-all border-2 font-medium ${
                answer === option
                  ? 'border-[#00a368] bg-[#00a368]/10 text-[#00a368]'
                  : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#00a368] hover:bg-[#00a368]/5'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {!isLoading && type === 'rating' && (
        <div className="flex gap-3 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleAnswer(star)}
              className={`w-12 h-12 rounded-xl transition-all font-bold text-lg ${
                answer === star
                  ? 'bg-[#00a368] text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-[#00a368]/20'
              }`}
            >
              ★
            </button>
          ))}
        </div>
      )}

      {!isLoading && type === 'nps' && (
        <div className="space-y-4">
          <div className="flex justify-between gap-2 mb-4">
            {Array.from({ length: 11 }, (_, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`flex-1 py-3 rounded-lg transition-all font-semibold ${
                  answer === i
                    ? 'bg-[#00a368] text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-[#00a368]/20'
                }`}
              >
                {i}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400">
            <span>Not Likely</span>
            <span>Extremely Likely</span>
          </div>
        </div>
      )}

      {!isLoading && type === 'text' && (
        <textarea
          value={typeof answer === 'string' ? answer : ''}
          onChange={(e) => {
            setAnswer(e.target.value);
            onAnswer(e.target.value);
          }}
          placeholder="Type your answer here..."
          className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-[#00a368] focus:outline-none resize-none"
          rows={4}
        />
      )}
    </div>
  );
}
