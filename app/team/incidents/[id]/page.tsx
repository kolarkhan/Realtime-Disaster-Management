import { notFound } from "next/navigation";

import { DataTable } from "@/components/dashboard/data-table";
import { MapPlaceholder } from "@/components/dashboard/map-placeholder";
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { MissionUpdateForm } from "@/components/forms/mission-update-form";
import { VictimForm } from "@/components/forms/victim-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getIncidentById, getTeamDashboardData } from "@/lib/dashboard";
import { requireRole } from "@/lib/auth";

export default async function TeamIncidentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireRole(["team"]);
  const { id } = await params;
  const [data, teamData] = await Promise.all([getIncidentById(id), getTeamDashboardData(user._id)]);

  if (!data) {
    notFound();
  }

  const assignment = teamData.assignments.find((item: any) => item.incidentId?._id?.toString() === id);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-3xl">{data.incident.title}</CardTitle>
            <CardDescription>{data.incident.description}</CardDescription>
          </div>
          <div className="flex gap-2"><SeverityBadge value={data.incident.severity} /><StatusBadge value={data.incident.status} /></div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Assigned team</p><p className="mt-2 font-medium">{data.incident.assignedTeam?.teamName ?? teamData.team?.teamName}</p></div>
          <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Vehicle</p><p className="mt-2 font-medium">{teamData.team?.vehicleType ?? "Field unit"}</p></div>
          <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p><p className="mt-2 font-medium">{data.incident.contact?.phone ?? "N/A"}</p></div>
          <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Address</p><p className="mt-2 font-medium">{data.incident.location.address ?? `${data.incident.location.lat}, ${data.incident.location.lng}`}</p></div>
        </CardContent>
      </Card>
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <MapPlaceholder title="Mission area" description="Incident and team coordinates for field situational awareness." points={[{ label: data.incident.title, lat: data.incident.location.lat, lng: data.incident.location.lng }, ...(teamData.team ? [{ label: teamData.team.teamName, lat: teamData.team.currentLocation.lat, lng: teamData.team.currentLocation.lng }] : [])]} />
        <Card>
          <CardHeader><div><CardTitle>Update mission status</CardTitle><CardDescription>Keep dispatch informed with live progress, position, and rescue notes.</CardDescription></div></CardHeader>
          <CardContent>{assignment ? <MissionUpdateForm assignmentId={assignment._id} defaults={{ progressStatus: assignment.progressStatus, currentLocation: teamData.team?.currentLocation, remarks: assignment.remarks }} /> : <p className="text-sm text-muted-foreground">No assignment record found for this incident.</p>}</CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><div><CardTitle>Add victim rescue notes</CardTitle><CardDescription>Register new victims or update field notes while on mission.</CardDescription></div></CardHeader>
        <CardContent><VictimForm incidentId={data.incident._id} /></CardContent>
      </Card>
      <DataTable title="Victims on scene" description="Known victims and rescue status for the current mission.">
        <table className="w-full text-left text-sm">
          <thead className="text-muted-foreground"><tr><th className="pb-4">Name</th><th className="pb-4">Condition</th><th className="pb-4">Rescue status</th><th className="pb-4">Notes</th></tr></thead>
          <tbody>
            {data.victims.map((victim: any) => (
              <tr key={victim._id} className="border-t border-border/70"><td className="py-4 font-medium">{victim.name}</td><td className="py-4 capitalize">{victim.condition}</td><td className="py-4"><StatusBadge value={victim.rescueStatus} /></td><td className="py-4 text-muted-foreground">{victim.notes ?? "-"}</td></tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}
