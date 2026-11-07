import { AuthTokenPayload } from "@/types";

export function decodeTokenUnsafe(token: string) {
  const [, payload = ""] = token.split(".");

  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    const decoded = atob(padded);
    return JSON.parse(decoded) as Partial<AuthTokenPayload>;
  } catch {
    return null;
  }
}
