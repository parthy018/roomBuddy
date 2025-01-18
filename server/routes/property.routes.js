import express from "express";
import { getAllPropertiesbyPlace,getPropertyDetailById } from "../controllers/property.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import asyncHandler from "../middleware/asyncHandler.js";


const router = express.Router();

router.get("/:location", getAllPropertiesbyPlace);

router.get("/:location/:id", authMiddleware,asyncHandler(async (req, res) => {
    console.log(req.params);
    await getPropertyDetailById(req,res);
}))

export default router;