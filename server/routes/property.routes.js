import express from "express";
import { getAllPropertiesbyPlace,getPropertyDetailById } from "../controllers/property.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { showAllRooms } from "../controllers/showallroom.controller.js";


const router = express.Router();

router.get("/:location", getAllPropertiesbyPlace);
router.get("/:location/:id", authMiddleware, getPropertyDetailById)
router.get("/seeker/room/showallrooms", authMiddleware, showAllRooms);

export default router;

