import { z } from "zod";

// User schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

// Reservation schemas
export const reservationFormSchema = z.object({
  date: z.string().min(1, "Date is required"),
  timeSlot: z.string().min(1, "Time slot is required"),
  guests: z.number().int().min(1, "At least 1 guest is required").max(20, "Maximum 20 guests"),
});

export const reservationUpdateSchema = z.object({
  date: z.string().min(1, "Date is required"),
  timeSlot: z.string().min(1, "Time slot is required"),
});

// API Response schemas
export const tableSchema = z.object({
  _id: z.string(),
  tableNumber: z.string(),
  capacity: z.number(),
});

export const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["USER", "ADMIN"]),
});

export const reservationSchema = z.object({
  _id: z.string(),
  date: z.string(),
  timeSlot: z.string(),
  guests: z.number(),
  table: tableSchema.nullable().optional(),
  user: userSchema.optional(),
});

export const loginResponseSchema = z.object({
  token: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  user: userSchema.optional(),
});

// Type exports
export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type ReservationForm = z.infer<typeof reservationFormSchema>;
export type ReservationUpdate = z.infer<typeof reservationUpdateSchema>;
export type Table = z.infer<typeof tableSchema>;
export type User = z.infer<typeof userSchema>;
export type Reservation = z.infer<typeof reservationSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
