import React from 'react';
// This is a simplified visual representation since we can't use a heavy diagramming library
// In a real app, we would use React Flow or similar
interface FlowNode {
  id: string;
  label: string;
  type: 'start' | 'question' | 'end';
  connections: string[];
}
export function FlowDiagram() {
  const nodes: FlowNode[] = [{
    id: 'start',
    label: 'Start',
    type: 'start',
    connections: ['q1']
  }, {
    id: 'q1',
    label: 'Q1: Satisfaction',
    type: 'question',
    connections: ['q2', 'q3']
  }, {
    id: 'q2',
    label: 'Q2: Feedback',
    type: 'question',
    connections: ['end']
  }, {
    id: 'q3',
    label: 'Q3: Reason',
    type: 'question',
    connections: ['end']
  }, {
    id: 'end',
    label: 'End',
    type: 'end',
    connections: []
  }];
  return <div className="w-full h-[400px] bg-gray-50 border rounded-lg overflow-hidden relative p-8 flex items-center justify-center">
      <div className="absolute top-4 right-4 bg-white p-2 rounded shadow text-xs text-gray-500">
        Visual Flow Preview
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* Start Node */}
        <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-[#00a368] flex items-center justify-center text-[#00a368] font-bold shadow-sm">
          Start
        </div>

        <div className="h-8 w-0.5 bg-gray-300"></div>

        {/* Q1 */}
        <div className="w-48 p-3 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
          <div className="text-xs text-gray-500 mb-1">Question 1</div>
          <div className="font-medium text-sm">How satisfied are you?</div>
        </div>

        <div className="relative w-full max-w-md h-16">
          {/* Branching lines */}
          <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-gray-300 -translate-x-1/2"></div>
          <div className="absolute top-8 left-1/4 right-1/4 h-0.5 bg-gray-300"></div>
          <div className="absolute top-8 left-1/4 w-0.5 h-8 bg-gray-300"></div>
          <div className="absolute top-8 right-1/4 w-0.5 h-8 bg-gray-300"></div>
        </div>

        <div className="flex gap-16">
          {/* Q2 */}
          <div className="w-40 p-3 bg-white border border-gray-200 rounded-lg shadow-sm text-center relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-100 px-2 py-0.5 rounded text-[10px] text-gray-500">
              If &gt; 3 stars
            </div>
            <div className="text-xs text-gray-500 mb-1">Question 2</div>
            <div className="font-medium text-sm">What did you like?</div>
          </div>

          {/* Q3 */}
          <div className="w-40 p-3 bg-white border border-gray-200 rounded-lg shadow-sm text-center relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-100 px-2 py-0.5 rounded text-[10px] text-gray-500">
              If &le; 3 stars
            </div>
            <div className="text-xs text-gray-500 mb-1">Question 3</div>
            <div className="font-medium text-sm">What can we improve?</div>
          </div>
        </div>

        <div className="relative w-full max-w-md h-16">
          {/* Merging lines */}
          <div className="absolute top-0 left-1/4 w-0.5 h-8 bg-gray-300"></div>
          <div className="absolute top-0 right-1/4 w-0.5 h-8 bg-gray-300"></div>
          <div className="absolute top-8 left-1/4 right-1/4 h-0.5 bg-gray-300"></div>
          <div className="absolute top-8 left-1/2 w-0.5 h-8 bg-gray-300 -translate-x-1/2"></div>
        </div>

        {/* End Node */}
        <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-400 flex items-center justify-center text-gray-600 font-bold shadow-sm">
          End
        </div>
      </div>
    </div>;
}
