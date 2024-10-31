const express = require("express");
const { getAllPropertiesbyPlace} = require("../controllers/property.controller");
const router = express.Router();
router.get("/:location", getAllPropertiesbyPlace);

module.exports = router;
