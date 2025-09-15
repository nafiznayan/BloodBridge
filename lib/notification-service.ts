import { prisma } from './prisma';
import { BloodGroup, UrgencyLevel } from './types';

export interface CreateNotificationData {
  bloodRequestId: string;
  patientName: string;
  hospitalName: string;
  city: string;
  state: string;
  bloodGroup: BloodGroup;
  urgency: UrgencyLevel;
  unitsNeeded: number;
}

export async function createNotificationsForMatchingDonors(data: CreateNotificationData) {
  try {
    // Find all donors that match the blood request criteria
    const matchingDonors = await prisma.donor.findMany({
      where: {
        bloodGroup: data.bloodGroup,
        city: data.city,
        available: true,
        // Optional: Add more filters like age, weight, last donation date
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (matchingDonors.length === 0) {
      console.log('No matching donors found for notification');
      return [];
    }

    // Create notifications for all matching donors
    const notifications = await Promise.all(
      matchingDonors.map(donor => 
        prisma.notification.create({
          data: {
            donorId: donor.id,
            bloodRequestId: data.bloodRequestId,
            message: `Emergency blood request: ${data.patientName} needs ${data.unitsNeeded} units of ${data.bloodGroup} blood at ${data.hospitalName} in ${data.city}. Urgency: ${data.urgency}`,
          },
        })
      )
    );

    console.log(`Created ${notifications.length} notifications for matching donors`);
    return notifications;
  } catch (error) {
    console.error('Error creating notifications:', error);
    throw error;
  }
}

export async function getDonorNotifications(donorId: string) {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        donorId: donorId,
      },
      include: {
        bloodRequest: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return notifications;
  } catch (error) {
    console.error('Error fetching donor notifications:', error);
    throw error;
  }
}
