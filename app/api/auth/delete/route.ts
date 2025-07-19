import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedDonor } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: NextRequest) {
  try {
    const donor = await getAuthenticatedDonor(request);

    if (!donor) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Delete the donor account and all related data
    await prisma.donor.delete({
      where: { id: donor.id },
    });

    return NextResponse.json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      { message: "Failed to delete account" },
      { status: 500 }
    );
  }
}
