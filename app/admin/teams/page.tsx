import { TeamCreateModal } from "@/components/dashboard/team-create-modal";
import { MapPlaceholder } from "@/components/dashboard/map-placeholder";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { listTeams } from "@/lib/dashboard";

export default async function AdminTeamsPage() {
  const teams = await listTeams();

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-3xl p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Rescue teams</h2>
            <p className="text-sm text-muted-foreground">Availability, fleet readiness, and current deployment visibility for all field units.</p>
          </div>
          <TeamCreateModal />
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {teams.map((team: any) => (
            <Card key={team._id}>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{team.teamName}</h3>
                    <p className="text-sm text-muted-foreground">{team.vehicleType} • {team.membersCount} members</p>
                  </div>
                  <StatusBadge value={team.availabilityStatus} />
                </div>
                <div className="grid gap-3 text-sm text-muted-foreground">
                  <p>Contact: {team.contactNumber}</p>
                  <p>Assigned incidents: {team.assignedIncidents?.length ?? 0}</p>
                  <p>Location: {team.currentLocation?.lat}, {team.currentLocation?.lng}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <MapPlaceholder
          title="Team deployment map"
          description="Current rescue team coordinates and incident coverage zones."
          points={teams.slice(0, 5).map((team: any) => ({ label: team.teamName, lat: team.currentLocation.lat, lng: team.currentLocation.lng }))}
        />
      </div>
    </div>
  );
}
