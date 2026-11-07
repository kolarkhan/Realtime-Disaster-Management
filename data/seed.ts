import { DEMO_CREDENTIALS } from "../lib/constants";

export const seedUsers = [
  {
    name: "Control Room Admin",
    email: DEMO_CREDENTIALS.admin.email,
    password: DEMO_CREDENTIALS.admin.password,
    role: "admin",
    phone: "+92 300 5550100",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    status: "active"
  },
  {
    name: "Alpha Rescue Lead",
    email: DEMO_CREDENTIALS.team.email,
    password: DEMO_CREDENTIALS.team.password,
    role: "team",
    phone: "+92 300 5550200",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    status: "active"
  },
  {
    name: "Citizen Reporter",
    email: DEMO_CREDENTIALS.citizen.email,
    password: DEMO_CREDENTIALS.citizen.password,
    role: "citizen",
    phone: "+92 300 5550300",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    status: "active"
  }
] as const;

export const seedResources = [
  { name: "Ambulance Fleet A", category: "ambulance", quantityAvailable: 8, allocatedQuantity: 3, location: "Central Depot", status: "available" },
  { name: "Rapid Trauma Kits", category: "rescue_kits", quantityAvailable: 42, allocatedQuantity: 18, location: "Medical Store", status: "available" },
  { name: "Inflatable Boats", category: "boats", quantityAvailable: 6, allocatedQuantity: 4, location: "River Unit Base", status: "allocated" },
  { name: "Mobile Food Packs", category: "food_packs", quantityAvailable: 260, allocatedQuantity: 120, location: "Relief Warehouse", status: "limited" },
  { name: "Volunteer Pool", category: "volunteers", quantityAvailable: 95, allocatedQuantity: 28, location: "Community Center", status: "available" },
  { name: "Emergency Medicines", category: "medicine", quantityAvailable: 150, allocatedQuantity: 65, location: "Medical Store", status: "available" }
] as const;

export const seedAlerts = [
  {
    title: "Urban flooding watch",
    message: "Heavy rainfall may cause flash flooding in low-lying neighborhoods. Avoid underpasses and riverbank roads.",
    type: "warning",
    sentToRole: "citizen",
    status: "sent"
  },
  {
    title: "Field unit standby",
    message: "Rescue teams should maintain vehicle readiness and confirm medical loadout status for night operations.",
    type: "info",
    sentToRole: "team",
    status: "sent"
  }
] as const;
