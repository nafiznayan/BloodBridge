// import { NextRequest, NextResponse } from "next/server";
// import { sendEmergencyNotifications, sendRequestConfirmation } from "@/lib/email-service";
// import { getPrioritizedDonors } from "@/lib/donor-matching";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { testType, donorEmail, requestEmail } = body;

//     if (testType === 'emergency') {
//       // Test emergency notification
//       const testRequest = {
//         id: 'test-request-id',
//         patientName: 'Test Patient',
//         hospitalName: 'Test Hospital',
//         city: 'Test City',
//         state: 'Test State',
//         bloodGroup: 'A_POSITIVE',
//         urgency: 'CRITICAL',
//         unitsNeeded: 2,
//         contactName: 'Test Contact',
//         contactPhone: '+1234567890',
//         contactEmail: requestEmail || 'test@example.com',
//         additionalInfo: 'This is a test emergency blood request',
//         isActive: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };

//       const result = await sendEmergencyNotifications(testRequest);
//       return NextResponse.json({
//         success: true,
//         message: 'Emergency notification test completed',
//         result,
//       });
//     }

//     if (testType === 'confirmation') {
//       // Test confirmation email
//       const testRequest = {
//         id: 'test-request-id',
//         patientName: 'Test Patient',
//         hospitalName: 'Test Hospital',
//         city: 'Test City',
//         state: 'Test State',
//         bloodGroup: 'A_POSITIVE',
//         urgency: 'HIGH',
//         unitsNeeded: 1,
//         contactName: 'Test Contact',
//         contactPhone: '+1234567890',
//         contactEmail: requestEmail || 'test@example.com',
//         additionalInfo: 'This is a test blood request',
//         isActive: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };

//       const result = await sendRequestConfirmation(testRequest);
//       return NextResponse.json({
//         success: true,
//         message: 'Confirmation email test completed',
//         result,
//       });
//     }

//     if (testType === 'matching') {
//       // Test donor matching logic
//       const testRequest = {
//         id: 'test-request-id',
//         patientName: 'Test Patient',
//         hospitalName: 'Test Hospital',
//         city: 'Test City',
//         state: 'Test State',
//         bloodGroup: 'A_POSITIVE',
//         urgency: 'MEDIUM',
//         unitsNeeded: 1,
//         contactName: 'Test Contact',
//         contactPhone: '+1234567890',
//         contactEmail: 'test@example.com',
//         additionalInfo: 'This is a test blood request',
//         isActive: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };

//       const matchingDonors = await getPrioritizedDonors(testRequest);
//       return NextResponse.json({
//         success: true,
//         message: 'Donor matching test completed',
//         matchingDonorsCount: matchingDonors.length,
//         matchingDonors: matchingDonors.map(donor => ({
//           id: donor.id,
//           name: donor.name,
//           email: donor.email,
//           bloodGroup: donor.bloodGroup,
//           city: donor.city,
//           available: donor.available,
//         })),
//       });
//     }

//     return NextResponse.json({
//       success: false,
//       message: 'Invalid test type. Use: emergency, confirmation, or matching',
//     }, { status: 400 });

//   } catch (error) {
//     console.error('Email test error:', error);
//     return NextResponse.json({
//       success: false,
//       message: 'Email test failed',
//       error: error.message,
//     }, { status: 500 });
//   }
// }

// export async function GET() {
//   return NextResponse.json({
//     message: 'Email Test Endpoint',
//     usage: {
//       POST: {
//         testType: 'emergency | confirmation | matching',
//         donorEmail: 'optional: donor email for testing',
//         requestEmail: 'optional: request creator email for testing',
//       },
//     },
//     examples: {
//       emergency: {
//         method: 'POST',
//         body: { testType: 'emergency', requestEmail: 'test@example.com' },
//       },
//       confirmation: {
//         method: 'POST',
//         body: { testType: 'confirmation', requestEmail: 'test@example.com' },
//       },
//       matching: {
//         method: 'POST',
//         body: { testType: 'matching' },
//       },
//     },
//   });
// }
