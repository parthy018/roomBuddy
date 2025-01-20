import express from "express";
import { loginUser, getUserProfile, editUserProfile, changeUserPassword, registerUser, verifyOTP } from "../controllers/user.controller.js";
import {authMiddleware, seekerAuthMiddleware } from "../middleware/auth.middleware.js";
import { createNeedRoom, createNeedRoommate } from "../controllers/property.controller.js";
import upload from "../config/multerConfig.js";
import { loginValidator, roommateValidator, roomValidator, userValidator } from "../validation/all.validator.js";

// configuring router
const router = express.Router();

router.post( "/register", upload.single("profilePicture"), userValidator, registerUser);
router.post("/verifyOTP", userValidator, verifyOTP);
router.post("/login", loginValidator, loginUser);
router.post("/listing/need-roommate", authMiddleware, upload.array("image", 3), roommateValidator, createNeedRoommate);
router.post("/listing/need-room", authMiddleware, seekerAuthMiddleware, upload.none(), roomValidator, createNeedRoom);
router.get("/user", authMiddleware, getUserProfile);
router.put("/user/editprofile", authMiddleware, editUserProfile);
router.post("/user/changeuserpassword", authMiddleware, changeUserPassword);

export default router;
