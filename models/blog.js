const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogModel = new Schema(
  {
    author: String,
    title: String,
    content: { type: String, trim: false },
  },
  {
    collection: "blog",
  }
);

module.exports = mongoose.model("blog", BlogModel);
