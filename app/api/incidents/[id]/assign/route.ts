import { NextRequest, NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { emitRealtime, emitToRole } from "@/lib/realtime";
import { SOCKET_EVENTS } from "@/lib/socket-events";
import { assignmentSchema } from "@/lib/validators/incident";
import { Assignment } from "@/models/Assignment";
import { Incident } from "@/models/Incident";
import { RescueTeam } from "@/models/RescueTeam";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request, ["admin"]);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = assignmentSchema.parse(await request.json());
    const { id } = await context.params;
    await connectToDatabase();

    const [incident, team] = await Promise.all([Incident.findById(id), RescueTeam.findById(body.teamId)]);

    if (!incident || !team) {
      return NextResponse.json({ error: "Incident or team not found." }, { status: 404 });
    }

    incident.assignedTeam = team._id;
    incident.status = "assigned";
    await incident.save();

    team.assignedIncidents = Array.from(new Set([...(team.assignedIncidents ?? []), incident._id]));
    team.availabilityStatus = "deployed";
    await team.save();

    const assignment = await Assignment.create({
      incidentId: incident._id,
      teamId: team._id,
      assignedBy: user.userId,
      progressStatus: "pending",
      remarks: body.remarks
    });

    emitRealtime(SOCKET_EVENTS.INCIDENT_ASSIGNED, {
      incidentId: incident._id.toString(),
      teamId: team._id.toString(),
      teamName: team.teamName
    });
    emitToRole("team", SOCKET_EVENTS.INCIDENT_ASSIGNED, { incidentId: incident._id.toString() });

    return NextResponse.json({ assignment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to assign rescue team." },
      { status: 400 }
    );
  }
}
