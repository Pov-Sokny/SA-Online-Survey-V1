import React from 'react';
import { Star, Heart, ThumbsUp } from 'lucide-react';
import { Select } from '@/components/ui/Select';
interface RatingQuestionProps {
  maxRating: number;
  symbol: 'star' | 'number' | 'heart' | 'thumb';
  onChange: (updates: {
    maxRating?: number;
    symbol?: 'star' | 'number' | 'heart' | 'thumb';
  }) => void;
}
export function RatingQuestion({
  maxRating,
  symbol,
  onChange
}: RatingQuestionProps) {
  const renderSymbol = (index: number) => {
    if (symbol === 'number') {
      return <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 font-medium hover:border-[#00a368] hover:text-[#00a368] cursor-pointer transition-colors">
          {index + 1}
        </div>;
    }
    const Icon = symbol === 'heart' ? Heart : symbol === 'thumb' ? ThumbsUp : Star;
    return <Icon className="w-8 h-8 text-gray-300 hover:text-[#00a368] cursor-pointer transition-colors" />;
  };
  return <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center py-6">
        {Array.from({
        length: maxRating
      }).map((_, i) => <div key={i}>{renderSymbol(i)}</div>)}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select label="Maximum Rating" value={maxRating.toString()} onChange={e => onChange({
        maxRating: parseInt(e.target.value)
      })} options={[{
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }, {
        value: '7',
        label: '7'
      }, {
        value: '10',
        label: '10'
      }]} />

        <Select label="Symbol" value={symbol} onChange={e => onChange({
        symbol: e.target.value as any
      })} options={[{
        value: 'star',
        label: 'Stars'
      }, {
        value: 'number',
        label: 'Numbers'
      }, {
        value: 'heart',
        label: 'Hearts'
      }, {
        value: 'thumb',
        label: 'Thumbs'
      }]} />
      </div>
    </div>;
}
