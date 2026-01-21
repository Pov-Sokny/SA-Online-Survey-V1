import React, { useState } from 'react';
import { Star, Heart, ThumbsUp } from 'lucide-react';
interface RatingResponseProps {
  max?: number;
  symbol?: 'star' | 'number' | 'heart' | 'thumb';
  value?: number;
  onChange: (value: number) => void;
  error?: string;
}
export function RatingResponse({
  max = 5,
  symbol = 'star',
  value,
  onChange,
  error
}: RatingResponseProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const renderIcon = (index: number, filled: boolean) => {
    const className = `w-10 h-10 transition-colors ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`;
    switch (symbol) {
      case 'heart':
        return <Heart className={className.replace('text-yellow-400', 'text-red-500 fill-red-500')} />;
      case 'thumb':
        return <ThumbsUp className={className.replace('text-yellow-400', 'text-blue-500 fill-blue-500')} />;
      case 'number':
        return <div className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold border-2 transition-all ${filled ? 'border-[#00a368] bg-[#00a368] text-white' : 'border-gray-200 text-gray-500 hover:border-[#00a368] hover:text-[#00a368]'}`}>
            {index}
          </div>;
      default:
        return <Star className={className} />;
    }
  };
  return <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {Array.from({
        length: max
      }).map((_, i) => {
        const index = i + 1;
        const isFilled = (hoverValue !== null ? hoverValue : value || 0) >= index;
        return <button key={index} type="button" onClick={() => onChange(index)} onMouseEnter={() => setHoverValue(index)} onMouseLeave={() => setHoverValue(null)} className="focus:outline-none focus:ring-2 focus:ring-[#00a368] focus:ring-offset-2 rounded-full p-1" aria-label={`Rate ${index} out of ${max}`}>
              {renderIcon(index, isFilled)}
            </button>;
      })}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>;
}
