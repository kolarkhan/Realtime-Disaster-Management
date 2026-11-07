import { model, models, Schema, type InferSchemaType } from "mongoose";

import { USER_ROLES } from "@/lib/constants";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: USER_ROLES,
      required: true,
      default: "citizen"
    },
    phone: {
      type: String,
      trim: true
    },
    avatar: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ["active", "inactive", "busy"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);


export type UserDocument = InferSchemaType<typeof userSchema> & { _id: string };
export const User = models.User || model("User", userSchema);

