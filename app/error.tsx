"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <div className="glass-panel max-w-xl rounded-3xl p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">System fault</p>
        <h1 className="mt-3 text-3xl font-semibold">Something interrupted the emergency workflow.</h1>
        <p className="mt-3 text-muted-foreground">Retry the page. If the issue persists, check your environment variables and MongoDB connection.</p>
        <Button className="mt-6" onClick={() => reset()}>
          Retry
        </Button>
      </div>
    </div>
  );
}
