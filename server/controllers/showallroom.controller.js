import asyncHandler from "../middleware/asyncHandler.js"
import Roommates from "../models/roommate.model.js"
import Rooms from "../models/Room.model.js"

const showAllRooms = asyncHandler(async (req, res) => {
  const user = req.user.role;
  let rooms;
  if (user === "seeker") {
    rooms = await Rooms.find({});
  } else {
    rooms = await Roommates.find({});
  }
  res.status(200).json({
    success: true,
    message: "Rooms data get successfully",
    rooms,
  });
});

export {showAllRooms}
