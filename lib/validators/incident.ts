import { z } from "zod";

import {
  DISASTER_TYPES,
  INCIDENT_STATUSES,
  SEVERITY_LEVELS,
  TEAM_MISSION_STATUSES,
  VICTIM_CONDITIONS,
  VICTIM_RESCUE_STATUSES
} from "@/lib/constants";

export const incidentReportSchema = z.object({
  title: z.string().min(4, "Incident title is required."),
  type: z.enum(DISASTER_TYPES),
  description: z.string().min(20, "Please provide more incident details."),
  severity: z.enum(SEVERITY_LEVELS),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  address: z.string().optional(),
  contactName: z.string().min(2, "Contact name is required."),
  contactPhone: z.string().min(7, "Contact phone is required."),
  contactEmail: z.email("Enter a valid contact email.").optional().or(z.literal("")),
  imageUrl: z.url("Enter a valid image URL.").optional().or(z.literal(""))
});

export const incidentStatusSchema = z.object({
  status: z.enum(INCIDENT_STATUSES)
});

export const assignmentSchema = z.object({
  teamId: z.string().min(1, "Select a rescue team."),
  remarks: z.string().optional()
});

export const missionUpdateSchema = z.object({
  progressStatus: z.enum(TEAM_MISSION_STATUSES),
  remarks: z.string().optional(),
  currentLat: z.coerce.number().min(-90).max(90),
  currentLng: z.coerce.number().min(-180).max(180)
});

export const victimSchema = z.object({
  incidentId: z.string().min(1),
  name: z.string().min(2),
  age: z.coerce.number().min(0).max(120).optional(),
  condition: z.enum(VICTIM_CONDITIONS),
  rescueStatus: z.enum(VICTIM_RESCUE_STATUSES),
  notes: z.string().optional()
});
