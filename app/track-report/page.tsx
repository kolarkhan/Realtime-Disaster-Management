import { TrackReportForm } from "@/components/forms/track-report-form";
import { Logo } from "@/components/logo";

export default function TrackReportPage() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <div className="space-y-6">
        <Logo />
        <div className="glass-panel rounded-[2rem] p-8">
          <h1 className="text-4xl font-semibold">Track your emergency report</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Enter the report ID issued after submission to jump directly to the detailed incident timeline.</p>
        </div>
        <TrackReportForm />
      </div>
    </main>
  );
}
