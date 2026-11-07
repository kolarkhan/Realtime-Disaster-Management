import { z } from "zod";

import { USER_ROLES } from "@/lib/constants";

export const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters.")
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must include an uppercase letter.")
    .regex(/[0-9]/, "Password must include a number."),
  phone: z.string().min(7, "Phone number is required."),
  role: z.enum(USER_ROLES).default("citizen")
});
