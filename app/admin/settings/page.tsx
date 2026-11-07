import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminSettingsSummary } from "@/lib/dashboard";

export default async function AdminSettingsPage() {
  const summary = await getAdminSettingsSummary();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><div><CardTitle>Platform settings</CardTitle><CardDescription>Configuration overview for demo deployment, integrations, and system readiness.</CardDescription></div></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-muted/60 p-4"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Users</p><p className="mt-2 text-2xl font-semibold">{summary.userCount}</p></div>
          <div className="rounded-2xl bg-muted/60 p-4"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Teams</p><p className="mt-2 text-2xl font-semibold">{summary.teamCount}</p></div>
          <div className="rounded-2xl bg-muted/60 p-4"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Incidents</p><p className="mt-2 text-2xl font-semibold">{summary.incidentCount}</p></div>
          <div className="rounded-2xl bg-muted/60 p-4"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Alerts</p><p className="mt-2 text-2xl font-semibold">{summary.alertCount}</p></div>
        </CardContent>
      </Card>
      <div className="grid gap-5 md:grid-cols-3">
        <Card><CardContent className="space-y-3"><h3 className="text-xl font-semibold">Maps integration</h3><p className="text-sm text-muted-foreground">TODO: connect Google Maps using `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.</p><p className="font-medium">Configured: {summary.integrations.mapsConfigured ? "Yes" : "No"}</p></CardContent></Card>
        <Card><CardContent className="space-y-3"><h3 className="text-xl font-semibold">SMS alerts</h3><p className="text-sm text-muted-foreground">TODO: connect Twilio using the environment variables in `.env.example`.</p><p className="font-medium">Configured: {summary.integrations.smsConfigured ? "Yes" : "No"}</p></CardContent></Card>
        <Card><CardContent className="space-y-3"><h3 className="text-xl font-semibold">Email alerts</h3><p className="text-sm text-muted-foreground">TODO: connect SMTP or Nodemailer transport when ready.</p><p className="font-medium">Configured: {summary.integrations.emailConfigured ? "Yes" : "No"}</p></CardContent></Card>
      </div>
    </div>
  );
}
