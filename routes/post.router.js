const express = require("express");
const router = express.Router();

const postRouter = require("../controllers/post.controller");
router.get("/getAll", postRouter.getPosts);
router.post("/create", postRouter.addPost);
router.get("/:id", postRouter.getpostById);
router.put("/:id", postRouter.updateById);
router.delete("/:id", postRouter.deletepostById);

module.exports = router;