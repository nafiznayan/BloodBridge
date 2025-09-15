'use client';

import { useState } from 'react';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/lib/notification-context';
import { formatDistanceToNow } from 'date-fns';
import { URGENCY_COLORS, URGENCY_LABELS } from '@/lib/types';

export default function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const handleNotificationClick = (notificationId: string) => {
    markAsRead(notificationId);
    setIsOpen(false);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-2 border-b">
          <h3 className="font-semibold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`p-3 cursor-pointer hover:bg-gray-50 ${
                !notification.isRead ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className="flex items-start space-x-3 w-full">
                <div className="flex-shrink-0 mt-1">
                  {notification.isRead ? (
                    <CheckCheck className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      notification.isRead ? 'text-gray-700' : 'text-gray-900'
                    }`}>
                      {notification.message}
                    </p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        notification.bloodRequest?.urgency 
                          ? URGENCY_COLORS[notification.bloodRequest.urgency].replace('bg-', 'border-').replace('500', '600')
                          : 'border-gray-300'
                      }`}
                    >
                      {notification.bloodRequest?.urgency 
                        ? URGENCY_LABELS[notification.bloodRequest.urgency]
                        : 'Unknown'
                      }
                    </Badge>
                  </div>
                  
                  {notification.bloodRequest && (
                    <div className="mt-2 text-xs text-gray-500 space-y-1">
                      <p><strong>Patient:</strong> {notification.bloodRequest.patientName}</p>
                      <p><strong>Hospital:</strong> {notification.bloodRequest.hospitalName}</p>
                      <p><strong>Location:</strong> {notification.bloodRequest.city}, {notification.bloodRequest.state}</p>
                      <p><strong>Units needed:</strong> {notification.bloodRequest.unitsNeeded}</p>
                      <p><strong>Contact:</strong> {notification.bloodRequest.contactName} - {notification.bloodRequest.contactPhone}</p>
                      {notification.bloodRequest.additionalInfo && (
                        <p><strong>Additional Info:</strong> {notification.bloodRequest.additionalInfo}</p>
                      )}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-400 mt-2">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
