import { NextRequest, NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { emitRealtime } from "@/lib/realtime";
import { SOCKET_EVENTS } from "@/lib/socket-events";
import { incidentStatusSchema } from "@/lib/validators/incident";
import { Incident } from "@/models/Incident";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request, ["admin"]);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = incidentStatusSchema.parse(await request.json());
    const { id } = await context.params;
    await connectToDatabase();

    const incident = await Incident.findByIdAndUpdate(id, { status: body.status }, { new: true });

    if (!incident) {
      return NextResponse.json({ error: "Incident not found." }, { status: 404 });
    }

    emitRealtime(SOCKET_EVENTS.INCIDENT_UPDATED, {
      id: incident._id.toString(),
      status: incident.status
    });

    return NextResponse.json({ incident });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update status." },
      { status: 400 }
    );
  }
}
