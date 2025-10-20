import { z } from 'zod';

// User Schema
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  phone: z.string().optional(),
  role: z.enum(['RENTER', 'OWNER', 'ADMIN']),
  verified: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Item Schema
export const ItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(['DRONE', 'CAMERA', 'POWER_TOOL', 'EVENTS', 'OTHER']),
  dailyPriceILS: z.number().int().positive(),
  ownerId: z.string(),
  city: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  images: z.array(z.string()).default([]),
  specs: z.record(z.string()).default({}),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Availability Schema
export const AvailabilitySchema = z.object({
  id: z.string(),
  itemId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  isAvailable: z.boolean().default(true),
});

// Booking Schema
export const BookingSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  renterId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  totalPriceILS: z.number().int().positive(),
  depositILS: z.number().int().nonnegative(),
  status: z.enum(['RESERVED', 'CONFIRMED', 'PICKED_UP', 'RETURNED', 'CANCELLED', 'EXPIRED']),
  paymentStatus: z.enum(['UNPAID', 'PAID', 'REFUNDED']),
  expiresAt: z.date().optional(),
  pickupMethod: z.enum(['SELF_PICKUP', 'COURIER', 'LOCKER']).default('SELF_PICKUP'),
  insuranceEnabled: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Risk Assessment Schemas
export const RiskInputsSchema = z.object({
  itemId: z.string(),
  category: z.enum(['DRONE', 'CAMERA', 'POWER_TOOL', 'EVENTS', 'OTHER']),
  startDate: z.date(),
  endDate: z.date(),
  pickupMethod: z.enum(['SELF_PICKUP', 'COURIER', 'LOCKER']),
  insuranceEnabled: z.boolean(),
  renterVerified: z.boolean(),
});

export const DepositQuoteSchema = z.object({
  depositILS: z.number().int().nonnegative(),
  factors: z.array(z.object({
    name: z.string(),
    impact: z.number(),
    description: z.string(),
  })),
  explanation: z.string(),
  deductibleILS: z.number().int().nonnegative(),
});

// Pricing Schemas
export const PricingBreakdownSchema = z.object({
  description: z.string(),
  amountILS: z.number().int(),
});

export const PricingResultSchema = z.object({
  dailyPriceILS: z.number().int().positive(),
  totalDays: z.number().int().positive(),
  subtotalILS: z.number().int().nonnegative(),
  depositILS: z.number().int().nonnegative(),
  totalILS: z.number().int().nonnegative(),
  breakdown: z.array(PricingBreakdownSchema),
});

// Category Request Schema
export const CategoryRequestSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  requesterId: z.string(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Type exports
export type User = z.infer<typeof UserSchema>;
export type Item = z.infer<typeof ItemSchema>;
export type Availability = z.infer<typeof AvailabilitySchema>;
export type Booking = z.infer<typeof BookingSchema>;
export type RiskInputs = z.infer<typeof RiskInputsSchema>;
export type DepositQuote = z.infer<typeof DepositQuoteSchema>;
export type PricingBreakdown = z.infer<typeof PricingBreakdownSchema>;
export type PricingResult = z.infer<typeof PricingResultSchema>;
export type CategoryRequest = z.infer<typeof CategoryRequestSchema>;

// API Response Schemas
export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: UserSchema,
});

export const ApiErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
