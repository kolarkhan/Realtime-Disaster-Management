import { NextRequest, NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { emitRealtime } from "@/lib/realtime";
import { SOCKET_EVENTS } from "@/lib/socket-events";
import { incidentStatusSchema } from "@/lib/validators/incident";
import { Assignment } from "@/models/Assignment";
import { Incident } from "@/models/Incident";
import { Victim } from "@/models/Victim";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await connectToDatabase();

  const [incident, victims, assignments] = await Promise.all([
    Incident.findById(id)
      .populate("reportedBy", "name email phone")
      .populate("assignedTeam", "teamName currentLocation contactNumber membersCount vehicleType availabilityStatus")
      .lean(),
    Victim.find({ incidentId: id }).lean(),
    Assignment.find({ incidentId: id }).populate("teamId", "teamName").sort({ updatedAt: -1 }).lean()
  ]);

  if (!incident) {
    return NextResponse.json({ error: "Incident not found." }, { status: 404 });
  }

  if (user.role === "citizen" && incident.reportedBy?._id?.toString?.() !== user.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ incident, victims, assignments });
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request, ["admin"]);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = incidentStatusSchema.partial().parse(await request.json());
    const { id } = await context.params;
    await connectToDatabase();

    const incident = await Incident.findByIdAndUpdate(id, body, { new: true });

    if (!incident) {
      return NextResponse.json({ error: "Incident not found." }, { status: 404 });
    }

    emitRealtime(SOCKET_EVENTS.INCIDENT_UPDATED, {
      id: incident._id.toString(),
      status: incident.status,
      severity: incident.severity
    });

    return NextResponse.json({ incident });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update incident." },
      { status: 400 }
    );
  }
}
