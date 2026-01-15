import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Select } from '@/components/ui/select';
interface TextQuestionProps {
  isLong: boolean;
  validationType: string;
  onChange: (updates: {
    isLong?: boolean;
    validationType?: string;
  }) => void;
}
export function TextQuestion({
  isLong,
  validationType,
  onChange
}: TextQuestionProps) {
  return <div className="space-y-6">
      <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
        <div className="h-10 w-full bg-white border border-gray-200 rounded px-3 flex items-center text-gray-400 text-sm">
          {isLong ? 'Long answer text...' : 'Short answer text...'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-3 border rounded-md">
          <span className="text-sm font-medium text-gray-700">
            Long Answer (Paragraph)
          </span>
          <Switch checked={isLong} onCheckedChange={checked => onChange({
          isLong: checked
        })} />
        </div>

        <Select label="Input Validation" value={validationType} onChange={e => onChange({
        validationType: e.target.value
      })} options={[{
        value: 'none',
        label: 'None (Any text)'
      }, {
        value: 'email',
        label: 'Email Address'
      }, {
        value: 'number',
        label: 'Number'
      }, {
        value: 'url',
        label: 'Website URL'
      }, {
        value: 'date',
        label: 'Date'
      }]} />
      </div>
    </div>;
}
