"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        toast.success("Signed out successfully.");
        router.push("/login");
        router.refresh();
      }}
    >
      <LogOut className="size-4" />
    </Button>
  );
}
