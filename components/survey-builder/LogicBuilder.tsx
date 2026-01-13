import React, { useState } from 'react';
import { Plus, GitBranch, Save } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Select } from '../ui/Select';
import { LogicRule } from './LogicRule';
import { ConditionBuilder } from './ConditionBuilder';
import { FlowDiagram } from './FlowDiagram';
import { Dialog } from '../ui/Dialog';
export function LogicBuilder() {
  const [rules, setRules] = useState([{
    id: '1',
    ifCondition: 'Q1 equals "Satisfied"',
    thenAction: 'Show Q2'
  }, {
    id: '2',
    ifCondition: 'Q1 equals "Dissatisfied"',
    thenAction: 'Show Q3'
  }]);
  const [isAddingRule, setIsAddingRule] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'flow'>('list');
  // Mock questions for the builder
  const questions = [{
    id: 'q1',
    text: 'How satisfied are you with our service?',
    type: 'rating'
  }, {
    id: 'q2',
    text: 'What did you like most?',
    type: 'text'
  }, {
    id: 'q3',
    text: 'How can we improve?',
    type: 'text'
  }, {
    id: 'q4',
    text: 'Would you recommend us?',
    type: 'nps'
  }];
  const handleAddRule = () => {
    // In a real app, this would save the rule from the dialog
    const newRule = {
      id: Math.random().toString(36).substring(2, 9),
      ifCondition: 'New Condition',
      thenAction: 'Skip to End'
    };
    setRules([...rules, newRule]);
    setIsAddingRule(false);
  };
  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-[#00a368]" />
          Logic & Flow Control
        </h2>

        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-[#00a368]' : 'text-gray-600 hover:text-gray-900'}`}>
            Rules List
          </button>
          <button onClick={() => setViewMode('flow')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'flow' ? 'bg-white shadow text-[#00a368]' : 'text-gray-600 hover:text-gray-900'}`}>
            Visual Flow
          </button>
        </div>
      </div>

      {viewMode === 'list' ? <div className="space-y-4">
          {rules.length === 0 ? <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <GitBranch className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">
                No logic rules yet
              </h3>
              <p className="text-gray-500 mb-4">
                Add rules to create dynamic survey paths based on answers.
              </p>
              <Button onClick={() => setIsAddingRule(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Rule
              </Button>
            </div> : <>
              <div className="space-y-2">
                {rules.map(rule => <LogicRule key={rule.id} id={rule.id} ifCondition={rule.ifCondition} thenAction={rule.thenAction} onEdit={() => setIsAddingRule(true)} onDelete={handleDeleteRule} />)}
              </div>

              <Button variant="outline" onClick={() => setIsAddingRule(true)} className="w-full border-dashed">
                <Plus className="h-4 w-4 mr-2" />
                Add Another Rule
              </Button>
            </>}
        </div> : <FlowDiagram />}

      <Dialog isOpen={isAddingRule} onClose={() => setIsAddingRule(false)} title="Add Logic Rule">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              IF Condition
            </h4>
            <ConditionBuilder conditions={[{
            id: '1',
            questionId: 'q1',
            operator: 'equals',
            value: ''
          }]} onChange={() => {}} questions={questions} />
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              THEN Action
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select label="Action" options={[{
              value: 'skip_to',
              label: 'Skip to question'
            }, {
              value: 'show',
              label: 'Show question'
            }, {
              value: 'hide',
              label: 'Hide question'
            }, {
              value: 'end_survey',
              label: 'End survey'
            }]} />
              <Select label="Target" options={questions.map(q => ({
              value: q.id,
              label: q.text
            }))} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={() => setIsAddingRule(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRule}>Save Rule</Button>
          </div>
        </div>
      </Dialog>
    </div>;
}
