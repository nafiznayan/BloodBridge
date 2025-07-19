import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedDonor } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const donor = await getAuthenticatedDonor(request);

    if (!donor) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const donationHistory = await prisma.donationHistory.findMany({
      where: { donorId: donor.id },
      orderBy: { donationDate: "desc" },
    });

    return NextResponse.json(donationHistory);
  } catch (error) {
    console.error("Donation history fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const donor = await getAuthenticatedDonor(request);

    if (!donor) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { donationDate, location, bloodBank, unitsGiven, notes } =
      await request.json();

    const donationHistory = await prisma.donationHistory.create({
      data: {
        donorId: donor.id,
        donationDate: new Date(donationDate),
        location,
        bloodBank,
        unitsGiven: parseInt(unitsGiven) || 1,
        notes,
      },
    });

    // Update donor's last donation date
    await prisma.donor.update({
      where: { id: donor.id },
      data: { lastDonationDate: new Date(donationDate) },
    });

    return NextResponse.json({
      message: "Donation history added successfully",
      donationHistory,
    });
  } catch (error) {
    console.error("Donation history creation error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
