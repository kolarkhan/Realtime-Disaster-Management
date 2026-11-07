import { redirect } from "next/navigation";

import { LoginForm } from "@/components/forms/login-form";
import { Logo } from "@/components/logo";
import { DEMO_CREDENTIALS } from "@/lib/constants";
import { getCurrentUser } from "@/lib/auth";
import { getDefaultRouteForRole } from "@/lib/auth";

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(getDefaultRouteForRole(user.role));
  }

  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel hidden rounded-[2rem] p-8 lg:block">
          <Logo />
          <div className="mt-10 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Operations access</p>
            <h1 className="text-5xl font-semibold">Control emergency response from one secure command surface.</h1>
            <p className="text-muted-foreground">Sign in with seeded admin, team, or citizen credentials and explore the full multi-role workflow.</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <LoginForm demoCredentials={DEMO_CREDENTIALS} />
        </div>
      </div>
    </main>
  );
}
