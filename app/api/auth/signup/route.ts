import { NextResponse } from "next/server";

import { createAuthCookie, hashPassword, signAuthToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { signupSchema } from "@/lib/validators/auth";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = signupSchema.parse(await request.json());
    await connectToDatabase();

    const existing = await User.findOne({ email: body.email.toLowerCase() });

    if (existing) {
      return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    }

    const passwordHash = await hashPassword(body.password);

    const user = await User.create({
      name: body.name,
      email: body.email.toLowerCase(),
      passwordHash,
      role: body.role,
      phone: body.phone,
      status: "active"
    });

    const token = signAuthToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name
    });

    const response = NextResponse.json({
      message: "Account created successfully.",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

    createAuthCookie(response, token);
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create account." },
      { status: 400 }
    );
  }
}
