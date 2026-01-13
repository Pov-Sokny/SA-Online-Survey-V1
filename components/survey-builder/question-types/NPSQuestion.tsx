import React from 'react';
export function NPSQuestion() {
  return <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4 py-4">
        <div className="flex w-full max-w-2xl">
          {Array.from({
          length: 11
        }).map((_, i) => <div key={i} className={`flex-1 aspect-square border-y border-r first:border-l border-gray-300 flex items-center justify-center text-sm font-medium
                ${i <= 6 ? 'bg-red-50 text-red-700' : i <= 8 ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'}
              `}>
              {i}
            </div>)}
        </div>
        <div className="flex justify-between w-full max-w-2xl text-xs text-gray-500 uppercase tracking-wide">
          <span>Not likely at all</span>
          <span>Extremely likely</span>
        </div>
      </div>

      <div className="p-4 bg-blue-50 text-blue-700 text-sm rounded-md">
        <p>
          <strong>Note:</strong> Net Promoter Score (NPS) is a standard metric.
          The scale is fixed from 0 to 10.
        </p>
      </div>
    </div>;
}
