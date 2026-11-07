import { model, models, Schema, type InferSchemaType } from "mongoose";

import { VICTIM_CONDITIONS, VICTIM_RESCUE_STATUSES } from "@/lib/constants";

const victimSchema = new Schema(
  {
    incidentId: {
      type: Schema.Types.ObjectId,
      ref: "Incident",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      min: 0
    },
    condition: {
      type: String,
      enum: VICTIM_CONDITIONS,
      default: "stable"
    },
    rescueStatus: {
      type: String,
      enum: VICTIM_RESCUE_STATUSES,
      default: "awaiting"
    },
    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

victimSchema.index({ incidentId: 1, rescueStatus: 1 });

export type VictimDocument = InferSchemaType<typeof victimSchema> & { _id: string };
export const Victim = models.Victim || model("Victim", victimSchema);
