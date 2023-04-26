const BlogModel = require("../models/blog");
const AcountModel = require("../models/account");
const express = require("express");
const cookieParser = require("cookie-parser");
const User = require("../controllers/User");

const app = express();
app.use(cookieParser());

class BlogController {
  createBlog(req, res, next) {
    AcountModel.findOne({ username: User.getUser().username })
      .then((data) => {
        BlogModel.create({
          author: data.username,
          title: req.body.title,
          content: req.body.content,
        }).then((blog) => {
          res.json({
            _id: blog._id,
          });
        });
      })
      .catch((err) => {});
  }
  show(req, res) {
    AcountModel.findOne({ username: User.getUser().username })
      .then((data) => {
        if (data) {
          res.json({
            title: "Tạo Blog",
            username: data.username,
          });
        }
      })
      .catch((err) => {});
  }
}

module.exports = new BlogController();
