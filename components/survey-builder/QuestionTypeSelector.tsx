'use client';

import React, { useState } from 'react';
import { CheckCircle2, CheckSquare, AlignLeft, Star, BarChartHorizontal, BoxIcon } from 'lucide-react';
interface QuestionTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}
const types = [{
  id: 'single_choice',
  label: 'Single Choice',
  icon: CheckCircle2
}, {
  id: 'multiple_choice',
  label: 'Multiple Choice',
  icon: CheckSquare
}, {
  id: 'text',
  label: 'Text Answer',
  icon: AlignLeft
}, {
  id: 'rating',
  label: 'Rating',
  icon: Star
}, {
  id: 'matrix',
  label: 'Matrix',
  icon: BoxIcon
}, {
  id: 'nps',
  label: 'NPS',
  icon: BarChartHorizontal
}];
export function QuestionTypeSelector({
  value,
  onChange
}: QuestionTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedType = types.find(t => t.id === value) || types[0];
  return <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 min-w-[180px] justify-between">
        <div className="flex items-center gap-2">
          <selectedType.icon className="h-4 w-4 text-[#00a368]" />
          <span className="text-sm font-medium">{selectedType.label}</span>
        </div>
      </button>

      {isOpen && <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
          {types.map(type => <button key={type.id} onClick={() => {
        onChange(type.id);
        setIsOpen(false);
      }} className={`flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-50 ${value === type.id ? 'text-[#00a368] bg-green-50' : 'text-gray-700'}`}>
              <type.icon className="h-4 w-4" />
              {type.label}
            </button>)}
        </div>}
    </div>;
}
