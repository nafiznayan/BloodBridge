import nodemailer from 'nodemailer';
import { BloodRequest, Donor } from '@prisma/client';
import { getEmailConfig, emailTemplates } from './email-config';
import { getPrioritizedDonors } from './donor-matching';

// Create transporter with dynamic configuration
const createTransporter = () => {
  const config = getEmailConfig();
  return nodemailer.createTransport(config);
};

// Email template for emergency blood request
const createEmergencyEmailTemplate = (donor: Donor, request: BloodRequest) => {
  const urgencyColor = emailTemplates.urgencyColors[request.urgency] || '#666666';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Emergency Blood Request - BloodBridge</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
        .urgency-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; color: white; font-weight: bold; margin: 10px 0; }
        .request-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
        .contact-info { background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🩸 Emergency Blood Request</h1>
          <p>Your help is urgently needed!</p>
        </div>
        
        <div class="content">
          <p>Dear <strong>${donor.name}</strong>,</p>
          
          <p>We have an <strong>emergency blood request</strong> that matches your blood group and location. Your immediate response could save a life!</p>
          
          <div class="urgency-badge" style="background-color: ${urgencyColor}">
            ${request.urgency} URGENCY
          </div>
          
          <div class="request-details">
            <h3>📋 Request Details:</h3>
            <ul>
              <li><strong>Patient:</strong> ${request.patientName}</li>
              <li><strong>Hospital:</strong> ${request.hospitalName}</li>
              <li><strong>Location:</strong> ${request.city}, ${request.state}</li>
              <li><strong>Blood Group Needed:</strong> ${request.bloodGroup.replace('_', ' ')}</li>
              <li><strong>Units Required:</strong> ${request.unitsNeeded}</li>
              ${request.additionalInfo ? `<li><strong>Additional Info:</strong> ${request.additionalInfo}</li>` : ''}
            </ul>
          </div>
          
          <div class="contact-info">
            <h3>📞 Contact Information:</h3>
            <p><strong>Contact Person:</strong> ${request.contactName}</p>
            <p><strong>Phone:</strong> ${request.contactPhone}</p>
            <p><strong>Email:</strong> ${request.contactEmail}</p>
          </div>
          
          <p><strong>Please respond immediately</strong> if you can help. Every minute counts in emergency situations.</p>
          
          <div style="text-align: center;">
            <a href="mailto:${request.contactEmail}?subject=Blood%20Donation%20Response%20-%20${request.patientName}" class="cta-button">
              📧 Respond to Request
            </a>
          </div>
          
          <p><em>If you're unable to donate at this time, please consider sharing this request with others who might be able to help.</em></p>
        </div>
        
        <div class="footer">
          <p>Thank you for being a lifesaver! 💙</p>
          <p>BloodBridge - Connecting donors with those in need</p>
          <p>This is an automated notification. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Function to find matching donors (keeping for backward compatibility)
export const findMatchingDonors = async (request: BloodRequest) => {
  return await getPrioritizedDonors(request);
};

// Function to send emergency notification emails
export const sendEmergencyNotifications = async (request: BloodRequest) => {
  try {
    // Find matching donors
    const matchingDonors = await findMatchingDonors(request);
    
    if (matchingDonors.length === 0) {
      console.log('No matching donors found for this request');
      return { success: true, donorsNotified: 0 };
    }
    
    // Send emails to all matching donors
    const emailPromises = matchingDonors.map(async (donor) => {
      try {
        const emailTemplate = createEmergencyEmailTemplate(donor, request);
        
        const transporter = createTransporter();
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: donor.email,
          subject: emailTemplates.subjects.emergencyNotification(request.bloodGroup, request.city),
          html: emailTemplate,
          replyTo: emailTemplates.replyTo,
        };
        
        await transporter.sendMail(mailOptions);
        console.log(`Emergency notification sent to ${donor.email}`);
        
        return { success: true, donorId: donor.id, email: donor.email };
      } catch (error) {
        console.error(`Failed to send email to ${donor.email}:`, error);
        return { success: false, donorId: donor.id, email: donor.email, error };
      }
    });
    
    const results = await Promise.all(emailPromises);
    const successfulSends = results.filter(result => result.success);
    
    console.log(`Emergency notifications sent to ${successfulSends.length} out of ${matchingDonors.length} matching donors`);
    
    return {
      success: true,
      donorsNotified: successfulSends.length,
      totalMatchingDonors: matchingDonors.length,
      results,
    };
    
  } catch (error) {
    console.error('Error sending emergency notifications:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Function to send confirmation email to request creator
export const sendRequestConfirmation = async (request: BloodRequest) => {
  try {
    const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Blood Request Confirmation - BloodBridge</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 10px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🩸 Blood Request Confirmation</h1>
          </div>
          
          <div class="content">
            <p>Dear <strong>${request.contactName}</strong>,</p>
            
            <p>Your blood request has been successfully submitted to BloodBridge. We're actively searching for matching donors in your area.</p>
            
            <h3>Request Details:</h3>
            <ul>
              <li><strong>Patient:</strong> ${request.patientName}</li>
              <li><strong>Hospital:</strong> ${request.hospitalName}</li>
              <li><strong>Location:</strong> ${request.city}, ${request.state}</li>
              <li><strong>Blood Group:</strong> ${request.bloodGroup.replace('_', ' ')}</li>
              <li><strong>Units Needed:</strong> ${request.unitsNeeded}</li>
              <li><strong>Urgency:</strong> ${request.urgency}</li>
            </ul>
            
            <p>We will notify you once we find matching donors or if there are any updates to your request.</p>
            
            <p><strong>Request ID:</strong> ${request.id}</p>
          </div>
          
          <div class="footer">
            <p>Thank you for using BloodBridge!</p>
            <p>We're here to help connect you with lifesaving blood donors.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: request.contactEmail,
      subject: emailTemplates.subjects.requestConfirmation,
      html: emailTemplate,
      replyTo: emailTemplates.replyTo,
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${request.contactEmail}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export default {
  sendEmergencyNotifications,
  sendRequestConfirmation,
  findMatchingDonors,
};
