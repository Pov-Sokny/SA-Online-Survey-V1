import React from 'react';
import { Clock, Edit, UserPlus, CheckCircle, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
export default function RecentActivity() {
  const activities = [{
    id: 1,
    type: 'response',
    user: 'Anonymous',
    action: 'completed',
    target: 'Customer Satisfaction Survey',
    time: '2 minutes ago',
    icon: <CheckCircle className="h-4 w-4 text-green-500" />
  }, {
    id: 2,
    type: 'edit',
    user: 'You',
    action: 'updated',
    target: 'Product Feedback Q3',
    time: '1 hour ago',
    icon: <Edit className="h-4 w-4 text-blue-500" />
  }, {
    id: 3,
    type: 'create',
    user: 'Sarah Smith',
    action: 'created',
    target: 'Employee Engagement 2024',
    time: '3 hours ago',
    icon: <FileText className="h-4 w-4 text-purple-500" />
  }, {
    id: 4,
    type: 'invite',
    user: 'You',
    action: 'invited',
    target: 'john@example.com',
    time: 'Yesterday',
    icon: <UserPlus className="h-4 w-4 text-orange-500" />
  }];
  return <Card className="h-full">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-[#00a368] hover:underline">
          View All
        </button>
      </div>
      <div className="p-0">
        <ul className="divide-y divide-gray-100">
          {activities.map(activity => <li key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5 bg-gray-100 p-1.5 rounded-full">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user}{' '}
                    <span className="text-gray-500 font-normal">
                      {activity.action}
                    </span>{' '}
                    {activity.target}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            </li>)}
        </ul>
      </div>
    </Card>;
}
