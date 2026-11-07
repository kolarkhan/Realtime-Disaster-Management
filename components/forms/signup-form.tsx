"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { signupSchema } from "@/lib/validators/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: "citizen" }
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, role: "citizen" })
    });

    const payload = await response.json();

    if (!response.ok) {
      toast.error(payload.error ?? "Unable to create account.");
      return;
    }

    toast.success("Account created successfully.");
    router.push("/citizen/dashboard");
    router.refresh();
  });

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <div>
          <CardTitle className="text-3xl">Create an account</CardTitle>
          <CardDescription>Citizens can self-register. Demo rescue and admin accounts are seeded for presentation use.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Full name</label>
            <Input {...register("name")} placeholder="Ayesha Khan" />
            {errors.name ? <p className="text-xs text-rose-500">{errors.name.message as string}</p> : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input {...register("email")} placeholder="ayesha@example.com" />
              {errors.email ? <p className="text-xs text-rose-500">{errors.email.message as string}</p> : null}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input {...register("phone")} placeholder="+92 300 0000000" />
              {errors.phone ? <p className="text-xs text-rose-500">{errors.phone.message as string}</p> : null}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input type="password" {...register("password")} placeholder="Strong password" />
            {errors.password ? <p className="text-xs text-rose-500">{errors.password.message as string}</p> : null}
          </div>
          <input type="hidden" value="citizen" {...register("role")} />
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
          <p className="text-sm text-muted-foreground">
            Already registered? <Link href="/login" className="font-medium text-primary">Sign in</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
