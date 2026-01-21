import React from 'react';
import { ProgressBar } from './ProgressBar';
interface SurveyHeaderProps {
  title: string;
  description?: string;
  currentQuestion: number;
  totalQuestions: number;
}
export function SurveyHeader({
  title,
  description,
  currentQuestion,
  totalQuestions
}: SurveyHeaderProps) {
  return <div className="space-y-6 mb-8">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {title}
        </h1>
        {description && <p className="text-gray-600 text-lg leading-relaxed">{description}</p>}
      </div>

      <ProgressBar current={currentQuestion} total={totalQuestions} />
    </div>;
}
