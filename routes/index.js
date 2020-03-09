const express = require("express");
const student = require("./student");
const lecturer = require("./lecturer");

const router = express.Router();

router.use("/student", student);
router.use("/lecturer", lecturer);

module.exports = router;
