import { cn } from "@/lib/utils";

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("glass-panel animate-pulse rounded-3xl p-6", className)}>
      <div className="h-4 w-24 rounded bg-muted" />
      <div className="mt-4 h-8 w-32 rounded bg-muted" />
      <div className="mt-6 h-3 w-full rounded bg-muted" />
      <div className="mt-2 h-3 w-2/3 rounded bg-muted" />
    </div>
  );
}
