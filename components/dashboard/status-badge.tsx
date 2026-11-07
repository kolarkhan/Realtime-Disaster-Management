import { Badge } from "@/components/ui/badge";

const toneMap: Record<string, "neutral" | "info" | "success" | "warning" | "critical"> = {
  reported: "warning",
  verified: "info",
  assigned: "info",
  in_progress: "critical",
  resolved: "success",
  closed: "success",
  pending: "warning",
  accepted: "info",
  en_route: "info",
  rescued: "success",
  completed: "success",
  available: "success",
  limited: "warning",
  allocated: "info",
  maintenance: "critical",
  active: "success",
  inactive: "critical",
  busy: "warning",
  sent: "info",
  draft: "warning",
  archived: "neutral",
  awaiting: "warning",
  identified: "info",
  evacuated: "success",
  deployed: "info"
};

export function StatusBadge({ value }: { value: string }) {
  return <Badge tone={toneMap[value] ?? "neutral"}>{value.replace(/_/g, " ")}</Badge>;
}
