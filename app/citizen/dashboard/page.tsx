import Link from "next/link";
import { ClipboardList, LifeBuoy, ShieldAlert, TimerReset } from "lucide-react";

import { IncidentCard } from "@/components/dashboard/incident-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { Button } from "@/components/ui/button";
import { getCitizenDashboardData } from "@/lib/dashboard";
import { requireRole } from "@/lib/auth";
import { formatRelativeTime } from "@/lib/utils";

export default async function CitizenDashboardPage() {
  const user = await requireRole(["citizen"]);
  const data = await getCitizenDashboardData(user._id);

  return (
    <div className="space-y-6">
      <section className="dashboard-grid">
        <StatCard label="Total reports" value={data.metrics.totalReports} icon={<ClipboardList className="size-5" />} />
        <StatCard label="Active cases" value={data.metrics.activeCount} icon={<ShieldAlert className="size-5" />} tone="warning" />
        <StatCard label="Resolved cases" value={data.metrics.resolvedCount} icon={<LifeBuoy className="size-5" />} tone="success" />
        <StatCard label="Estimated response window" value={data.metrics.responseWindow} icon={<TimerReset className="size-5" />} tone="info" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Recent reports</h2>
              <p className="text-sm text-muted-foreground">Track your latest submissions and dispatch progress.</p>
            </div>
            <Button asChild><Link href="/citizen/report-incident">New report</Link></Button>
          </div>
          <div className="grid gap-4">
            {data.reports.map((incident: any) => (
              <Link key={incident._id} href={`/citizen/reports/${incident._id}`}>
                <IncidentCard incident={incident} />
              </Link>
            ))}
          </div>
        </div>
        <ActivityTimeline items={data.reports.map((item: any) => ({ id: item._id, title: item.title, description: `Status updated to ${item.status.replace(/_/g, " ")}`, timestamp: formatRelativeTime(item.updatedAt) }))} />
      </section>
    </div>
  );
}
