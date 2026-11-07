"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Bell, Siren, TriangleAlert } from "lucide-react";

import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";

export function NotificationDropdown({ alerts }: { alerts: any[] }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-2xl border border-border/70 bg-background/70 backdrop-blur">
          <Bell className="size-4" />
          {alerts.length > 0 ? <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" /> : null}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" className="z-50 w-[360px] rounded-3xl border border-border bg-background p-3 shadow-soft">
          <div className="mb-2 flex items-center justify-between px-2 py-1">
            <div>
              <p className="font-semibold">Notification Center</p>
              <p className="text-xs text-muted-foreground">Live alerts and operational notices</p>
            </div>
            <Siren className="size-4 text-rose-500" />
          </div>
          <div className="space-y-2">
            {alerts.length ? (
              alerts.slice(0, 6).map((alert) => (
                <DropdownMenu.Item
                  key={alert._id}
                  className="flex cursor-pointer select-none items-start gap-3 rounded-2xl px-3 py-3 outline-none transition hover:bg-muted"
                >
                  <div className="rounded-2xl bg-rose-500/10 p-2 text-rose-500">
                    <TriangleAlert className="size-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{alert.title}</p>
                      <StatusBadge value={alert.status} />
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{formatRelativeTime(alert.createdAt)}</p>
                  </div>
                </DropdownMenu.Item>
              ))
            ) : (
              <div className="rounded-2xl bg-muted/70 px-4 py-8 text-center text-sm text-muted-foreground">No alerts available.</div>
            )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
