import { NextRequest, NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { emitRealtime, emitToRole } from "@/lib/realtime";
import { SOCKET_EVENTS } from "@/lib/socket-events";
import { alertSchema } from "@/lib/validators/resource";
import { Alert } from "@/models/Alert";

export async function GET(request: NextRequest) {
  const user = await requireApiUser(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const query = user.role === "admin" ? {} : { sentToRole: user.role };
  const alerts = await Alert.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ alerts });
}

export async function POST(request: NextRequest) {
  const user = await requireApiUser(request, ["admin"]);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = alertSchema.parse(await request.json());
    await connectToDatabase();

    const alert = await Alert.create({ ...body, createdBy: user.userId });
    emitRealtime(SOCKET_EVENTS.ALERT_CREATED, { id: alert._id.toString(), title: alert.title, type: alert.type });
    emitToRole(alert.sentToRole, SOCKET_EVENTS.ALERT_CREATED, { id: alert._id.toString() });
    return NextResponse.json({ alert }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create alert." },
      { status: 400 }
    );
  }
}
