export type BloodGroup = 
  | 'A_POSITIVE' 
  | 'A_NEGATIVE' 
  | 'B_POSITIVE' 
  | 'B_NEGATIVE' 
  | 'AB_POSITIVE' 
  | 'AB_NEGATIVE' 
  | 'O_POSITIVE' 
  | 'O_NEGATIVE'

export type UrgencyLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'

export interface Donor {
  id: string
  name: string
  email: string
  phone: string
  bloodGroup: BloodGroup
  city: string
  state: string
  age: number
  weight: number
  available: boolean
  lastDonationDate?: Date
  medicalConditions?: string
  createdAt: Date
  updatedAt: Date
}

export interface DonationHistory {
  id: string
  donorId: string
  donationDate: Date
  location: string
  bloodBank?: string
  unitsGiven: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface BloodRequest {
  id: string
  patientName: string
  hospitalName: string
  city: string
  state: string
  bloodGroup: BloodGroup
  urgency: UrgencyLevel
  unitsNeeded: number
  contactName: string
  contactPhone: string
  contactEmail: string
  additionalInfo?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  donorId?: string
}

export interface Notification {
  id: string
  donorId: string
  bloodRequestId: string
  message: string
  isRead: boolean
  createdAt: Date
  bloodRequest?: BloodRequest
}

export const BLOOD_GROUP_LABELS: Record<BloodGroup, string> = {
  A_POSITIVE: 'A+',
  A_NEGATIVE: 'A-',
  B_POSITIVE: 'B+',
  B_NEGATIVE: 'B-',
  AB_POSITIVE: 'AB+',
  AB_NEGATIVE: 'AB-',
  O_POSITIVE: 'O+',
  O_NEGATIVE: 'O-',
}

export const URGENCY_LABELS: Record<UrgencyLevel, string> = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
}

export const URGENCY_COLORS: Record<UrgencyLevel, string> = {
  CRITICAL: 'bg-red-500',
  HIGH: 'bg-orange-500',
  MEDIUM: 'bg-yellow-500',
  LOW: 'bg-green-500',
}