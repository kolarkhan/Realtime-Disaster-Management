import { DataTable } from "@/components/dashboard/data-table";
import { SearchFilterToolbar } from "@/components/dashboard/search-filter-toolbar";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { listVictims } from "@/lib/dashboard";

export default async function AdminVictimsPage() {
  const victims = await listVictims();

  return (
    <div className="space-y-6">
      <SearchFilterToolbar title="Victim tracking" description="Unified victim registry across all incidents for rescue and medical coordination." />
      <DataTable title="Victim registry" description="Victim condition, rescue state, and incident linkage.">
        <table className="w-full text-left text-sm">
          <thead className="text-muted-foreground"><tr><th className="pb-4">Name</th><th className="pb-4">Incident</th><th className="pb-4">Condition</th><th className="pb-4">Rescue status</th><th className="pb-4">Notes</th></tr></thead>
          <tbody>
            {victims.map((victim: any) => (
              <tr key={victim._id} className="border-t border-border/70"><td className="py-4 font-medium">{victim.name}</td><td className="py-4">{victim.incidentId?.title ?? "Incident"}</td><td className="py-4 capitalize">{victim.condition}</td><td className="py-4"><StatusBadge value={victim.rescueStatus} /></td><td className="py-4 text-muted-foreground">{victim.notes ?? "-"}</td></tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}
