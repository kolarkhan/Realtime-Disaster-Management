import { model, models, Schema, type InferSchemaType } from "mongoose";

import { TEAM_MISSION_STATUSES } from "@/lib/constants";

const assignmentSchema = new Schema(
  {
    incidentId: {
      type: Schema.Types.ObjectId,
      ref: "Incident",
      required: true
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "RescueTeam",
      required: true
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    assignedAt: {
      type: Date,
      default: Date.now
    },
    progressStatus: {
      type: String,
      enum: TEAM_MISSION_STATUSES,
      default: "pending"
    },
    remarks: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

assignmentSchema.index({ incidentId: 1, teamId: 1 });

export type AssignmentDocument = InferSchemaType<typeof assignmentSchema> & { _id: string };
export const Assignment = models.Assignment || model("Assignment", assignmentSchema);
