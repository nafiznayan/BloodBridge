import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const donors = await prisma.donor.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(donors);
  } catch (error) {
    console.error("Error fetching donors:", error);
    return NextResponse.json(
      { message: "Failed to fetch donors" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      password,
      phone,
      bloodGroup,
      city,
      state,
      age,
      weight,
      lastDonationDate,
      medicalConditions,
      available,
    } = body;

    // Check if email already exists
    const existingDonor = await prisma.donor.findUnique({
      where: { email },
    });

    if (existingDonor) {
      return NextResponse.json(
        { message: "A donor with this email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    const donor = await prisma.donor.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        bloodGroup,
        city,
        state,
        age,
        weight,
        lastDonationDate: lastDonationDate ? new Date(lastDonationDate) : null,
        medicalConditions,
        available,
      },
    });

    // Remove password from response
    const { password: _, ...donorWithoutPassword } = donor;

    return NextResponse.json(donorWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Error creating donor:", error);
    return NextResponse.json(
      { message: "Failed to create donor" },
      { status: 500 }
    );
  }
}
