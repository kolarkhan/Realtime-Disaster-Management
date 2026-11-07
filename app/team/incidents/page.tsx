import Link from "next/link";

import { DataTable } from "@/components/dashboard/data-table";
import { SearchFilterToolbar } from "@/components/dashboard/search-filter-toolbar";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { listAssignments } from "@/lib/dashboard";
import { requireRole } from "@/lib/auth";
import { getTeamDashboardData } from "@/lib/dashboard";

export default async function TeamIncidentsPage() {
  const user = await requireRole(["team"]);
  const teamData = await getTeamDashboardData(user._id);
  const assignments = teamData.team ? await listAssignments(teamData.team._id) : [];

  return (
    <div className="space-y-6">
      <SearchFilterToolbar title="Assigned incidents" description="Active and historical rescue assignments for your unit." />
      <DataTable title="Mission queue" description="Assignment progress, linked incident details, and next action.">
        <table className="w-full text-left text-sm">
          <thead className="text-muted-foreground"><tr><th className="pb-4">Incident</th><th className="pb-4">Location</th><th className="pb-4">Mission status</th><th className="pb-4">Action</th></tr></thead>
          <tbody>
            {assignments.map((assignment: any) => (
              <tr key={assignment._id} className="border-t border-border/70"><td className="py-4 font-medium">{assignment.incidentId?.title}</td><td className="py-4">{assignment.incidentId?.location?.address ?? `${assignment.incidentId?.location?.lat}, ${assignment.incidentId?.location?.lng}`}</td><td className="py-4"><StatusBadge value={assignment.progressStatus} /></td><td className="py-4"><Link href={`/team/incidents/${assignment.incidentId?._id}`} className="font-medium text-primary">Open</Link></td></tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}
