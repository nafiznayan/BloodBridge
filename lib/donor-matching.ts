import { BloodRequest, Donor } from '@prisma/client';
import { prisma } from './prisma';

// Interface for donor matching criteria
export interface DonorMatchCriteria {
  bloodGroup: string;
  city: string;
  state?: string;
  maxDistance?: number; // in kilometers
  minAge?: number;
  maxAge?: number;
  minWeight?: number;
  excludeRecentDonors?: boolean; // exclude donors who donated recently
  recentDonationDays?: number; // default 90 days
}

// Find matching donors based on criteria
export const findMatchingDonors = async (
  request: BloodRequest,
  criteria: Partial<DonorMatchCriteria> = {}
): Promise<Donor[]> => {
  const {
    maxDistance,
    minAge = 18,
    maxAge = 65,
    minWeight = 50,
    excludeRecentDonors = true,
    recentDonationDays = 90,
  } = criteria;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - recentDonationDays);

  // Base query
  const baseQuery: any = {
    bloodGroup: request.bloodGroup,
    city: request.city,
    available: true,
    age: { gte: minAge, lte: maxAge },
    weight: { gte: minWeight },
  };

  // Exclude recent donors if required
  if (excludeRecentDonors) {
    baseQuery.OR = [
      { lastDonationDate: { lt: cutoffDate } },
      { lastDonationDate: null },
    ];
  }

  let matchingDonors = await prisma.donor.findMany({
    where: baseQuery,
    orderBy: [
      { lastDonationDate: 'asc' },
      { available: 'desc' },
    ],
  });

  // Fallback: nearby donors if none found
  if (matchingDonors.length === 0 && maxDistance && request.state) {
    const nearbyQuery: any = {
      bloodGroup: request.bloodGroup,
      state: request.state,
      available: true,
      age: { gte: minAge, lte: maxAge },
      weight: { gte: minWeight },
    };

    if (excludeRecentDonors) {
      nearbyQuery.OR = [
        { lastDonationDate: { lt: cutoffDate } },
        { lastDonationDate: null },
      ];
    }

    matchingDonors = await prisma.donor.findMany({
      where: nearbyQuery,
      orderBy: [
        { lastDonationDate: 'asc' },
        { available: 'desc' },
      ],
    });
  }

  return matchingDonors;
};

// Calculate donor score for prioritization
export const calculateDonorScore = (donor: Donor, request: BloodRequest): number => {
  let score = 0;

  score += 100; // base score for matching blood group and city

  if (donor.state === request.state) score += 20;

  if (donor.lastDonationDate) {
    const daysSinceLastDonation = Math.floor(
      (Date.now() - donor.lastDonationDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceLastDonation > 90) score += 30;
    else if (daysSinceLastDonation > 60) score += 20;
    else if (daysSinceLastDonation > 30) score += 10;
  } else {
    score += 25; // never donated before
  }

  if (donor.age >= 25 && donor.age <= 45) score += 15;
  if (donor.weight >= 50 && donor.weight <= 100) score += 10;

  return score;
};

// Get prioritized list of matching donors
export const getPrioritizedDonors = async (
  request: BloodRequest,
  criteria: Partial<DonorMatchCriteria> = {}
): Promise<Donor[]> => {
  const matchingDonors = await findMatchingDonors(request, criteria);
  return matchingDonors.sort((a, b) => calculateDonorScore(b, request) - calculateDonorScore(a, request));
};

// Check if a donor is eligible to donate
export const isDonorEligible = (donor: Donor): boolean => {
  if (!donor.available) return false;
  if (donor.age < 18 || donor.age > 65) return false;
  if (donor.weight < 50) return false;

  if (donor.lastDonationDate) {
    const daysSinceLastDonation = Math.floor(
      (Date.now() - donor.lastDonationDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceLastDonation < 90) return false;
  }

  return true;
};

// Get donor statistics for a specific area
export const getDonorStatistics = async (city: string, state?: string) => {
  const whereClause: any = { city };
  if (state) whereClause.state = state;

  const [totalDonors, availableDonors, recentDonors] = await Promise.all([
    prisma.donor.count({ where: whereClause }),
    prisma.donor.count({ where: { ...whereClause, available: true } }),
    prisma.donor.count({
      where: {
        ...whereClause,
        lastDonationDate: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) },
      },
    }),
  ]);

  return {
    totalDonors,
    availableDonors,
    recentDonors,
    eligibleDonors: availableDonors - recentDonors,
  };
};
