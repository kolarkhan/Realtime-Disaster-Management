import { notFound } from "next/navigation";

import { AssignmentModal } from "@/components/dashboard/assignment-modal";
import { DataTable } from "@/components/dashboard/data-table";
import { MapPlaceholder } from "@/components/dashboard/map-placeholder";
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { VictimForm } from "@/components/forms/victim-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getIncidentById, listTeams } from "@/lib/dashboard";

export default async function AdminIncidentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [data, teams] = await Promise.all([getIncidentById(id), listTeams()]);

  if (!data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-3xl">{data.incident.title}</CardTitle>
            <CardDescription>{data.incident.description}</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <SeverityBadge value={data.incident.severity} />
            <StatusBadge value={data.incident.status} />
            <AssignmentModal incidentId={data.incident._id} teams={teams} />
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Reporter</p><p className="mt-2 font-medium">{data.incident.reportedBy?.name}</p></div>
          <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p><p className="mt-2 font-medium">{data.incident.contact?.phone ?? "N/A"}</p></div>
          <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Assigned Team</p><p className="mt-2 font-medium">{data.incident.assignedTeam?.teamName ?? "Unassigned"}</p></div>
          <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Location</p><p className="mt-2 font-medium">{data.incident.location.address ?? `${data.incident.location.lat}, ${data.incident.location.lng}`}</p></div>
        </CardContent>
      </Card>
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <MapPlaceholder points={[{ label: data.incident.title, lat: data.incident.location.lat, lng: data.incident.location.lng }]} />
        <Card>
          <CardHeader><div><CardTitle>Add victim</CardTitle><CardDescription>Register victim details and field condition notes.</CardDescription></div></CardHeader>
          <CardContent><VictimForm incidentId={data.incident._id} /></CardContent>
        </Card>
      </div>
      <DataTable title="Victim tracking" description="Victims associated with this incident.">
        <table className="w-full text-left text-sm">
          <thead className="text-muted-foreground"><tr><th className="pb-4">Name</th><th className="pb-4">Age</th><th className="pb-4">Condition</th><th className="pb-4">Status</th><th className="pb-4">Notes</th></tr></thead>
          <tbody>
            {data.victims.map((victim: any) => (
              <tr key={victim._id} className="border-t border-border/70"><td className="py-4 font-medium">{victim.name}</td><td className="py-4">{victim.age ?? "-"}</td><td className="py-4 capitalize">{victim.condition}</td><td className="py-4"><StatusBadge value={victim.rescueStatus} /></td><td className="py-4 text-muted-foreground">{victim.notes ?? "-"}</td></tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}
