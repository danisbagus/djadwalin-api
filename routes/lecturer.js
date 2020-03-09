require("module-alias/register");
const express = require("express");
const router = express.Router();
const { lecturerService } = require("@services");
const { validationResult } = require("express-validator/check");

router.get("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(response(false, errors.array()));
  }
  lecturerService.getAllLecturer(req, res);
});

router.get("/:lecturer_id", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(response(false, errors.array()));
  }
  lecturerService.getLecturer(req, res);
});

router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(response(false, errors.array()));
  }
  lecturerService.createLecturer(req, res);
});

router.patch("/:lecturer_id", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  lecturerService.updateLecturer(req, res);
});

router.delete("/:lecturer_id", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  lecturerService.deleteLecturer(req, res);
});

module.exports = router;
