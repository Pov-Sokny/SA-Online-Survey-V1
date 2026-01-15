import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Select } from '../ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
interface Condition {
  id: string;
  questionId: string;
  operator: string;
  value: string;
}
interface ConditionBuilderProps {
  conditions: Condition[];
  onChange: (conditions: Condition[]) => void;
  questions: {
    id: string;
    text: string;
    type: string;
  }[];
}
export function ConditionBuilder({
  conditions,
  onChange,
  questions
}: ConditionBuilderProps) {
  const addCondition = () => {
    const newCondition: Condition = {
      id: Math.random().toString(36).substring(2, 9),
      questionId: questions[0]?.id || '',
      operator: 'equals',
      value: ''
    };
    onChange([...conditions, newCondition]);
  };
  const removeCondition = (id: string) => {
    onChange(conditions.filter(c => c.id !== id));
  };
  const updateCondition = (id: string, field: keyof Condition, value: string) => {
    onChange(conditions.map(c => c.id === id ? {
      ...c,
      [field]: value
    } : c));
  };
  const operators = [{
    value: 'equals',
    label: 'Equals'
  }, {
    value: 'not_equals',
    label: 'Does not equal'
  }, {
    value: 'contains',
    label: 'Contains'
  }, {
    value: 'greater_than',
    label: 'Greater than'
  }, {
    value: 'less_than',
    label: 'Less than'
  }, {
    value: 'is_empty',
    label: 'Is empty'
  }, {
    value: 'is_not_empty',
    label: 'Is not empty'
  }];
  return <div className="space-y-3">
      {conditions.map((condition, index) => <div key={condition.id} className="flex items-start gap-2">
          {index > 0 && <div className="pt-2 px-2 text-xs font-bold text-gray-500 uppercase">
              AND
            </div>}

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 bg-gray-50 p-3 rounded-md border">
            <Select label="" value={condition.questionId} onChange={e => updateCondition(condition.id, 'questionId', e.target.value)} options={questions.map(q => ({
          value: q.id,
          label: q.text.substring(0, 30) + (q.text.length > 30 ? '...' : '')
        }))} />

            <Select label="" value={condition.operator} onChange={e => updateCondition(condition.id, 'operator', e.target.value)} options={operators} />

            {!['is_empty', 'is_not_empty'].includes(condition.operator) && <Input label="" value={condition.value} onChange={e => updateCondition(condition.id, 'value', e.target.value)} placeholder="Value" />}
          </div>

          <button onClick={() => removeCondition(condition.id)} className="mt-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>)}

      <Button variant="outline" size="sm" onClick={addCondition} className="mt-2 text-[#00a368] border-[#00a368] hover:bg-green-50">
        <Plus className="h-4 w-4 mr-2" />
        Add Condition
      </Button>
    </div>;
}
