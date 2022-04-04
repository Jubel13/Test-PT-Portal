const Comment = require("../models/comment");

class CommentController {
  static async addComment(req, res, next) {
    try {
      const { email } = req.loginUser;

      const { comment, tags } = req.body;

      if (!comment || !tags.length) {
        throw new Error("All Fields required");
      }

      const payload = {
        email,
        comment,
        tags,
      };

      const result = await Comment.addComment(payload);
      console.log(result);

      res.status(201).json({ message: "Comment added" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CommentController;
