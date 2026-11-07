import {
  AlertStatus,
  AlertType,
  DisasterType,
  IncidentStatus,
  ResourceCategory,
  ResourceStatus,
  SeverityLevel,
  TeamMissionStatus,
  UserRole,
  VictimCondition,
  VictimRescueStatus
} from "@/types";

export const APP_NAME = "Real-Time Disaster Management & Rescue Coordination Platform";
export const AUTH_COOKIE_NAME = "rdm_session";
export const JWT_EXPIRATION = "7d";

export const USER_ROLES: UserRole[] = ["citizen", "team", "admin"];
export const DISASTER_TYPES: DisasterType[] = ["flood", "earthquake", "fire", "storm", "landslide", "medical", "other"];
export const SEVERITY_LEVELS: SeverityLevel[] = ["low", "medium", "high", "critical"];
export const INCIDENT_STATUSES: IncidentStatus[] = ["reported", "verified", "assigned", "in_progress", "resolved", "closed"];
export const TEAM_MISSION_STATUSES: TeamMissionStatus[] = ["pending", "accepted", "en_route", "in_progress", "rescued", "completed"];
export const RESOURCE_CATEGORIES: ResourceCategory[] = ["ambulance", "medicine", "food_packs", "boats", "rescue_kits", "volunteers"];
export const RESOURCE_STATUSES: ResourceStatus[] = ["available", "limited", "allocated", "maintenance"];
export const VICTIM_CONDITIONS: VictimCondition[] = ["stable", "injured", "critical", "missing"];
export const VICTIM_RESCUE_STATUSES: VictimRescueStatus[] = ["awaiting", "identified", "rescued", "evacuated"];
export const ALERT_TYPES: AlertType[] = ["warning", "info", "critical", "success"];
export const ALERT_STATUSES: AlertStatus[] = ["draft", "sent", "archived"];

export const DEMO_CREDENTIALS = {
  admin: {
    email: "admin@rescuegrid.demo",
    password: "Admin123!"
  },
  team: {
    email: "team@rescuegrid.demo",
    password: "Team123!"
  },
  citizen: {
    email: "citizen@rescuegrid.demo",
    password: "Citizen123!"
  }
};

export const ROLE_LABELS: Record<UserRole, string> = {
  citizen: "Citizen",
  team: "Rescue Team",
  admin: "Admin / Control Room"
};
