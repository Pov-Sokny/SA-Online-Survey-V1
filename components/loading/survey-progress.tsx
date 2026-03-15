'use client';

interface SurveyProgressProps {
  current: number;
  total: number;
}

export function SurveyProgress({ current, total }: SurveyProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Progress
        </span>
        <span className="text-sm font-bold text-[#00a368]">
          {current} of {total}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#00a368] to-[#00d98e] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
        {Math.round(percentage)}% complete
      </p>
    </div>
  );
}
