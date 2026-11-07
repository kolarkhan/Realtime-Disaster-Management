import { NextRequest, NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { emitRealtime } from "@/lib/realtime";
import { SOCKET_EVENTS } from "@/lib/socket-events";
import { resourceSchema as resourceInput } from "@/lib/validators/resource";
import { Resource } from "@/models/Resource";

export async function GET(request: NextRequest) {
  const user = await requireApiUser(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const resources = await Resource.find().sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ resources });
}

export async function POST(request: NextRequest) {
  const user = await requireApiUser(request, ["admin", "team"]);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = resourceInput.parse(await request.json());
    await connectToDatabase();

    const resource = await Resource.create(body);
    emitRealtime(SOCKET_EVENTS.RESOURCE_UPDATED, { id: resource._id.toString(), name: resource.name });
    return NextResponse.json({ resource }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create resource." },
      { status: 400 }
    );
  }
}
