import { NextRequest, NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Assignment } from "@/models/Assignment";
import { RescueTeam } from "@/models/RescueTeam";

export async function GET(request: NextRequest) {
  const user = await requireApiUser(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  let query = {};

  if (user.role === "team") {
    const team = await RescueTeam.findOne({ linkedUser: user.userId });
    query = team ? { teamId: team._id } : { _id: null };
  }

  const assignments = await Assignment.find(query)
    .populate("incidentId")
    .populate("teamId", "teamName")
    .sort({ updatedAt: -1 })
    .lean();

  return NextResponse.json({ assignments });
}
