import { model, models, Schema, type InferSchemaType } from "mongoose";

import { DISASTER_TYPES, INCIDENT_STATUSES, SEVERITY_LEVELS } from "@/lib/constants";

const incidentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: DISASTER_TYPES,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    severity: {
      type: String,
      enum: SEVERITY_LEVELS,
      required: true
    },
    status: {
      type: String,
      enum: INCIDENT_STATUSES,
      default: "reported"
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, trim: true }
    },
    contact: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true },
      email: { type: String, trim: true }
    },
    reportedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    assignedTeam: {
      type: Schema.Types.ObjectId,
      ref: "RescueTeam"
    },
    imageUrl: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

incidentSchema.index({ status: 1, severity: 1, createdAt: -1 });
incidentSchema.index({ reportedBy: 1, createdAt: -1 });

export type IncidentDocument = InferSchemaType<typeof incidentSchema> & { _id: string };
export const Incident = models.Incident || model("Incident", incidentSchema);
