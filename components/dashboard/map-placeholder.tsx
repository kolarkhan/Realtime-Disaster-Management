import { MapPinned, Radar } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MapPlaceholder({
  title = "Geospatial Operations View",
  description = "Google Maps integration can be connected here when an API key is added.",
  points = []
}: {
  title?: string;
  description?: string;
  points?: Array<{ label: string; lat: number; lng: number }>;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-grid-pattern bg-[size:32px_32px] p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-orange-500/10" />
          <div className="relative grid min-h-[320px] place-items-center rounded-[1.5rem] border border-dashed border-border bg-background/60 backdrop-blur-sm">
            <div className="space-y-4 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <MapPinned className="size-8" />
              </div>
              <div>
                <p className="text-lg font-semibold">Map module ready for live geolocation</p>
                <p className="text-sm text-muted-foreground">TODO: Plug in Google Maps or Leaflet using `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
                {points.length ? (
                  points.map((point) => (
                    <div key={point.label} className="rounded-full bg-muted px-3 py-1">
                      {point.label}: {point.lat}, {point.lng}
                    </div>
                  ))
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1">
                    <Radar className="size-4" />
                    No live coordinates loaded yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
