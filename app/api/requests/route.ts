import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    return NextResponse.json(bloodRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating blood request:", error);
    return NextResponse.json(
      { message: "Failed to create blood request" },
      { status: 500 }
    );
  }
}
