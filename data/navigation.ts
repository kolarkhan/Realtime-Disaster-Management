import {
  BellRing,
  ClipboardList,
  Gauge,
  LifeBuoy,
  MapPinned,
  Package2,
  Settings,
  ShieldAlert,
  Users,
  Waves
} from "lucide-react";

import { UserRole } from "@/types";

export const navByRole: Record<
  UserRole,
  Array<{ href: string; label: string; icon: typeof Gauge }>
> = {
  admin: [
    { href: "/admin/dashboard", label: "Dashboard", icon: Gauge },
    { href: "/admin/incidents", label: "Incidents", icon: ShieldAlert },
    { href: "/admin/teams", label: "Teams", icon: Users },
    { href: "/admin/resources", label: "Resources", icon: Package2 },
    { href: "/admin/victims", label: "Victims", icon: LifeBuoy },
    { href: "/admin/alerts", label: "Alerts", icon: BellRing },
    { href: "/admin/reports", label: "Reports", icon: ClipboardList },
    { href: "/admin/settings", label: "Settings", icon: Settings }
  ],
  team: [
    { href: "/team/dashboard", label: "Dashboard", icon: Gauge },
    { href: "/team/incidents", label: "Assigned Incidents", icon: ShieldAlert },
    { href: "/team/resources", label: "Resources", icon: Package2 }
  ],
  citizen: [
    { href: "/citizen/dashboard", label: "Dashboard", icon: Gauge },
    { href: "/citizen/reports", label: "My Reports", icon: ClipboardList },
    { href: "/citizen/report-incident", label: "Report Incident", icon: ShieldAlert },
    { href: "/emergency-guide", label: "Emergency Guide", icon: Waves },
    { href: "/track-report", label: "Track Report", icon: MapPinned }
  ]
};
