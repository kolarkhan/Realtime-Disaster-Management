import Link from "next/link";

import { DataTable } from "@/components/dashboard/data-table";
import { SearchFilterToolbar } from "@/components/dashboard/search-filter-toolbar";
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { listIncidents } from "@/lib/dashboard";
import { formatRelativeTime } from "@/lib/utils";

export default async function AdminIncidentsPage() {
  const incidents = await listIncidents();

  return (
    <div className="space-y-6">
      <SearchFilterToolbar title="Incident management" description="Monitor reports, verify severity, and dispatch rescue teams from a single queue." />
      <DataTable title="All incidents" description="Live incident registry with severity, status, and ownership context.">
        <table className="w-full text-left text-sm">
          <thead className="text-muted-foreground">
            <tr>
              <th className="pb-4">Title</th>
              <th className="pb-4">Type</th>
              <th className="pb-4">Severity</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Reported by</th>
              <th className="pb-4">Updated</th>
              <th className="pb-4" />
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident: any) => (
              <tr key={incident._id} className="border-t border-border/70">
                <td className="py-4 font-medium">{incident.title}</td>
                <td className="py-4 capitalize">{incident.type}</td>
                <td className="py-4"><SeverityBadge value={incident.severity} /></td>
                <td className="py-4"><StatusBadge value={incident.status} /></td>
                <td className="py-4">{incident.reportedBy?.name ?? "Citizen"}</td>
                <td className="py-4 text-muted-foreground">{formatRelativeTime(incident.updatedAt)}</td>
                <td className="py-4"><Link href={`/admin/incidents/${incident._id}`} className="font-medium text-primary">Open</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}
