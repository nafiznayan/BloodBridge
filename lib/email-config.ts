// Email configuration for different providers
export const emailConfig = {
  // Gmail configuration
  gmail: {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Use app-specific password for Gmail
    },
  },
  
  // Outlook/Hotmail configuration
  outlook: {
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
  
  // SendGrid configuration
  sendgrid: {
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  },
  
  // Custom SMTP configuration
  custom: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
};

// Get email configuration based on environment variable
export const getEmailConfig = () => {
  const provider = process.env.EMAIL_PROVIDER || 'gmail';
  
  if (provider === 'gmail' && emailConfig.gmail.auth.user) {
    return emailConfig.gmail;
  } else if (provider === 'outlook' && emailConfig.outlook.auth.user) {
    return emailConfig.outlook;
  } else if (provider === 'sendgrid' && process.env.SENDGRID_API_KEY) {
    return emailConfig.sendgrid;
  } else if (provider === 'custom' && emailConfig.custom.auth.user) {
    return emailConfig.custom;
  }
  
  // Default to Gmail if no valid configuration found
  console.warn('No valid email configuration found, using Gmail as default');
  return emailConfig.gmail;
};

// Email templates configuration
export const emailTemplates = {
  // Urgency level colors for email templates
  urgencyColors: {
    CRITICAL: '#FF0000',    // Red
    HIGH: '#FF6600',        // Orange
    MEDIUM: '#FFCC00',      // Yellow
    LOW: '#00CC00',         // Green
  },
  
  // Email subjects
  subjects: {
    emergencyNotification: (bloodGroup: string, city: string) => 
      `🚨 URGENT: Blood Request - ${bloodGroup} needed in ${city}`,
    requestConfirmation: 'Blood Request Confirmation - BloodBridge',
    donorResponse: (patientName: string) => 
      `Blood Donation Response - ${patientName}`,
  },
  
  // Reply-to addresses
  replyTo: process.env.REPLY_TO_EMAIL || process.env.EMAIL_USER,
};
