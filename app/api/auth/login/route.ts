import { NextResponse } from "next/server";

import { createAuthCookie, comparePassword, getDefaultRouteForRole, signAuthToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { loginSchema } from "@/lib/validators/auth";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = loginSchema.parse(await request.json());
    await connectToDatabase();

    const user = await User.findOne({ email: body.email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const valid = await comparePassword(body.password, user.passwordHash);

    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = signAuthToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name
    });

    const response = NextResponse.json({
      message: "Login successful.",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        redirectTo: getDefaultRouteForRole(user.role)
      }
    });

    createAuthCookie(response, token);
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to login." },
      { status: 400 }
    );
  }
}
