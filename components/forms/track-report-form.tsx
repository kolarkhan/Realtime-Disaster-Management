"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TrackReportForm() {
  const router = useRouter();
  const [reportId, setReportId] = useState("");

  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <Input value={reportId} onChange={(event) => setReportId(event.target.value)} placeholder="Enter your incident report ID" />
        <Button onClick={() => router.push(`/citizen/reports/${reportId}`)} disabled={!reportId}>
          Track report
        </Button>
      </div>
    </div>
  );
}
