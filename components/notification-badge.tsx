'use client';

import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/lib/notification-context';

export default function NotificationBadge() {
  const { unreadCount } = useNotifications();

  if (unreadCount === 0) {
    return null;
  }

  return (
    <div className="relative inline-block">
      <Bell className="h-5 w-5 text-gray-600" />
      <Badge 
        variant="destructive" 
        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
      >
        {unreadCount > 99 ? '99+' : unreadCount}
      </Badge>
    </div>
  );
}
