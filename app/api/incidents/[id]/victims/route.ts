import { NextRequest, NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { victimSchema } from "@/lib/validators/incident";
import { Victim } from "@/models/Victim";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request, ["admin", "team"]);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = victimSchema.partial({ incidentId: true }).parse(await request.json());
    const { id } = await context.params;
    await connectToDatabase();

    const victim = await Victim.create({
      incidentId: id,
      name: body.name,
      age: body.age,
      condition: body.condition,
      rescueStatus: body.rescueStatus,
      notes: body.notes
    });

    return NextResponse.json({ victim }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create victim." },
      { status: 400 }
    );
  }
}
