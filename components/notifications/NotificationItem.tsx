import React from 'react';
import { MessageSquare, Share2, Info, AlertCircle } from 'lucide-react';
export interface Notification {
  id: string;
  type: 'response' | 'share' | 'system' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
}
interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}
export function NotificationItem({
  notification,
  onRead
}: NotificationItemProps) {
  const icons = {
    response: <MessageSquare className="h-5 w-5 text-green-600" />,
    share: <Share2 className="h-5 w-5 text-blue-600" />,
    system: <Info className="h-5 w-5 text-gray-600" />,
    alert: <AlertCircle className="h-5 w-5 text-red-600" />
  };
  const bgColors = {
    response: 'bg-green-100',
    share: 'bg-blue-100',
    system: 'bg-gray-100',
    alert: 'bg-red-100'
  };
  return <div className={`p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer ${notification.read ? 'opacity-70' : 'bg-white'}`} onClick={() => onRead(notification.id)}>
      <div className="flex gap-4">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${bgColors[notification.type]}`}>
          {icons[notification.type]}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className={`text-sm font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
              {notification.title}
            </h4>
            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
              {notification.time}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {notification.message}
          </p>
        </div>
        {!notification.read && <div className="w-2 h-2 bg-[#00a368] rounded-full mt-2"></div>}
      </div>
    </div>;
}
