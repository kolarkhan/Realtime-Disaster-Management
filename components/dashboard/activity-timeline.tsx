import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ActivityTimeline({ items }: { items: Array<{ id: string; title: string; description: string; timestamp: string }> }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription>Recent operational events across the platform.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="mt-1 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/10" />
              <div className="space-y-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="text-xs text-muted-foreground">{item.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
