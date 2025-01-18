import express from "express";
import {
  loginUser,
  getUserProfile,
  editUserProfile,
  changeUserPassword,
  registerUser,
  verifyOTP,
} from "../controllers/user.controller.js";
import { userSchema, loginSchema } from "../validation/auth.validation.js";
import { roommateValidation } from "../validation/roommate.validation.js";
import { roomValidation } from "../validation/room.validation.js";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  authMiddleware,
  seekerAuthMiddleware,
} from "../middleware/auth.middleware.js";
import {
  createNeedRoom,
  createNeedRoommate,
} from "../controllers/property.controller.js";
import upload from "../config/multerConfig.js";

const router = express.Router();
router.post(
  "/register",
  upload.single("profilePicture"),
  asyncHandler(async (req, res) => {
    const { error } = userSchema.validate({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      gender: req.body.gender,
    });

    // Validate user input
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }

    await registerUser(req, res);
  })
);

router.post(
  "/verifyOTP",
  asyncHandler(async (req, res) => {
    const { error } = userSchema.validate({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      gender: req.body.gender,
    });

    // Validate user input
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }
    
    await verifyOTP(req, res);
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await loginUser(req, res);
  })
);

router.post(
  "/listing/need-roommate",
  authMiddleware,
  upload.array("image", 3),
  asyncHandler(async (req, res) => {
    const { error } = roommateValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    if (!req.files || req.files.length < 1 || req.files.length > 3) {
      return res.status(400).json({ error: "Please upload 1 to 3 images" });
    }
    await createNeedRoommate(req, res);
  })
);

router.post(
  "/listing/need-room",
  authMiddleware,
  seekerAuthMiddleware,
  upload.none(),
  asyncHandler(async (req, res) => {
    const { error } = roomValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await createNeedRoom(req, res);
  })
);

router.get(
  "/user",
  authMiddleware,
  asyncHandler(async (req, res) => {
    await getUserProfile(req, res);
  })
);

router.put(
  "/user/editprofile",
  authMiddleware,
  asyncHandler(async (req, res) => {
    await editUserProfile(req, res);
  })
);

router.post(
  "/user/changeuserpassword",
  authMiddleware,
  asyncHandler(async (req, res) => {
    await changeUserPassword(req, res);
  })
);

export default router;
