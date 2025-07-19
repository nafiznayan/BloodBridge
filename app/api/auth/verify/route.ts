import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedDonor } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const donor = await getAuthenticatedDonor(request);

    if (!donor) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Remove password from response
    const { password: _, ...donorWithoutPassword } = donor;

    return NextResponse.json({
      message: "Token is valid",
      donor: donorWithoutPassword,
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { message: "Token verification failed" },
      { status: 401 }
    );
  }
}
