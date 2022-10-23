const express = require("express");
const {
  getAllSubjectController,
  createSubjectController,
  deleteSubjectController,
  updateSubjectController,
} = require("../controller/subject");

const subjectRouter = express.Router();

subjectRouter.get("/", getAllSubjectController);
subjectRouter.post("/", createSubjectController);
subjectRouter.put("/", updateSubjectController);
subjectRouter.delete("/:idDelete", deleteSubjectController);

module.exports = subjectRouter;
