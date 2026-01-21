import React from 'react';
interface NPSResponseProps {
  value?: number;
  onChange: (value: number) => void;
  error?: string;
}
export function NPSResponse({
  value,
  onChange,
  error
}: NPSResponseProps) {
  return <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center sm:justify-between">
        {Array.from({
        length: 11
      }).map((_, i) => {
        const isSelected = value === i;
        let colorClass = 'hover:border-[#00a368] hover:text-[#00a368]';
        if (isSelected) {
          if (i <= 6) colorClass = 'bg-red-500 border-red-500 text-white';else if (i <= 8) colorClass = 'bg-yellow-500 border-yellow-500 text-white';else colorClass = 'bg-[#00a368] border-[#00a368] text-white';
        }
        return <button key={i} type="button" onClick={() => onChange(i)} className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg border-2 text-lg font-bold transition-all ${isSelected ? colorClass : 'border-gray-200 text-gray-600 hover:border-[#00a368] hover:text-[#00a368]'}`}>
              {i}
            </button>;
      })}
      </div>

      <div className="flex justify-between text-sm text-gray-500 font-medium px-1">
        <span>Not likely at all</span>
        <span>Extremely likely</span>
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>;
}
