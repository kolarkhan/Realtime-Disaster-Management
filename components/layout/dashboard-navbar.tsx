import { NotificationDropdown } from "@/components/dashboard/notification-dropdown";
import { LogoutButton } from "@/components/layout/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { getInitials } from "@/lib/utils";

export function DashboardNavbar({
  title,
  user,
  alerts
}: {
  title: string;
  user: any;
  alerts: any[];
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/90 px-4 py-4 backdrop-blur-xl md:px-6 lg:px-8">
      <div>
        <p className="text-sm text-muted-foreground">Live operations workspace</p>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <NotificationDropdown alerts={alerts} />
        <ThemeToggle />
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 px-3 py-2">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
            {getInitials(user.name ?? "RG")}
          </div>
          <div className="hidden text-left md:block">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs capitalize text-muted-foreground">{user.role}</p>
          </div>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
