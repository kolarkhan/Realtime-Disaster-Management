import { model, models, Schema, type InferSchemaType } from "mongoose";

import { RESOURCE_CATEGORIES, RESOURCE_STATUSES } from "@/lib/constants";

const resourceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: RESOURCE_CATEGORIES,
      required: true
    },
    quantityAvailable: {
      type: Number,
      required: true,
      min: 0
    },
    allocatedQuantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    location: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: RESOURCE_STATUSES,
      default: "available"
    }
  },
  {
    timestamps: true
  }
);

resourceSchema.index({ category: 1, status: 1 });

export type ResourceDocument = InferSchemaType<typeof resourceSchema> & { _id: string };
export const Resource = models.Resource || model("Resource", resourceSchema);
