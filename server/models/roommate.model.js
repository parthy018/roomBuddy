import mongoose from "mongoose";
import { propertyHighlights,amenities } from "../utils/Enums.js";

const roommateSchema = new mongoose.Schema(
  {
    place: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lookingGender: {
      type: String,
      enum: ["male", "female", "Any"],
      required: true,
    },
    occupancy: {
      type: String,
      enum: ["Single", "Shared", "Any"],
      required: true,
    },
    highlights: [
      {
        type: String,
        required: true,
      },
    ],
    amenities: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Roommate", roommateSchema);
