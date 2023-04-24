const BlogModel = require("../models/blog");
const AcountModel = require("../models/account");
const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

class HomeController {
  show(req, res) {
    var token = req.cookies.token;
    var kq = jwt.verify(token, "toandeptrai");

    AcountModel.findOne({ _id: kq._id })
      .then((data) => {
        if (data) {
          BlogModel.find().then((blogs) => {
            blogs = blogs.map((blog) => blog.toObject());
            blogs.forEach(function (blog) {
              blog.date = blog._id.getTimestamp().toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              });
            });
            res.render("home", {
              title: "Trang chủ",
              header: "headerhome",
              footer: "footerhome",
              username: data.username,
              blogs: blogs,
            });
          });
        } else {
          res.redirect("/login");
        }
      })
      .catch((err) => {});
  }
}

module.exports = new HomeController();
