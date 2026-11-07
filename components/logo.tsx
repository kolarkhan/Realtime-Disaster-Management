import Link from "next/link";
import { ShieldAlert } from "lucide-react";

import { cn } from "@/lib/utils";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-orange-500 to-blue-500 text-white shadow-glow">
        <ShieldAlert className="size-5" />
      </div>
      <div className={cn("space-y-0.5", compact && "hidden sm:block")}>
        <p className="font-display text-base font-semibold tracking-tight">RescueGrid</p>
        <p className="text-xs text-muted-foreground">Emergency operations platform</p>
      </div>
    </Link>
  );
}
