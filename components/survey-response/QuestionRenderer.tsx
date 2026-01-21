import React from 'react';
import { SingleChoiceResponse } from './response-types/SingleChoiceResponse';
import { MultiChoiceResponse } from './response-types/MultiChoiceResponse';
import { TextResponse } from './response-types/TextResponse';
import { RatingResponse } from './response-types/RatingResponse';
import { MatrixResponse } from './response-types/MatrixResponse';
import { NPSResponse } from './response-types/NPSResponse';
interface Question {
  id: string;
  type: 'single' | 'multi' | 'text' | 'rating' | 'matrix' | 'nps';
  text: string;
  required?: boolean;
  helpText?: string;
  options?: string[];
  rows?: string[];
  columns?: string[];
  ratingMax?: number;
  ratingSymbol?: 'star' | 'number' | 'heart' | 'thumb';
  textLong?: boolean;
}
interface QuestionRendererProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}
export function QuestionRenderer({
  question,
  value,
  onChange,
  error
}: QuestionRendererProps) {
  const renderInput = () => {
    switch (question.type) {
      case 'single':
        return <SingleChoiceResponse options={question.options || []} value={value} onChange={onChange} error={error} />;
      case 'multi':
        return <MultiChoiceResponse options={question.options || []} value={value} onChange={onChange} error={error} />;
      case 'text':
        return <TextResponse long={question.textLong} value={value} onChange={onChange} error={error} />;
      case 'rating':
        return <RatingResponse max={question.ratingMax} symbol={question.ratingSymbol} value={value} onChange={onChange} error={error} />;
      case 'matrix':
        return <MatrixResponse rows={question.rows || []} columns={question.columns || []} value={value} onChange={onChange} error={error} />;
      case 'nps':
        return <NPSResponse value={value} onChange={onChange} error={error} />;
      default:
        return <div className="text-red-500">Unsupported question type</div>;
    }
  };
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {question.text}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </h2>
        {question.helpText && <p className="text-gray-500 text-sm">{question.helpText}</p>}
      </div>

      {renderInput()}
    </div>;
}
