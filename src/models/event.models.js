import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      default: "Marriage",
    },
    ageLimit: {
      type: Number,
      default: 18,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
