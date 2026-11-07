import { Badge } from "@/components/ui/badge";

const toneMap = {
  low: "info",
  medium: "warning",
  high: "critical",
  critical: "critical"
} as const;

export function SeverityBadge({ value }: { value: string }) {
  return <Badge tone={toneMap[value as keyof typeof toneMap] ?? "neutral"}>{value.replace("_", " ")}</Badge>;
}
