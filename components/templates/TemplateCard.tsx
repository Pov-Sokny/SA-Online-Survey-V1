import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Eye, Copy, FileText } from 'lucide-react';
import Link from 'next/link';
export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  questionCount: number;
  timeEstimate: string;
  popular?: boolean;
}
interface TemplateCardProps {
  template: Template;
  onPreview: (template: Template) => void;
}
export function TemplateCard({
  template,
  onPreview
}: TemplateCardProps) {
  return <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200 group relative overflow-hidden">
      {template.popular && <div className="absolute top-3 right-3 z-10">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Popular
          </Badge>
        </div>}

      <div className="h-32 bg-gray-50 flex items-center justify-center border-b border-gray-100 group-hover:bg-green-50 transition-colors">
        <FileText className="h-12 w-12 text-gray-300 group-hover:text-[#00a368] transition-colors" />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs font-normal text-gray-500 mb-2">
            {template.category}
          </Badge>
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1" title={template.title}>
            {template.title}
          </h3>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
          {template.description}
        </p>

        <div className="flex items-center text-xs text-gray-400 mb-4 space-x-3">
          <span>{template.questionCount} Questions</span>
          <span>•</span>
          <span>{template.timeEstimate}</span>
        </div>

        <div className="flex gap-2 mt-auto">
          <Button variant="outline" className="flex-1" onClick={() => onPreview(template)}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Link href={`/surveys/new?template=${template.id}`} className="flex-1">
            <Button className="w-full bg-[#00a368] hover:bg-[#008f5b]">
              <Copy className="h-4 w-4 mr-2" />
              Use
            </Button>
          </Link>
        </div>
      </div>
    </Card>;
}
