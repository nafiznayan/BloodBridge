import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmergencyNotifications, sendRequestConfirmation } from "@/lib/email-service";
import { createNotificationsForMatchingDonors } from "@/lib/notification-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const requests = await prisma.bloodRequest.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching blood requests:", error);
    return NextResponse.json(
      { message: "Failed to fetch blood requests" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      patientName,
      hospitalName,
      city,
      state,
      bloodGroup,
      urgency,
      unitsNeeded,
      contactName,
      contactPhone,
      contactEmail,
      additionalInfo,
    } = body;

    const bloodRequest = await prisma.bloodRequest.create({
      data: {
        patientName,
        hospitalName,
        city,
        state,
        bloodGroup,
        urgency,
        unitsNeeded,
        contactName,
        contactPhone,
        contactEmail,
        additionalInfo,
        isActive: true,
      },
    });

    // Send automatic notifications to matching donors
    try {
      // Create in-app notifications for matching donors (non-blocking)
      createNotificationsForMatchingDonors({
        bloodRequestId: bloodRequest.id,
        patientName: bloodRequest.patientName,
        hospitalName: bloodRequest.hospitalName,
        city: bloodRequest.city,
        state: bloodRequest.state,
        bloodGroup: bloodRequest.bloodGroup,
        urgency: bloodRequest.urgency,
        unitsNeeded: bloodRequest.unitsNeeded,
      }).catch(error => {
        console.error('Error creating in-app notifications:', error);
      });

      // Send emergency notifications to matching donors (non-blocking)
      sendEmergencyNotifications(bloodRequest).catch(error => {
        console.error('Error sending emergency notifications:', error);
      });

      // Send confirmation email to request creator (non-blocking)
      sendRequestConfirmation(bloodRequest).catch(error => {
        console.error('Error sending confirmation email:', error);
      });
    } catch (error) {
      console.error('Error in notification process:', error);
      // Don't fail the request creation if notifications fail
    }

    return NextResponse.json(bloodRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating blood request:", error);
    return NextResponse.json(
      { message: "Failed to create blood request" },
      { status: 500 }
    );
  }
}
