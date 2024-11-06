const express = require("express");
const { getAllPropertiesbyPlace,getPropertyDetailById} = require("../controllers/property.controller");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");
const asyncHandler = require("../middleware/asyncHandler");
router.get("/:location", getAllPropertiesbyPlace);

router.get("/:location/:id", authMiddleware,asyncHandler(async (req, res) => {
    console.log(req.params);
    await getPropertyDetailById(req,res);
}))

module.exports = router;
