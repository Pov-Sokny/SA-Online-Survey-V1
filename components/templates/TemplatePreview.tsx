import React from 'react';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Clock, HelpCircle, X, Check } from 'lucide-react';
import type { Template } from './TemplateCard';
import Link from 'next/link';
interface TemplatePreviewProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}
export function TemplatePreview({
  template,
  isOpen,
  onClose
}: TemplatePreviewProps) {
  if (!template) return null;
  // Mock questions for preview
  const mockQuestions = [{
    id: 1,
    type: 'Single Choice',
    text: 'How satisfied are you with our service?',
    required: true
  }, {
    id: 2,
    type: 'Rating',
    text: 'Rate your overall experience',
    required: true
  }, {
    id: 3,
    type: 'Text',
    text: 'What could we improve?',
    required: false
  }, {
    id: 4,
    type: 'NPS',
    text: 'How likely are you to recommend us?',
    required: true
  }];
  return <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ${isOpen ? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-[#00a368]/10 text-[#00a368] hover:bg-[#00a368]/20 border-0">
                {template.category}
              </Badge>
              {template.popular && <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  Popular
                </Badge>}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {template.title}
            </h2>
            <p className="text-gray-500 mt-1">{template.description}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>{template.questionCount} Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{template.timeEstimate} to complete</span>
              </div>
            </div>

            {mockQuestions.map((q, i) => <div key={q.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500 shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900">{q.text}</h3>
                      {q.required && <span className="text-red-500">*</span>}
                    </div>
                    <div className="h-10 bg-gray-50 rounded border border-gray-100 w-full flex items-center px-3 text-sm text-gray-400">
                      {q.type} input placeholder...
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Link href={`/surveys/new?template=${template.id}`}>
            <Button className="bg-[#00a368] hover:bg-[#008f5b]">
              <Check className="h-4 w-4 mr-2" />
              Use This Template
            </Button>
          </Link>
        </div>
      </div>
    </div>;
}
