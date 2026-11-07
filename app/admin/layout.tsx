import type React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireRole } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(["admin"]);
  return <DashboardShell title="Control Room Command Center" role="admin" user={user}>{children}</DashboardShell>;
}

