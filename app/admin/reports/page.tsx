import { IncidentTrendsChart } from "@/components/charts/incident-trends-chart";
import { ResourceAllocationChart } from "@/components/charts/resource-allocation-chart";
import { SeverityDistributionChart } from "@/components/charts/severity-distribution-chart";
import { TeamPerformanceChart } from "@/components/charts/team-performance-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminDashboardData } from "@/lib/dashboard";

export default async function AdminReportsPage() {
  const data = await getAdminDashboardData();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><div><CardTitle>Analytics and reports</CardTitle><CardDescription>Export-ready operational view for incident trends, severity, resources, and team performance.</CardDescription></div></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-muted/60 p-4"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Avg response time</p><p className="mt-2 text-2xl font-semibold">08m 42s</p></div>
          <div className="rounded-2xl bg-muted/60 p-4"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Resolution rate</p><p className="mt-2 text-2xl font-semibold">{data.metrics.resolutionRate}%</p></div>
          <div className="rounded-2xl bg-muted/60 p-4"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Critical cases</p><p className="mt-2 text-2xl font-semibold">{data.metrics.highSeverityIncidents}</p></div>
          <div className="rounded-2xl bg-muted/60 p-4"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Available teams</p><p className="mt-2 text-2xl font-semibold">{data.metrics.availableTeams}</p></div>
        </CardContent>
      </Card>
      <div className="grid gap-6 xl:grid-cols-2">
        <IncidentTrendsChart data={data.trends} />
        <SeverityDistributionChart data={data.severityDistribution} />
        <ResourceAllocationChart data={data.resourceAllocation} />
        <TeamPerformanceChart data={data.teamPerformance} />
      </div>
    </div>
  );
}
