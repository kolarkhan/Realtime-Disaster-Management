import Link from "next/link";

import { IncidentReportForm } from "@/components/forms/incident-report-form";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";

export default async function ReportIncidentPage() {
  const user = await getCurrentUser();

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Logo />
          <Button asChild variant="outline"><Link href={user ? "/citizen/dashboard" : "/login"}>{user ? "Back to dashboard" : "Sign in"}</Link></Button>
        </div>
        {user ? (
          <IncidentReportForm />
        ) : (
          <div className="glass-panel rounded-[2rem] p-8 text-center">
            <h1 className="text-3xl font-semibold">Sign in to submit a verified incident report.</h1>
            <p className="mt-3 text-muted-foreground">Authentication keeps report ownership, tracking, and rescue coordination tied to your session.</p>
            <Button asChild className="mt-6"><Link href="/login">Sign in to continue</Link></Button>
          </div>
        )}
      </div>
    </main>
  );
}
