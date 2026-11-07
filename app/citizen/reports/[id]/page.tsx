import { notFound } from "next/navigation";

import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { MapPlaceholder } from "@/components/dashboard/map-placeholder";
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/auth";
import { getIncidentById } from "@/lib/dashboard";
import { formatRelativeTime } from "@/lib/utils";

export default async function CitizenReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireRole(["citizen"]);
  const { id } = await params;
  const data = await getIncidentById(id);

  if (!data || data.incident.reportedBy?._id?.toString?.() !== user._id?.toString?.()) {
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
          <div className="flex gap-2">
            <SeverityBadge value={data.incident.severity} />
            <StatusBadge value={data.incident.status} />
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Type</p><p className="mt-2 font-medium capitalize">{data.incident.type}</p></div>
          <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Reported</p><p className="mt-2 font-medium">{formatRelativeTime(data.incident.createdAt)}</p></div>
          <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p><p className="mt-2 font-medium">{data.incident.contact?.phone ?? "Not provided"}</p></div>
        </CardContent>
      </Card>
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <MapPlaceholder points={[{ label: data.incident.title, lat: data.incident.location.lat, lng: data.incident.location.lng }]} />
        <ActivityTimeline items={[
          { id: "1", title: "Case reported", description: "Your report was received by the control room.", timestamp: formatRelativeTime(data.incident.createdAt) },
          { id: "2", title: "Latest update", description: `Current status is ${data.incident.status.replace(/_/g, " ")}.`, timestamp: formatRelativeTime(data.incident.updatedAt) }
        ]} />
      </div>
    </div>
  );
}
