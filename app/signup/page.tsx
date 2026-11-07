import { redirect } from "next/navigation";

import { SignupForm } from "@/components/forms/signup-form";
import { Logo } from "@/components/logo";
import { getCurrentUser } from "@/lib/auth";
import { getDefaultRouteForRole } from "@/lib/auth";

export default async function SignupPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(getDefaultRouteForRole(user.role));
  }

  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel hidden rounded-[2rem] p-8 lg:block">
          <Logo />
          <div className="mt-10 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">Citizen onboarding</p>
            <h1 className="text-5xl font-semibold">Register quickly and stay connected to every report you submit.</h1>
            <p className="text-muted-foreground">Citizens can create new accounts instantly. Demo team and admin accounts are created by the seed script for presentation use.</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
