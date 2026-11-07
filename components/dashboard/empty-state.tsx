import type React from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  className
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("glass-panel flex min-h-[240px] flex-col items-center justify-center rounded-3xl border-dashed text-center", className)}>
      <div className="max-w-md space-y-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        {action}
      </div>
    </div>
  );
}

