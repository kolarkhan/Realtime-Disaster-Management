import type React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireRole } from "@/lib/auth";

export default async function CitizenLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(["citizen"]);
  return <DashboardShell title="Citizen Response Portal" role="citizen" user={user}>{children}</DashboardShell>;
}

