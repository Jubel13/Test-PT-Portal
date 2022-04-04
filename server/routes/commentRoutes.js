const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const CommentController = require("../controllers/commentController");

router.post("/", authentication, CommentController.addComment);
router.get("/", authentication)

module.exports = router;
