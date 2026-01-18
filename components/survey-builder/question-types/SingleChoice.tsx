'use client';

import { Plus, X, GripVertical, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Option {
  uuid: string;
  text: string;
  orderIndex?: number;
}

interface SingleChoiceProps {
  options: Option[];
  onChange: (options: Option[]) => void;
}

export function SingleChoice({
  options = [],
  onChange
}: SingleChoiceProps) {
  const addOption = () => {
    const newOption: Option = {
      uuid: `temp_option_${Date.now()}_${Math.random()}`,
      text: `Option ${options.length + 1}`,
      orderIndex: options.length
    };
    onChange([...options, newOption]);
  };

  const updateOption = (uuid: string, text: string) => {
    onChange(options.map(opt => opt.uuid === uuid ? {
      ...opt,
      text
    } : opt));
  };

  const removeOption = (uuid: string) => {
    onChange(options.filter(opt => opt.uuid !== uuid));
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <div key={option.uuid} className="flex items-center gap-3 group">
          <GripVertical className="h-4 w-4 text-gray-400 cursor-move opacity-0 group-hover:opacity-100" />
          <Circle className="h-4 w-4 text-gray-400" />
          <Input 
            value={option.text} 
            onChange={e => updateOption(option.uuid, e.target.value)} 
            className="flex-1" 
            placeholder={`Option ${index + 1}`} 
          />
          <button 
            onClick={() => removeOption(option.uuid)} 
            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-3 pl-7">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={addOption} 
          className="text-[#00a368] hover:text-[#008f5b] hover:bg-green-50 pl-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Option
        </Button>
        <span className="text-gray-300">|</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500 hover:text-gray-700"
        >
          Add "Other"
        </Button>
      </div>
    </div>
  );
}
