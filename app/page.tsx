import Link from "next/link";
import { Activity, ArrowRight, BellRing, Radar, ShieldCheck, Users2 } from "lucide-react";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPlatformOverview } from "@/lib/dashboard";

export default async function HomePage() {
  const stats = await getPlatformOverview();

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/90 px-4 py-4 backdrop-blur-xl md:px-8 lg:px-12">
        <Logo />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button asChild variant="outline"><Link href="/login">Sign in</Link></Button>
          <Button asChild><Link href="/report-incident">Report emergency</Link></Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-8 lg:px-12">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 md:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-rose-500/10" />
            <div className="relative max-w-3xl space-y-6">
              <p className="inline-flex rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">
                Real-time emergency operations center
              </p>
              <div className="space-y-4">
                <h1 className="text-5xl font-semibold leading-tight md:text-6xl">
                  Coordinate disaster response with live incident tracking, rescue dispatch, and field updates.
                </h1>
                <p className="max-w-2xl text-lg text-muted-foreground">
                  RescueGrid brings citizens, control-room administrators, and rescue teams into one operational platform with live status updates, resource allocation, and mission visibility.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg"><Link href="/report-incident">Report an incident <ArrowRight className="size-4" /></Link></Button>
                <Button asChild size="lg" variant="outline"><Link href="/emergency-guide">Emergency guide</Link></Button>
              </div>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-3xl border border-border bg-background/60 p-4">
                  <p className="text-3xl font-semibold">{stats.totalIncidents}</p>
                  <p className="text-sm text-muted-foreground">Total incidents logged</p>
                </div>
                <div className="rounded-3xl border border-border bg-background/60 p-4">
                  <p className="text-3xl font-semibold">{stats.activeIncidents}</p>
                  <p className="text-sm text-muted-foreground">Active emergencies</p>
                </div>
                <div className="rounded-3xl border border-border bg-background/60 p-4">
                  <p className="text-3xl font-semibold">{stats.availableTeams}</p>
                  <p className="text-sm text-muted-foreground">Available rescue teams</p>
                </div>
                <div className="rounded-3xl border border-border bg-background/60 p-4">
                  <p className="text-3xl font-semibold">{stats.totalResources}</p>
                  <p className="text-sm text-muted-foreground">Deployable resources</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-500"><Radar className="size-5" /></div>
                  <div>
                    <h3 className="text-xl font-semibold">Live operations visibility</h3>
                    <p className="text-sm text-muted-foreground">Real-time incident broadcasts, team tracking, and alert feeds.</p>
                  </div>
                </div>
                <div className="space-y-4 rounded-[1.75rem] bg-muted/60 p-5">
                  <div className="flex items-center justify-between text-sm"><span>Dispatch readiness</span><span className="font-semibold text-emerald-500">92%</span></div>
                  <div className="h-2 rounded-full bg-background"><div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" /></div>
                  <div className="flex items-center justify-between text-sm"><span>Critical alert routing</span><span className="font-semibold text-rose-500">Instant</span></div>
                  <div className="h-2 rounded-full bg-background"><div className="h-2 w-full rounded-full bg-gradient-to-r from-rose-500 to-orange-500" /></div>
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card><CardContent className="space-y-3"><Activity className="size-6 text-blue-500" /><h3 className="text-lg font-semibold">Analytics</h3><p className="text-sm text-muted-foreground">Response time widgets, incident trends, and severity distribution charts.</p></CardContent></Card>
              <Card><CardContent className="space-y-3"><Users2 className="size-6 text-orange-500" /><h3 className="text-lg font-semibold">Multi-role workflows</h3><p className="text-sm text-muted-foreground">Citizen submissions, rescue-team updates, and admin assignment control.</p></CardContent></Card>
              <Card><CardContent className="space-y-3"><BellRing className="size-6 text-rose-500" /><h3 className="text-lg font-semibold">Alerts</h3><p className="text-sm text-muted-foreground">Prepared for future SMS and email integrations with clean abstractions.</p></CardContent></Card>
              <Card><CardContent className="space-y-3"><ShieldCheck className="size-6 text-emerald-500" /><h3 className="text-lg font-semibold">Secure access</h3><p className="text-sm text-muted-foreground">JWT sessions, protected routes, and role-based dashboards.</p></CardContent></Card>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
