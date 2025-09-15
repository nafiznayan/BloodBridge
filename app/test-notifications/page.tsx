'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNotifications } from '@/lib/notification-context';
import { useAuth } from '@/lib/auth-context';
import { BloodGroup, UrgencyLevel } from '@/lib/types';

export default function TestNotificationsPage() {
  const { donor } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [isCreating, setIsCreating] = useState(false);

  const createTestRequest = async () => {
    if (!donor) return;
    
    setIsCreating(true);
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientName: 'Test Patient',
          hospitalName: 'Test Hospital',
          city: donor.city,
          state: donor.state,
          bloodGroup: donor.bloodGroup,
          urgency: 'CRITICAL' as UrgencyLevel,
          unitsNeeded: 2,
          contactName: 'Test Contact',
          contactPhone: '123-456-7890',
          contactEmail: 'test@example.com',
          additionalInfo: 'This is a test emergency blood request',
        }),
      });

      if (response.ok) {
        alert('Test request created! Check your notifications.');
        // Refresh notifications
        window.location.reload();
      } else {
        alert('Failed to create test request');
      }
    } catch (error) {
      console.error('Error creating test request:', error);
      alert('Error creating test request');
    } finally {
      setIsCreating(false);
    }
  };

  if (!donor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Test Notifications</CardTitle>
            <CardDescription>Please log in to test the notification system</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Test Notifications</CardTitle>
          <CardDescription>
            Test the notification system by creating a blood request that matches your profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Your Profile:</h3>
            <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
            <p><strong>City:</strong> {donor.city}</p>
            <p><strong>State:</strong> {donor.state}</p>
          </div>

          <Button 
            onClick={createTestRequest} 
            disabled={isCreating}
            className="w-full"
          >
            {isCreating ? 'Creating...' : 'Create Test Blood Request'}
          </Button>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Current Notifications:</h3>
            <p><strong>Unread Count:</strong> {unreadCount}</p>
            <p><strong>Total Notifications:</strong> {notifications.length}</p>
            
            {notifications.length > 0 && (
              <Button 
                onClick={markAllAsRead} 
                variant="outline" 
                size="sm"
                className="mt-2"
              >
                Mark All as Read
              </Button>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Notification Details:</h3>
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">{notification.message}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {notification.isRead ? 'Read' : 'Unread'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
