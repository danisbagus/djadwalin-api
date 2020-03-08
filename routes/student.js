require("module-alias/register");
const express = require("express");
const router = express.Router();
const { studentService } = require("@services");
const { validationResult } = require("express-validator/check");

router.get("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(response(false, errors.array()));
  }
  studentService.getAllStudent(req, res);
});

router.get("/:student_id", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(response(false, errors.array()));
  }
  studentService.getStudent(req, res);
});

router.post("/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(response(false, errors.array()));
  }
  studentService.createStudent(req, res);
});

router.patch("/:student_id", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  studentService.updateStudent(req, res);
});

router.delete("/:student_id", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  studentService.deleteStudent(req, res);
});

module.exports = router;
