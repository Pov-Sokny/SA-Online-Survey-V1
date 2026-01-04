import React from 'react';
import { TrendingUp, Users, CheckSquare, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
export default function SurveyStats() {
  const stats = [{
    label: 'Total Responses',
    value: '1,234',
    change: '+12%',
    trend: 'up',
    icon: <Users className="h-5 w-5 text-blue-600" />,
    bg: 'bg-blue-50'
  }, {
    label: 'Active Surveys',
    value: '8',
    change: '+2',
    trend: 'up',
    icon: <CheckSquare className="h-5 w-5 text-green-600" />,
    bg: 'bg-green-50'
  }, {
    label: 'Avg. Completion',
    value: '87%',
    change: '+5%',
    trend: 'up',
    icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
    bg: 'bg-purple-50'
  }, {
    label: 'Avg. Time',
    value: '2m 15s',
    change: '-10s',
    trend: 'down',
    icon: <Clock className="h-5 w-5 text-orange-600" />,
    bg: 'bg-orange-50'
  }];
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => <Card key={index} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </h3>
            </div>
            <div className={`p-2 rounded-lg ${stat.bg}`}>{stat.icon}</div>
          </div>
          <div className="mt-3 flex items-center text-xs">
            <span className={`font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-green-600'}`}>
              {stat.change}
            </span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </Card>)}
    </div>;
}
