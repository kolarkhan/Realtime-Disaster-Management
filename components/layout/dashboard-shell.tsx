import type React from "react";
import Script from "next/script";

import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { RealtimeRefresher } from "@/components/layout/realtime-refresher";
import { Sidebar } from "@/components/layout/sidebar";
import { listAlerts } from "@/lib/dashboard";
import { UserRole } from "@/types";

export async function DashboardShell({
  title,
  role,
  user,
  children
}: {
  title: string;
  role: UserRole;
  user: any;
  children: React.ReactNode;
}) {
  const alerts = await listAlerts(role === "admin" ? undefined : role);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[320px_1fr]">
      <RealtimeRefresher role={role} userId={user._id?.toString?.() ?? user.id ?? ""} />
      <Sidebar role={role} />
      <main className="min-w-0">
        <DashboardNavbar title={title} user={user} alerts={alerts} />
        <div className="space-y-6 p-4 md:p-6 lg:p-8">{children}</div>
      </main>
      <Script
        src="https://support-9p37xm1bh-kolarkhans-projects.vercel.app/widget.js"
        data-agent-id="6a9d4e3ddcdde6f4edfe4ffc"
        strategy="afterInteractive"
      />
    </div>
  );
}
