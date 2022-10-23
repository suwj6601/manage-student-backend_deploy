const express = require("express");
const classRouter = require("./class");
const studentRouter = require("./student");
const subjectRouter = require("./subject");
const userRouter = require("./user");

const router = express.Router();

router.use("/class", classRouter);
router.use("/student", studentRouter);
router.use("/subject", subjectRouter);
router.use("/user", userRouter);

module.exports = router;
