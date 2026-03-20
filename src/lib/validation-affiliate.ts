import { z } from "zod";

export const affiliateSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Invalid phone number"),
  company: z.string().optional().default(""),
  profession: z.enum([
    "real_estate_agent",
    "interior_decorator",
    "contractor",
    "property_manager",
    "other",
  ]),
});

export type AffiliateSignupInput = z.infer<typeof affiliateSignupSchema>;
