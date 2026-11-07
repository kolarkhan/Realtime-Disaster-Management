import { model, models, Schema, type InferSchemaType } from "mongoose";

import { ALERT_STATUSES, ALERT_TYPES, USER_ROLES } from "@/lib/constants";

const alertSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ALERT_TYPES,
      default: "info"
    },
    sentToRole: {
      type: String,
      enum: USER_ROLES,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ALERT_STATUSES,
      default: "draft"
    }
  },
  {
    timestamps: true
  }
);

alertSchema.index({ sentToRole: 1, createdAt: -1 });

export type AlertDocument = InferSchemaType<typeof alertSchema> & { _id: string };
export const Alert = models.Alert || model("Alert", alertSchema);
