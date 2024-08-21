const express = require("express");
const router = express.Router();

const userRouter = require("./post.router");
router.use("/posts", userRouter);

module.exports = router;