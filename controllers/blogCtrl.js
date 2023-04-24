const BlogModel = require("../models/blog");
const AcountModel = require("../models/account");
const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

class BlogController {
  createBlog(req, res, next) {
    var token = req.cookies.token;
    var kq = jwt.verify(token, "toandeptrai");
    AcountModel.findOne({ _id: kq._id })
      .then((data) => {
        BlogModel.create({
          author: data.username,
          title: req.body.title,
          content: req.body.content,
        }).then((blog) => {
          res.redirect("/blog-detail/" + blog._id);
        });
      })
      .catch((err) => {});
  }
  show(req, res) {
    var token = req.cookies.token;
    var kq = jwt.verify(token, "toandeptrai");

    AcountModel.findOne({ _id: kq._id })
      .then((data) => {
        if (data) {
          res.render("create-blog", {
            title: "Tạo Blog",
            header: "headerhome",
            footer: "footerhome",
            username: data.username,
          });
        }
      })
      .catch((err) => {});
  }
}

module.exports = new BlogController();
