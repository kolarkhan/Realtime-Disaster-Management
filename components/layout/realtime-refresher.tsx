"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useRealtime } from "@/hooks/use-realtime";
import { SOCKET_EVENTS } from "@/lib/socket-events";

const eventMessages: Record<string, string> = {
  [SOCKET_EVENTS.INCIDENT_CREATED]: "New incident received.",
  [SOCKET_EVENTS.INCIDENT_UPDATED]: "Incident status changed.",
  [SOCKET_EVENTS.INCIDENT_ASSIGNED]: "Rescue team assignment updated.",
  [SOCKET_EVENTS.TEAM_PROGRESS_UPDATED]: "Field mission progress updated.",
  [SOCKET_EVENTS.ALERT_CREATED]: "New alert issued.",
  [SOCKET_EVENTS.RESOURCE_UPDATED]: "Resource inventory updated."
};

const realtimeEvents = Object.values(SOCKET_EVENTS);

export function RealtimeRefresher({ role, userId }: { role: string; userId: string }) {
  const router = useRouter();

  const handleEvent = useCallback(
    (event: string) => {
      toast.info(eventMessages[event] ?? "Live update received.");
      router.refresh();
    },
    [router]
  );

  useRealtime({ role, userId, events: realtimeEvents, onEvent: handleEvent });
  return null;
}
