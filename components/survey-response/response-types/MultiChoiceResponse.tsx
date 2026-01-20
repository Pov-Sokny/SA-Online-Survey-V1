import React from 'react';
interface MultiChoiceResponseProps {
  options: string[];
  value?: string[];
  onChange: (value: string[]) => void;
  error?: string;
}
export function MultiChoiceResponse({
  options,
  value = [],
  onChange,
  error
}: MultiChoiceResponseProps) {
  const handleChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange([...value, option]);
    } else {
      onChange(value.filter(v => v !== option));
    }
  };
  return <div className="space-y-3">
      {options.map(option => {
      const isSelected = value.includes(option);
      return <label key={option} className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-50 ${isSelected ? 'border-[#00a368] bg-green-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
            <input type="checkbox" value={option} checked={isSelected} onChange={e => handleChange(option, e.target.checked)} className="w-5 h-5 rounded text-[#00a368] border-gray-300 focus:ring-[#00a368]" />
            <span className="ml-3 text-gray-900 font-medium">{option}</span>
          </label>;
    })}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>;
}
