import React from 'react';
interface SingleChoiceResponseProps {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}
export function SingleChoiceResponse({
  options,
  value,
  onChange,
  error
}: SingleChoiceResponseProps) {
  return <div className="space-y-3">
      {options.map(option => <label key={option} className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-50 ${value === option ? 'border-[#00a368] bg-green-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
          <input type="radio" name="single-choice" value={option} checked={value === option} onChange={e => onChange(e.target.value)} className="w-5 h-5 text-[#00a368] border-gray-300 focus:ring-[#00a368]" />
          <span className="ml-3 text-gray-900 font-medium">{option}</span>
        </label>)}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>;
}
