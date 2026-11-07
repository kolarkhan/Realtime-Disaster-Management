import { model, models, Schema, type InferSchemaType } from "mongoose";

const rescueTeamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
      trim: true
    },
    membersCount: {
      type: Number,
      required: true,
      min: 1
    },
    vehicleType: {
      type: String,
      required: true,
      trim: true
    },
    currentLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    availabilityStatus: {
      type: String,
      enum: ["available", "deployed", "maintenance"],
      default: "available"
    },
    contactNumber: {
      type: String,
      required: true
    },
    assignedIncidents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Incident"
      }
    ],
    linkedUser: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

rescueTeamSchema.index({ availabilityStatus: 1 });

export type RescueTeamDocument = InferSchemaType<typeof rescueTeamSchema> & { _id: string };
export const RescueTeam = models.RescueTeam || model("RescueTeam", rescueTeamSchema);
