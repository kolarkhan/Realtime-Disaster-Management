import { NextRequest, NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { emitRealtime } from "@/lib/realtime";
import { SOCKET_EVENTS } from "@/lib/socket-events";
import { resourceSchema } from "@/lib/validators/resource";
import { Resource } from "@/models/Resource";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request, ["admin", "team"]);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = resourceSchema.partial().parse(await request.json());
    const { id } = await context.params;
    await connectToDatabase();

    const resource = await Resource.findByIdAndUpdate(id, body, { new: true });

    if (!resource) {
      return NextResponse.json({ error: "Resource not found." }, { status: 404 });
    }

    emitRealtime(SOCKET_EVENTS.RESOURCE_UPDATED, { id: resource._id.toString(), name: resource.name });
    return NextResponse.json({ resource });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update resource." },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request, ["admin"]);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await connectToDatabase();
  await Resource.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
