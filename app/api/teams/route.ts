import { NextRequest, NextResponse } from "next/server";

import { hashPassword, requireApiUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { createTeamSchema } from "@/lib/validators/team";
import { RescueTeam } from "@/models/RescueTeam";
import { User } from "@/models/User";

export async function GET(request: NextRequest) {
  const user = await requireApiUser(request, ["admin", "team"]);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const teams = await RescueTeam.find().sort({ teamName: 1 }).lean();
  return NextResponse.json({ teams });
}

export async function POST(request: NextRequest) {
  const admin = await requireApiUser(request, ["admin"]);

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = createTeamSchema.parse(await request.json());
    await connectToDatabase();

    const existingUser = await User.findOne({ email: body.email.toLowerCase() });

    if (existingUser) {
      return NextResponse.json({ error: "A user with that email already exists." }, { status: 409 });
    }

    const existingTeam = await RescueTeam.findOne({ teamName: body.teamName.trim() });

    if (existingTeam) {
      return NextResponse.json({ error: "A rescue team with that name already exists." }, { status: 409 });
    }

    const passwordHash = await hashPassword(body.password);

    const createdUser = await User.create({
      name: body.name,
      email: body.email.toLowerCase(),
      passwordHash,
      role: "team",
      phone: body.phone,
      status: body.availabilityStatus === "maintenance" ? "inactive" : "active"
    });

    try {
      const team = await RescueTeam.create({
        teamName: body.teamName.trim(),
        membersCount: body.membersCount,
        vehicleType: body.vehicleType,
        currentLocation: {
          lat: body.currentLat,
          lng: body.currentLng
        },
        availabilityStatus: body.availabilityStatus,
        contactNumber: body.contactNumber,
        assignedIncidents: [],
        linkedUser: createdUser._id
      });

      return NextResponse.json(
        {
          message: "Team account created successfully.",
          user: {
            id: createdUser._id.toString(),
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role
          },
          team
        },
        { status: 201 }
      );
    } catch (teamError) {
      await User.findByIdAndDelete(createdUser._id);
      throw teamError;
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create rescue team account." },
      { status: 400 }
    );
  }
}
