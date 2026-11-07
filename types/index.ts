export type UserRole = "citizen" | "team" | "admin";
export type UserStatus = "active" | "inactive" | "busy";
export type DisasterType = "flood" | "earthquake" | "fire" | "storm" | "landslide" | "medical" | "other";
export type SeverityLevel = "low" | "medium" | "high" | "critical";
export type IncidentStatus = "reported" | "verified" | "assigned" | "in_progress" | "resolved" | "closed";
export type TeamMissionStatus = "pending" | "accepted" | "en_route" | "in_progress" | "rescued" | "completed";
export type ResourceCategory = "ambulance" | "medicine" | "food_packs" | "boats" | "rescue_kits" | "volunteers";
export type ResourceStatus = "available" | "limited" | "allocated" | "maintenance";
export type VictimCondition = "stable" | "injured" | "critical" | "missing";
export type VictimRescueStatus = "awaiting" | "identified" | "rescued" | "evacuated";
export type AlertType = "warning" | "info" | "critical" | "success";
export type AlertStatus = "draft" | "sent" | "archived";

export interface Coordinates {
  lat: number;
  lng: number;
  address?: string;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface DashboardMetric {
  label: string;
  value: number | string;
  delta?: string;
  tone?: "info" | "warning" | "critical" | "success";
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  tone?: "info" | "warning" | "critical" | "success";
}

export interface SelectOption {
  label: string;
  value: string;
}
