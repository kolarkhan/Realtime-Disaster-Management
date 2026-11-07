import { NextRequest, NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { emitRealtime, emitToRole } from "@/lib/realtime";
import { SOCKET_EVENTS } from "@/lib/socket-events";
import { incidentReportSchema } from "@/lib/validators/incident";
import { Incident } from "@/models/Incident";

export async function GET(request: NextRequest) {
  const user = await requireApiUser(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const query: Record<string, unknown> = {};

  if (user.role === "citizen") {
    query.reportedBy = user.userId;
  }

  const incidents = await Incident.find(query)
    .populate("reportedBy", "name email")
    .populate("assignedTeam", "teamName")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ incidents: JSON.parse(JSON.stringify(incidents)) });
}

export async function POST(request: NextRequest) {
  const user = await requireApiUser(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = incidentReportSchema.parse(await request.json());
    await connectToDatabase();

    const incident = await Incident.create({
      title: body.title,
      type: body.type,
      description: body.description,
      severity: body.severity,
      location: {
        lat: body.lat,
        lng: body.lng,
        address: body.address
      },
      contact: {
        name: body.contactName,
        phone: body.contactPhone,
        email: body.contactEmail
      },
      imageUrl: body.imageUrl,
      reportedBy: user.userId,
      status: "reported"
    });

    emitRealtime(SOCKET_EVENTS.INCIDENT_CREATED, {
      id: incident._id.toString(),
      title: incident.title,
      severity: incident.severity,
      status: incident.status
    });
    emitToRole("admin", SOCKET_EVENTS.INCIDENT_CREATED, { id: incident._id.toString() });

    return NextResponse.json({ incident }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create incident." },
      { status: 400 }
    );
  }
}
