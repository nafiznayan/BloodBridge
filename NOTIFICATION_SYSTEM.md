# Notification System Documentation

## Overview
The BloodBridge application now includes a real-time notification system that alerts donors when emergency blood requests match their blood group and city.

## Features

### 1. Real-time Notifications
- Notifications appear automatically when new blood requests are created
- Only donors with matching blood group and city receive notifications
- Notifications include detailed information about the emergency request

### 2. Notification Display
- Bell icon with unread count badge in the header
- Dropdown menu showing all notifications
- Unread notifications are highlighted
- Click to mark individual notifications as read
- "Mark all as read" functionality

### 3. Notification Content
Each notification includes:
- Patient name and hospital
- Blood group and units needed
- Location (city and state)
- Urgency level
- Contact information
- Additional details
- Timestamp

## Technical Implementation

### Database Schema
- New `Notification` table with relationships to `Donor` and `BloodRequest`
- Automatic cleanup when donors or requests are deleted

### API Endpoints
- `GET /api/notifications` - Fetch donor's notifications
- `PUT /api/notifications/[id]/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all notifications as read

### Real-time Updates
- Polling every 30 seconds for new notifications
- Automatic refresh when donor logs in
- Context-based state management

## Usage

### For Donors
1. Log in to your account
2. Look for the bell icon in the header
3. Click to view notifications
4. Click on notifications to mark as read
5. Use "Mark all as read" to clear all unread notifications

### For Developers
1. Notifications are automatically created when blood requests are submitted
2. The system matches donors based on blood group and city
3. Notifications are non-blocking and won't affect request creation
4. Test the system using the `/test-notifications` page

## Testing

### Test Notifications Page
Visit `/test-notifications` to:
- View your current profile information
- Create test blood requests
- See real-time notification creation
- Test notification marking functionality

### Manual Testing
1. Log in as a donor
2. Create a blood request with matching blood group and city
3. Check if the donor receives a notification
4. Verify notification content and functionality

## Configuration

### Polling Interval
The notification polling interval can be adjusted in `lib/notification-context.tsx`:
```typescript
// Set up polling for new notifications every 30 seconds
const interval = setInterval(fetchNotifications, 30000);
```

### Notification Matching Criteria
Currently matches donors based on:
- Blood group (exact match)
- City (exact match)
- Availability status (must be true)

Additional criteria can be added in `lib/notification-service.ts`.

## Troubleshooting

### Common Issues
1. **Notifications not appearing**: Check if donor's blood group and city match the request
2. **Real-time updates not working**: Verify the notification context is properly wrapped
3. **Database errors**: Run `npx prisma migrate dev` to ensure schema is up to date

### Debug Information
- Check browser console for API errors
- Verify notification records in the database
- Check if the donor is marked as available

## Future Enhancements

### Planned Features
- Push notifications for mobile devices
- Email notifications integration
- Notification preferences and settings
- Advanced filtering and search
- Notification history and analytics

### Customization Options
- Configurable matching criteria
- Notification frequency settings
- Priority-based notification ordering
- Custom notification templates
