import { AlertForm } from "@/components/forms/alert-form";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { listAlerts } from "@/lib/dashboard";
import { formatRelativeTime } from "@/lib/utils";

export default async function AdminAlertsPage() {
  const alerts = await listAlerts();

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <Card>
        <CardHeader><div><CardTitle>Create operational alert</CardTitle><CardDescription>Issue in-app notifications and prepare for future SMS or email fan-out.</CardDescription></div></CardHeader>
        <CardContent><AlertForm /></CardContent>
      </Card>
      <Card>
        <CardHeader><div><CardTitle>Alert center</CardTitle><CardDescription>Most recent broadcast alerts across all roles.</CardDescription></div></CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert: any) => (
            <div key={alert._id} className="rounded-[1.5rem] border border-border p-4">
              <div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold">{alert.title}</h3><p className="mt-1 text-sm text-muted-foreground">{alert.message}</p></div><StatusBadge value={alert.status} /></div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground"><span>Audience: {alert.sentToRole}</span><span>{formatRelativeTime(alert.createdAt)}</span></div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
