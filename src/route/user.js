const express = require("express");
const {
    registerAccount,
    signInController
} = require("../controller/user");

const userRouter = express.Router();

userRouter.post("/register", registerAccount);
userRouter.post("/sign-in", signInController);

module.exports = userRouter;
