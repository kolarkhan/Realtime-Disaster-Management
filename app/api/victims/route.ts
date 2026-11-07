import { NextRequest, NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Victim } from "@/models/Victim";

export async function GET(request: NextRequest) {
  const user = await requireApiUser(request, ["admin", "team"]);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const victims = await Victim.find().populate("incidentId", "title severity status").sort({ createdAt: -1 }).lean();
  return NextResponse.json({ victims });
}
