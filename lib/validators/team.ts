import { z } from "zod";

export const createTeamSchema = z.object({
  name: z.string().min(2, "Leader name is required."),
  email: z.email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must include an uppercase letter.")
    .regex(/[0-9]/, "Password must include a number."),
  phone: z.string().min(7, "User phone number is required."),
  teamName: z.string().min(3, "Team name is required."),
  membersCount: z.coerce.number().min(1, "Members count must be at least 1."),
  vehicleType: z.string().min(2, "Vehicle type is required."),
  currentLat: z.coerce.number().min(-90).max(90),
  currentLng: z.coerce.number().min(-180).max(180),
  availabilityStatus: z.enum(["available", "deployed", "maintenance"]).default("available"),
  contactNumber: z.string().min(7, "Team contact number is required.")
});
