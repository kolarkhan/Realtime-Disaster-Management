import Link from "next/link";

import { DataTable } from "@/components/dashboard/data-table";
import { EmptyState } from "@/components/dashboard/empty-state";
import { SearchFilterToolbar } from "@/components/dashboard/search-filter-toolbar";
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { getCitizenIncidents } from "@/lib/dashboard";
import { requireRole } from "@/lib/auth";
import { formatRelativeTime } from "@/lib/utils";

export default async function CitizenReportsPage() {
  const user = await requireRole(["citizen"]);
  const reports = await getCitizenIncidents(user._id);

  return (
    <div className="space-y-6">
      <SearchFilterToolbar title="My reports" description="Full history of your incident submissions and live rescue progress.">
        <Button asChild><Link href="/citizen/report-incident">Report incident</Link></Button>
      </SearchFilterToolbar>
      {reports.length ? (
        <DataTable title="Reported incidents" description="Citizen-submitted emergencies with latest operational status.">
          <table className="w-full text-left text-sm">
            <thead className="text-muted-foreground">
              <tr>
                <th className="pb-4">Title</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Severity</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Updated</th>
                <th className="pb-4" />
              </tr>
            </thead>
            <tbody>
              {reports.map((report: any) => (
                <tr key={report._id} className="border-t border-border/70">
                  <td className="py-4 font-medium">{report.title}</td>
                  <td className="py-4 capitalize">{report.type}</td>
                  <td className="py-4"><SeverityBadge value={report.severity} /></td>
                  <td className="py-4"><StatusBadge value={report.status} /></td>
                  <td className="py-4 text-muted-foreground">{formatRelativeTime(report.updatedAt)}</td>
                  <td className="py-4"><Button asChild variant="ghost"><Link href={`/citizen/reports/${report._id}`}>View</Link></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      ) : (
        <EmptyState title="No incidents reported yet" description="Your submitted incidents will appear here once you create a report." action={<Button asChild className="mt-2"><Link href="/citizen/report-incident">Report your first incident</Link></Button>} />
      )}
    </div>
  );
}
