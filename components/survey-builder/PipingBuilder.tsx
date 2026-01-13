import React from 'react';
import { ArrowRightLeft, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
export function PipingBuilder() {
  const insertVariable = (variable: string) => {
    // In a real app, this would insert text into the focused editor
    console.log('Insert:', variable);
  };
  const variables = [{
    label: 'Respondent Name',
    onClick: () => insertVariable('{{respondent.name}}')
  }, {
    label: 'Respondent Email',
    onClick: () => insertVariable('{{respondent.email}}')
  }, {
    label: 'Q1 Answer',
    onClick: () => insertVariable('{{q1.answer}}')
  }, {
    label: 'Q2 Answer',
    onClick: () => insertVariable('{{q2.answer}}')
  }, {
    label: 'Current Date',
    onClick: () => insertVariable('{{date.today}}')
  }];
  return <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">Text Piping</span>
        </div>
      </div>

      <p className="text-xs text-blue-700 mb-3">
        Insert answers from previous questions or respondent data into your
        question text.
      </p>

      <Dropdown label="Insert Variable" items={variables} className="w-full" trigger={<Button variant="outline" size="sm" className="w-full bg-white text-blue-700 border-blue-200 hover:bg-blue-50">
            <Plus className="h-3 w-3 mr-2" />
            Insert Variable
          </Button>} />
    </div>;
}
