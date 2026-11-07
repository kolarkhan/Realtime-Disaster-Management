"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navByRole } from "@/data/navigation";
import { UserRole } from "@/types";

export function Sidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = navByRole[role];

  return (
    <>
      <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setOpen((value) => !value)}>
        <Menu className="size-4" />
      </Button>
      <aside className={cn("fixed inset-y-0 left-0 z-40 w-80 border-r border-border bg-background/85 p-5 backdrop-blur-xl transition lg:static lg:block", open ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
        <div className="flex h-full flex-col gap-8">
          <Logo />
          <div className="space-y-2">
            {items.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    active
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-auto rounded-[1.75rem] border border-border bg-gradient-to-br from-blue-500/10 via-transparent to-orange-500/10 p-5">
            <p className="font-semibold">Operations Tip</p>
            <p className="mt-2 text-sm text-muted-foreground">Keep location updates flowing during active missions so dispatch can rebalance rescue assets in real time.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
