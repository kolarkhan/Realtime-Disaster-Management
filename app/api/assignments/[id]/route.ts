import { NextRequest, NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { emitRealtime } from "@/lib/realtime";
import { SOCKET_EVENTS } from "@/lib/socket-events";
import { missionUpdateSchema } from "@/lib/validators/incident";
import { Assignment } from "@/models/Assignment";
import { Incident } from "@/models/Incident";
import { RescueTeam } from "@/models/RescueTeam";

const incidentStatusMap = {
  pending: "assigned",
  accepted: "assigned",
  en_route: "in_progress",
  in_progress: "in_progress",
  rescued: "resolved",
  completed: "closed"
} as const;

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request, ["team", "admin"]);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = missionUpdateSchema.parse(await request.json());
    const { id } = await context.params;
    await connectToDatabase();

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return NextResponse.json({ error: "Assignment not found." }, { status: 404 });
    }

    assignment.progressStatus = body.progressStatus;
    assignment.remarks = body.remarks;
    await assignment.save();

    await Promise.all([
      Incident.findByIdAndUpdate(assignment.incidentId, { status: incidentStatusMap[body.progressStatus] }),
      RescueTeam.findByIdAndUpdate(assignment.teamId, {
        currentLocation: { lat: body.currentLat, lng: body.currentLng },
        availabilityStatus: body.progressStatus === "completed" ? "available" : "deployed"
      })
    ]);

    emitRealtime(SOCKET_EVENTS.TEAM_PROGRESS_UPDATED, {
      assignmentId: assignment._id.toString(),
      progressStatus: assignment.progressStatus
    });

    return NextResponse.json({ assignment });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update mission." },
      { status: 400 }
    );
  }
}
