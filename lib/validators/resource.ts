import { z } from "zod";

import { ALERT_TYPES, RESOURCE_CATEGORIES, RESOURCE_STATUSES, USER_ROLES } from "@/lib/constants";

export const resourceSchema = z.object({
  name: z.string().min(2),
  category: z.enum(RESOURCE_CATEGORIES),
  quantityAvailable: z.coerce.number().min(0),
  allocatedQuantity: z.coerce.number().min(0),
  location: z.string().min(2),
  status: z.enum(RESOURCE_STATUSES)
});

export const alertSchema = z.object({
  title: z.string().min(4),
  message: z.string().min(10),
  type: z.enum(ALERT_TYPES),
  sentToRole: z.enum(USER_ROLES),
  status: z.enum(["draft", "sent", "archived"]).default("sent")
});
