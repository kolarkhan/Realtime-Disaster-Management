import Link from "next/link";
import { ActivitySquare, AlertTriangle, ClipboardCheck, PackageOpen, TimerReset, Users2 } from "lucide-react";

import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { IncidentCard } from "@/components/dashboard/incident-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { IncidentTrendsChart } from "@/components/charts/incident-trends-chart";
import { ResourceAllocationChart } from "@/components/charts/resource-allocation-chart";
import { SeverityDistributionChart } from "@/components/charts/severity-distribution-chart";
import { TeamPerformanceChart } from "@/components/charts/team-performance-chart";
import { Button } from "@/components/ui/button";
import { getAdminDashboardData } from "@/lib/dashboard";
import { formatRelativeTime } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();

  return (
    <div className="space-y-6">
      <section className="dashboard-grid">
        <StatCard label="Total incidents" value={data.metrics.totalIncidents} icon={<ClipboardCheck className="size-5" />} />
        <StatCard label="Active incidents" value={data.metrics.activeIncidents} icon={<ActivitySquare className="size-5" />} tone="warning" />
        <StatCard label="Resolved incidents" value={data.metrics.resolvedIncidents} icon={<TimerReset className="size-5" />} tone="success" />
        <StatCard label="High severity incidents" value={data.metrics.highSeverityIncidents} icon={<AlertTriangle className="size-5" />} tone="critical" />
        <StatCard label="Available teams" value={data.metrics.availableTeams} icon={<Users2 className="size-5" />} />
        <StatCard label="Resource inventory" value={data.metrics.resourceInventory} icon={<PackageOpen className="size-5" />} tone="info" />
        <StatCard label="Allocated resources" value={data.metrics.allocatedResources} icon={<PackageOpen className="size-5" />} tone="warning" />
        <StatCard label="Resolution rate" value={`${data.metrics.resolutionRate}%`} icon={<ClipboardCheck className="size-5" />} tone="success" />
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <IncidentTrendsChart data={data.trends} />
        <SeverityDistributionChart data={data.severityDistribution} />
        <ResourceAllocationChart data={data.resourceAllocation} />
        <TeamPerformanceChart data={data.teamPerformance} />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Priority incidents</h2>
              <p className="text-sm text-muted-foreground">Newest emergency cases requiring control-room attention.</p>
            </div>
            <Button asChild variant="outline"><Link href="/admin/incidents">View all incidents</Link></Button>
          </div>
          <div className="grid gap-4">
            {data.incidents.slice(0, 4).map((incident: any) => (
              <Link key={incident._id} href={`/admin/incidents/${incident._id}`}>
                <IncidentCard incident={incident} />
              </Link>
            ))}
          </div>
        </div>
        <ActivityTimeline items={data.recentAlerts.map((alert: any) => ({ id: alert._id, title: alert.title, description: alert.message, timestamp: formatRelativeTime(alert.createdAt) }))} />
      </section>
    </div>
  );
}
