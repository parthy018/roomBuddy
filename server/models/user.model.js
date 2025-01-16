import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["seeker", "host", "admin"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female","other"],
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    needRoomListing: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    needRoommateListing: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roommate",
      },
    ],
    isListed: {
      type: Boolean,
      default: false,
    },
    matches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
