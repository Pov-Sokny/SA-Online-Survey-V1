import React from 'react';
import { Button } from '../ui/button';
interface TemplateCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}
const categories = ['All Templates', 'Customer Feedback', 'Employee Engagement', 'Market Research', 'Event Registration', 'Education', 'Healthcare'];
export function TemplateCategories({
  selectedCategory,
  onSelectCategory
}: TemplateCategoriesProps) {
  return <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
      {categories.map(category => <Button key={category} variant={selectedCategory === category ? 'primary' : 'outline'} onClick={() => onSelectCategory(category)} className={`whitespace-nowrap ${selectedCategory === category ? 'bg-[#00a368] hover:bg-[#008f5b] border-transparent' : ''}`}>
          {category}
        </Button>)}
    </div>;
}
