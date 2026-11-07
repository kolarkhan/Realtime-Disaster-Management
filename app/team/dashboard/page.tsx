import Link from "next/link";
import { MapPinned, PackageOpen, ShieldCheck, TimerReset } from "lucide-react";

import { DataTable } from "@/components/dashboard/data-table";
import { MapPlaceholder } from "@/components/dashboard/map-placeholder";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { getTeamDashboardData } from "@/lib/dashboard";
import { requireRole } from "@/lib/auth";

export default async function TeamDashboardPage() {
  const user = await requireRole(["team"]);
  const data = await getTeamDashboardData(user._id);

  return (
    <div className="space-y-6">
      <section className="dashboard-grid">
        <StatCard label="Assigned incidents" value={data.metrics.assignedIncidents} icon={<ShieldCheck className="size-5" />} />
        <StatCard label="Active missions" value={data.metrics.activeMissions} icon={<TimerReset className="size-5" />} tone="warning" />
        <StatCard label="Completed missions" value={data.metrics.completedMissions} icon={<PackageOpen className="size-5" />} tone="success" />
        <StatCard label="Readiness score" value={`${data.metrics.readinessScore}%`} icon={<MapPinned className="size-5" />} />
      </section>
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <DataTable title="Mission board" description="Current and completed assignments for your rescue team.">
          <table className="w-full text-left text-sm">
            <thead className="text-muted-foreground"><tr><th className="pb-4">Incident</th><th className="pb-4">Status</th><th className="pb-4">Severity</th><th className="pb-4">Action</th></tr></thead>
            <tbody>
              {data.assignments.map((assignment: any) => (
                <tr key={assignment._id} className="border-t border-border/70"><td className="py-4 font-medium">{assignment.incidentId?.title}</td><td className="py-4"><StatusBadge value={assignment.progressStatus} /></td><td className="py-4 capitalize">{assignment.incidentId?.severity}</td><td className="py-4"><Link href={`/team/incidents/${assignment.incidentId?._id}`} className="font-medium text-primary">Open mission</Link></td></tr>
              ))}
            </tbody>
          </table>
        </DataTable>
        <MapPlaceholder title="Field position" description="Latest manual location update from the rescue team." points={data.team ? [{ label: data.team.teamName, lat: data.team.currentLocation.lat, lng: data.team.currentLocation.lng }] : []} />
      </div>
    </div>
  );
}
