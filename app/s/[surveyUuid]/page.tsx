"use client"
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SurveyHeader } from '@/components/survey-response/SurveyHeader';
import { QuestionRenderer } from '@/components/survey-response/QuestionRenderer';
import { NavigationButtons } from '@/components/survey-response/NavigationButtons';
// Mock data
const MOCK_SURVEY = {
  id: '1',
  title: 'Customer Satisfaction Survey',
  description: 'Please help us improve our services by answering a few questions. It will only take 2 minutes.',
  questions: [{
    id: 'q1',
    type: 'nps',
    text: 'How likely are you to recommend our product to a friend or colleague?',
    required: true
  }, {
    id: 'q2',
    type: 'single',
    text: 'How long have you been using our product?',
    options: ['Less than a month', '1-6 months', '6-12 months', 'More than a year'],
    required: true
  }, {
    id: 'q3',
    type: 'rating',
    text: 'How would you rate the quality of our customer support?',
    ratingMax: 5,
    ratingSymbol: 'star',
    required: false
  }, {
    id: 'q4',
    type: 'matrix',
    text: 'Please rate the following features:',
    rows: ['Ease of use', 'Performance', 'Design', 'Reliability'],
    columns: ['Poor', 'Fair', 'Good', 'Excellent'],
    required: true
  }, {
    id: 'q5',
    type: 'text',
    text: 'Do you have any other feedback for us?',
    textLong: true,
    helpText: 'Your feedback is valuable to us.',
    required: false
  }] as any[]
};
export default function SurveyPage() {
  const params = useParams();
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const survey = MOCK_SURVEY;
  const currentQuestion = survey.questions[currentQuestionIndex];
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === survey.questions.length - 1;
  const handleAnswerChange = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
    // Clear error when user answers
    if (errors[currentQuestion.id]) {
      setErrors(prev => {
        const newErrors = {
          ...prev
        };
        delete newErrors[currentQuestion.id];
        return newErrors;
      });
    }
  };
  const validateCurrentQuestion = () => {
    if (currentQuestion.required) {
      const answer = answers[currentQuestion.id];
      const isEmpty = answer === undefined || answer === null || answer === '' || Array.isArray(answer) && answer.length === 0;
      if (isEmpty) {
        setErrors(prev => ({
          ...prev,
          [currentQuestion.id]: 'This question is required'
        }));
        return false;
      }
    }
    return true;
  };
  const handleNext = () => {
    if (validateCurrentQuestion()) {
      if (isLast) {
        // Submit survey
        console.log('Submitting answers:', answers);
        router.push(`/s/${params.surveyId}/thank-you`);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };
  const handleBack = () => {
    if (!isFirst) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  return <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <SurveyHeader title={survey.title} description={survey.description} currentQuestion={currentQuestionIndex + 1} totalQuestions={survey.questions.length} />

        <QuestionRenderer question={currentQuestion} value={answers[currentQuestion.id]} onChange={handleAnswerChange} error={errors[currentQuestion.id]} />

        <NavigationButtons onNext={handleNext} onBack={handleBack} isFirst={isFirst} isLast={isLast} canContinue={true} />
      </div>
    </div>;
}
