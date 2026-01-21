import React from 'react';
import { Textarea } from '../../ui/textarea';
import { Input } from '../../ui/input';
interface TextResponseProps {
  long?: boolean;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}
export function TextResponse({
  long,
  placeholder,
  value = '',
  onChange,
  error
}: TextResponseProps) {
  return <div className="space-y-2">
      {long ? <Textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || 'Type your answer here...'} className={`min-h-[120px] text-lg ${error ? 'border-red-500 focus:ring-red-500' : ''}`} /> : <Input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || 'Type your answer here...'} className={`text-lg py-6 ${error ? 'border-red-500 focus:ring-red-500' : ''}`} />}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>;
}
