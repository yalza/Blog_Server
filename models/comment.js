const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentModel = new Schema(
  {
    blogId: String,
    author: String,
    comment: { type: String, trim: false },
  },
  {
    collection: "comment",
  }
);

module.exports = mongoose.model("comment", CommentModel);
