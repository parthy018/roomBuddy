const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["seeker", "host", "admin"], required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  profilePicture: { type: String, required: true },
  token: { type: String },
  isListed: { type: Boolean, default: false },
  needRoomListing: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  }],
  needRoommateListing: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roommate",
  }],
  matches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
