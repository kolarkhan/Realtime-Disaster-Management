import type React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireRole } from "@/lib/auth";

export default async function TeamLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(["team"]);
  return <DashboardShell title="Field Response Workspace" role="team" user={user}>{children}</DashboardShell>;
}

