import React from 'react';
import { NotificationItem, Notification } from './NotificationItem';
import { Bell } from 'lucide-react';
interface NotificationListProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
}
export function NotificationList({
  notifications,
  onMarkRead
}: NotificationListProps) {
  if (notifications.length === 0) {
    return <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Bell className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
        <p className="text-gray-500 mt-1">You have no new notifications.</p>
      </div>;
  }
  return <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="divide-y divide-gray-100">
        {notifications.map(notification => <NotificationItem key={notification.id} notification={notification} onRead={onMarkRead} />)}
      </div>
    </div>;
}
