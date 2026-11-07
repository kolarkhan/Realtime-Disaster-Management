import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <div className="glass-panel max-w-xl rounded-[2rem] p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">404</p>
        <h1 className="mt-3 text-4xl font-semibold">Requested page not found</h1>
        <p className="mt-3 text-muted-foreground">The route may have moved, or the incident reference is invalid.</p>
        <Button asChild className="mt-6"><Link href="/">Return home</Link></Button>
      </div>
    </div>
  );
}
