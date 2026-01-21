import React from 'react';
interface ProgressBarProps {
  current: number;
  total: number;
}
export function ProgressBar({
  current,
  total
}: ProgressBarProps) {
  const percentage = Math.round(current / total * 100);
  return <div className="w-full space-y-2">
      <div className="flex justify-between text-sm font-medium text-gray-500">
        <span>
          Question {current} of {total}
        </span>
        <span>{percentage}% completed</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#00a368] transition-all duration-500 ease-out rounded-full" style={{
        width: `${percentage}%`
      }} />
      </div>
    </div>;
}
