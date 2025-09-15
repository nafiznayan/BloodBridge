# BloodBridge Email Notification System Setup

This document explains how to set up and configure the automatic email notification system for BloodBridge.

## Overview

The email notification system automatically sends emails to matching donors when a new blood request is created. It includes:

- **Emergency notifications** to donors matching blood group, city, and availability
- **Confirmation emails** to request creators
- **Smart donor matching** with prioritization based on eligibility criteria
- **Multi-provider support** (Gmail, Outlook, SendGrid, Custom SMTP)

## Features

### Automatic Donor Matching
- Matches donors by blood group, city, and availability
- Excludes donors who donated recently (configurable, default: 90 days)
- Prioritizes donors based on eligibility score
- Falls back to state-level matching if no city matches found

### Email Templates
- **Emergency Notification**: Rich HTML template with request details and contact information
- **Confirmation Email**: Confirms request submission to the creator
- Responsive design with urgency-based color coding
- Direct reply-to functionality

### Smart Prioritization
- Donors who haven't donated recently get higher priority
- Age and weight considerations
- Geographic proximity scoring
- Availability status checking

## Setup Instructions

### 1. Install Dependencies

```bash
npm install nodemailer @types/nodemailer
```

### 2. Environment Configuration

Create a `.env.local` file in your project root with the following variables:

```env
# Email Configuration
EMAIL_PROVIDER=gmail  # Options: gmail, outlook, sendgrid, custom
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# For Gmail (Recommended for development)
EMAIL_PROVIDER=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# For Outlook/Hotmail
EMAIL_PROVIDER=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password

# For SendGrid
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key

# For Custom SMTP
EMAIL_PROVIDER=custom
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASS=your-password

# Optional: Reply-to email (defaults to EMAIL_USER if not set)
REPLY_TO_EMAIL=noreply@yourdomain.com
```

### 3. Gmail Setup (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `EMAIL_PASSWORD`

### 4. Database Schema

Ensure your Prisma schema includes the necessary fields:

```prisma
model Donor {
  id                String    @id @default(cuid())
  name              String
  email             String    @unique
  bloodGroup        BloodGroup
  city              String
  state             String
  age               Int
  weight            Int
  available         Boolean   @default(true)
  lastDonationDate  DateTime?
  // ... other fields
}

model BloodRequest {
  id          String        @id @default(cuid())
  patientName String
  hospitalName String
  city        String
  state       String
  bloodGroup  BloodGroup
  urgency     UrgencyLevel
  unitsNeeded Int
  contactName String
  contactPhone String
  contactEmail String
  additionalInfo String?
  isActive    Boolean       @default(true)
  // ... other fields
}
```

## How It Works

### 1. Blood Request Creation
When a new blood request is submitted:

```typescript
// In app/api/requests/route.ts
const bloodRequest = await prisma.bloodRequest.create({
  data: { /* request data */ }
});

// Automatic notifications (non-blocking)
sendEmergencyNotifications(bloodRequest).catch(console.error);
sendRequestConfirmation(bloodRequest).catch(console.error);
```

### 2. Donor Matching
The system automatically finds matching donors:

```typescript
// Find donors matching blood group, city, and availability
const matchingDonors = await getPrioritizedDonors(request, {
  excludeRecentDonors: true,
  recentDonationDays: 90,
  minAge: 18,
  maxAge: 65,
  minWeight: 50
});
```

### 3. Email Sending
Emergency notifications are sent to all matching donors:

```typescript
// Send to each matching donor
for (const donor of matchingDonors) {
  await sendEmergencyNotification(donor, request);
}
```

## Customization

### Email Templates
Modify templates in `lib/email-service.ts`:

```typescript
const createEmergencyEmailTemplate = (donor: Donor, request: BloodRequest) => {
  // Customize your HTML template here
  return `...`;
};
```

### Donor Matching Criteria
Adjust matching logic in `lib/donor-matching.ts`:

```typescript
export const findMatchingDonors = async (
  request: BloodRequest,
  criteria: Partial<DonorMatchCriteria> = {}
) => {
  // Customize your matching logic
};
```

### Email Provider Configuration
Add new providers in `lib/email-config.ts`:

```typescript
export const emailConfig = {
  // Add your custom provider
  customProvider: {
    host: 'smtp.custom.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.CUSTOM_USER,
      pass: process.env.CUSTOM_PASS,
    },
  },
};
```

## Testing

### 1. Test Email Configuration
Create a test endpoint to verify email setup:

```typescript
// app/api/test-email/route.ts
export async function POST() {
  try {
    const testEmail = await sendTestEmail();
    return NextResponse.json({ success: true, message: 'Test email sent' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
```

### 2. Test Donor Matching
Verify donor matching logic:

```typescript
const testRequest = {
  bloodGroup: 'A_POSITIVE',
  city: 'New York',
  state: 'NY'
};

const matchingDonors = await findMatchingDonors(testRequest);
console.log(`Found ${matchingDonors.length} matching donors`);
```

## Monitoring and Logging

The system includes comprehensive logging:

```typescript
// Check console logs for:
console.log(`Emergency notifications sent to ${successfulSends.length} donors`);
console.log(`Confirmation email sent to ${request.contactEmail}`);
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify email credentials
   - For Gmail: Use app-specific password, not regular password
   - Check 2FA is enabled

2. **No Emails Sent**
   - Check environment variables
   - Verify donor data exists
   - Check console logs for errors

3. **Emails Going to Spam**
   - Use professional email domain
   - Configure SPF/DKIM records
   - Avoid spam trigger words

### Debug Mode
Enable detailed logging:

```typescript
// In lib/email-service.ts
const transporter = createTransporter();
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready');
  }
});
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **Email Validation**: Validate email addresses before sending
3. **Rate Limiting**: Consider implementing rate limiting for email sending
4. **Data Privacy**: Ensure compliance with data protection regulations

## Performance Optimization

1. **Async Processing**: Email sending is non-blocking
2. **Batch Processing**: Consider batching emails for large donor lists
3. **Caching**: Cache donor queries for repeated requests
4. **Queue System**: For production, consider using a job queue (Redis, Bull)

## Production Deployment

1. **Use Professional Email Service**: SendGrid, Mailgun, or AWS SES
2. **Monitor Delivery Rates**: Track email delivery and bounce rates
3. **Implement Retry Logic**: Retry failed email sends
4. **Set Up Monitoring**: Monitor system health and email delivery

## Support

For issues or questions:
1. Check console logs for error messages
2. Verify environment configuration
3. Test email provider connectivity
4. Review donor data and matching criteria
