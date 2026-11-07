import type React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export function SearchFilterToolbar({
  title,
  description,
  children,
  placeholder = "Search incidents, teams, or resources"
}: {
  title: string;
  description: string;
  placeholder?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder={placeholder} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

