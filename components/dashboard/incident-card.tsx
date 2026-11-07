import { MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatRelativeTime } from "@/lib/utils";

export function IncidentCard({ incident }: { incident: any }) {
  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-soft">
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{incident.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{incident.description}</p>
          </div>
          <SeverityBadge value={incident.severity} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge value={incident.status} />
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            {incident.location?.address ?? `${incident.location?.lat}, ${incident.location?.lng}`}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{incident.type}</span>
          <span>{formatRelativeTime(incident.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
