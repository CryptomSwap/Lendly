import { formatDistance } from 'date-fns';
import { he } from 'date-fns/locale';

// Haversine formula for calculating distance between two points
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Calculate total days between dates (inclusive)
export const calculateTotalDays = (startDate: Date, endDate: Date): number => {
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

// Format date range for Hebrew locale
export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const start = formatDistance(startDate, new Date(), { addSuffix: true, locale: he });
  const end = formatDistance(endDate, new Date(), { addSuffix: true, locale: he });
  return `${start} - ${end}`;
};

// Validate Israeli phone number
export const isValidIsraeliPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+972|0)([23489]|5[012345689]|77)[0-9]{7}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Format Israeli phone number
export const formatIsraeliPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('972')) {
    return `+${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

// Generate booking expiration time (12 hours from now)
export const getBookingExpiration = (): Date => {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 12);
  return expiration;
};

// Check if booking is expired
export const isBookingExpired = (expiresAt: Date): boolean => {
  return new Date() > expiresAt;
};

// Calculate time remaining until expiration
export const getTimeUntilExpiration = (expiresAt: Date): string => {
  const now = new Date();
  const diffMs = expiresAt.getTime() - now.getTime();
  
  if (diffMs <= 0) return 'פג תוקף';
  
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours} שעות ו-${minutes} דקות`;
  }
  return `${minutes} דקות`;
};
