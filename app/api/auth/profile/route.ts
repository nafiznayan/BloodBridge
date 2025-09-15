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

    // Remove password from response
    const { password: _, ...donorWithoutPassword } = donor;

    return NextResponse.json(donorWithoutPassword);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const donor = await getAuthenticatedDonor(request);

    if (!donor) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const {
      name,
      phone,
      bloodGroup,
      city,
      state,
      age,
      weight,
      available,
      medicalConditions,
    } = await request.json();

    const updatedDonor = await prisma.donor.update({
      where: { id: donor.id },
      data: {
        name,
        phone,
        bloodGroup,
        city,
        state,
        age,
        weight,
        available,
        medicalConditions,
      },
      include: {
        donationHistory: {
          orderBy: { donationDate: "desc" },
        },
      },
    });

    // Remove password from response
    const { password: _, ...donorWithoutPassword } = updatedDonor;

    return NextResponse.json({
      message: "Profile updated successfully",
      donor: donorWithoutPassword,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
