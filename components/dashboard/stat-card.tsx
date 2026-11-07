import type React from "react";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  delta,
  icon,
  tone = "info"
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon: React.ReactNode;
  tone?: "info" | "success" | "warning" | "critical";
}) {
  const toneClasses = {
    info: "from-blue-500/10 to-sky-500/5 text-blue-600 dark:text-blue-300",
    success: "from-emerald-500/10 to-teal-500/5 text-emerald-600 dark:text-emerald-300",
    warning: "from-orange-500/10 to-amber-500/5 text-orange-600 dark:text-orange-300",
    critical: "from-rose-500/10 to-red-500/5 text-rose-600 dark:text-rose-300"
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div>
          <CardDescription>{label}</CardDescription>
          <CardTitle className="mt-2 text-3xl">{value}</CardTitle>
        </div>
        <div className={`rounded-2xl bg-gradient-to-br p-3 ${toneClasses[tone]}`}>{icon}</div>
      </CardHeader>
      <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{delta ?? "Live operational baseline"}</span>
        <ArrowUpRight className="size-4" />
      </CardContent>
    </Card>
  );
}

