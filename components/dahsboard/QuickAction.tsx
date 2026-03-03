import React from 'react';
import { Plus, Upload, BarChart2, Users, Wand2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
export default function QuickActions() {
  const actions = [{
    label: 'New Survey',
    icon: <Plus className="h-6 w-6 text-white" />,
    color: 'bg-[#00a368]',
    href: 'user/surveys/new'
  }, {
    label: 'Use Template',
    icon: <Wand2 className="h-6 w-6 text-white" />,
    color: 'bg-purple-500',
    href: 'user/templates'
  }, {
    label: 'Import Data',
    icon: <Upload className="h-6 w-6 text-white" />,
    color: 'bg-blue-500',
    href: '#'
  }, {
    label: 'Analytics',
    icon: <BarChart2 className="h-6 w-6 text-white" />,
    color: 'bg-orange-500',
    href: '#'
  }];
  return <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => <Link key={index} href={action.href} className="block group">
          <Card className="h-full p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer border-transparent hover:border-gray-200">
            <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform`}>
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-900">
              {action.label}
            </span>
          </Card>
        </Link>)}
    </div>;
}
