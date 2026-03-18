import { z } from "zod";

function isWithinNext14Days(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const fourteenDays = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  return date >= now && date <= fourteenDays;
}

function isBetween9and7(dateStr: string): boolean {
  const date = new Date(dateStr);
  const hours = date.getHours();
  return hours >= 9 && hours < 19;
}

const timeSlotSchema = z
  .string()
  .min(1, "Please select a time")
  .refine(isWithinNext14Days, "Must be within the next 14 days")
  .refine(isBetween9and7, "Must be between 9 AM and 7 PM");

export const consultationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\d\s\-\(\)\+]+$/, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your full address"),
  bedrooms: z
    .number()
    .int()
    .min(1, "Must have at least 1 bedroom")
    .max(20, "Maximum 20 bedrooms"),
  hasOffice: z.boolean(),
  preferredTime1: timeSlotSchema,
  preferredTime2: timeSlotSchema,
  preferredTime3: timeSlotSchema,
});

export type ConsultationFormInput = z.infer<typeof consultationSchema>;
