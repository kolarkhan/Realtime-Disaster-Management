import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/lib/constants";
import { decodeTokenUnsafe } from "@/lib/jwt-payload";

const protectedPrefixMap = {
  "/admin": ["admin"],
  "/team": ["team"],
  "/citizen": ["citizen"]
} as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  const isProtected = Object.keys(protectedPrefixMap).some((prefix) => pathname.startsWith(prefix));

  if (!isProtected) {
    if (token && ["/login", "/signup"].includes(pathname)) {
      const payload = decodeTokenUnsafe(token);

      if (payload?.role) {
        return NextResponse.redirect(new URL(getHomeForRole(payload.role), request.url));
      }
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const matched = Object.entries(protectedPrefixMap).find(([prefix]) => pathname.startsWith(prefix));

  if (!matched) {
    return NextResponse.next();
  }

  const [, allowedRoles] = matched;
  const payload = decodeTokenUnsafe(token);

  if (!payload?.role || !allowedRoles.includes(payload.role as "admin" | "team" | "citizen")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

function getHomeForRole(role: string) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "team") return "/team/dashboard";
  return "/citizen/dashboard";
}

export const config = {
  matcher: ["/login", "/signup", "/admin/:path*", "/team/:path*", "/citizen/:path*"]
};
