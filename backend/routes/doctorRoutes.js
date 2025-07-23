const express = require("express");
const router = express.Router();
const { addDoctor, searchDoctors } = require("../controllers/doctorController");

router.post("/add", addDoctor);
router.get("/search", searchDoctors);

module.exports = router;
