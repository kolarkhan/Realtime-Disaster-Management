"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema } from "@/lib/validators/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginForm({ demoCredentials }: { demoCredentials: Record<string, { email: string; password: string }> }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    const payload = await response.json();

    if (!response.ok) {
      toast.error(payload.error ?? "Unable to login.");
      return;
    }

    toast.success("Welcome back to RescueGrid.");
    router.push(payload.user.redirectTo);
    router.refresh();
  });

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <div>
          <CardTitle className="text-3xl">Secure sign in</CardTitle>
          <CardDescription>Access real-time dashboards for citizens, rescue teams, and control room administrators.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input {...register("email")} placeholder="you@example.com" />
            {errors.email ? <p className="text-xs text-rose-500">{errors.email.message as string}</p> : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input type="password" {...register("password")} placeholder="Enter your password" />
            {errors.password ? <p className="text-xs text-rose-500">{errors.password.message as string}</p> : null}
          </div>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <div className="space-y-3 rounded-[1.75rem] bg-muted/60 p-4">
          <p className="text-sm font-medium">Demo access</p>
          <div className="grid gap-2 md:grid-cols-3">
            {Object.entries(demoCredentials).map(([role, credentials]) => (
              <button
                key={role}
                type="button"
                className="rounded-2xl border border-border bg-background px-3 py-3 text-left text-sm transition hover:border-primary"
                onClick={() => {
                  setValue("email", credentials.email);
                  setValue("password", credentials.password);
                }}
              >
                <p className="font-semibold capitalize">{role}</p>
                <p className="truncate text-xs text-muted-foreground">{credentials.email}</p>
              </button>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Need an account? <Link href="/signup" className="font-medium text-primary">Create one here</Link>
        </p>
      </CardContent>
    </Card>
  );
}
