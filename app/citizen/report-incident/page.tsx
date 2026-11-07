import Link from "next/link";

import { IncidentReportForm } from "@/components/forms/incident-report-form";
import { Button } from "@/components/ui/button";

export default function CitizenReportIncidentPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-[2rem] p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold">Report an emergency incident</h1>
            <p className="mt-3 max-w-3xl text-muted-foreground">Submit a verified incident directly from your citizen workspace. Your report will be linked to your account for live tracking and response updates.</p>
          </div>
          <Button asChild variant="outline"><Link href="/citizen/reports">Back to my reports</Link></Button>
        </div>
      </div>
      <IncidentReportForm />
    </div>
  );
}
