import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { prisma } from "./prisma";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "5cfedee598fd70c76f6174c3b590a9a6ddd64f02ea04650b28229dd5df0695e5";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(donorId: string): string {
  return jwt.sign({ donorId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { donorId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { donorId: string };
  } catch {
    return null;
  }
}

export async function getAuthenticatedDonor(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7);
  const payload = verifyToken(token);

  if (!payload) {
    return null;
  }

  const donor = await prisma.donor.findUnique({
    where: { id: payload.donorId },
    include: {
      donationHistory: {
        orderBy: { donationDate: "desc" },
      },
    },
  });

  return donor;
}
