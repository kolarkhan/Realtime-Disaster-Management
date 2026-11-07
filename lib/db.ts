import mongoose from "mongoose";

import { env } from "@/lib/env";

declare global {
  // eslint-disable-next-line no-var
  var __mongoose:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = global.__mongoose ?? { conn: null, promise: null };

if (!global.__mongoose) {
  global.__mongoose = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(env.mongoUri, {
      dbName: "disaster-management"
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
