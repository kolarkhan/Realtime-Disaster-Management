import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { AUTH_COOKIE_NAME, JWT_EXPIRATION } from "@/lib/constants";
import { env } from "@/lib/env";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { AuthTokenPayload, UserRole } from "@/types";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export function signAuthToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: JWT_EXPIRATION
  });
}

export function verifyAuthToken(token: string) {
  return jwt.verify(token, env.jwtSecret) as AuthTokenPayload;
}

export function createAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = verifyAuthToken(token);
    await connectToDatabase();
    const user = await User.findById(payload.userId).lean();
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch {
    return null;
  }
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireRole(roles: UserRole[]) {
  const user = await requireUser();

  if (!roles.includes(user.role)) {
    redirect(getDefaultRouteForRole(user.role));
  }

  return user;
}

export function getTokenFromRequest(request: NextRequest) {
  return request.cookies.get(AUTH_COOKIE_NAME)?.value;
}

export async function requireApiUser(request: NextRequest, roles?: UserRole[]) {
  const token = getTokenFromRequest(request);

  if (!token) {
    return null;
  }

  try {
    const payload = verifyAuthToken(token);

    if (roles && !roles.includes(payload.role)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function getDefaultRouteForRole(role: UserRole) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "team") return "/team/dashboard";
  return "/citizen/dashboard";
}
