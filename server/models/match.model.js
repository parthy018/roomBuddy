import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  seeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Make it required to ensure that every match has a seeker
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Make it required to ensure that every match has a host
  },
  roomOrRoommate: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'roomOrRoommateModel', // Dynamic reference to either Room or Roommate model
  },
  roomOrRoommateModel: {
    type: String,
    required: true,
    enum: ['Room', 'Roommate'], // Can be either "Room" or "Roommate"
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Match", matchSchema);
