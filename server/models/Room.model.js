import mongoose from "mongoose";
import { userHighlights } from "../utils/Enums.js"


const roomSchema = new mongoose.Schema(
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
    seeker: {
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
        enum: userHighlights,
        required: true,
        validate: {
          validator: function (value) {
            // Check if the length of the array is at least 3
            return value.length >= 3;
          },
          message: "Please select at least three highlights.",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
