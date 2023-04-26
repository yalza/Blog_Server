const BlogModel = require("../models/blog");
const AcountModel = require("../models/account");
const express = require("express");
const cookieParser = require("cookie-parser");
const User = require("../controllers/User");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
const document = dom.window.document;

const app = express();
app.use(cookieParser());

class HomeController {
  show(req, res) {
    var username = User.getUser().username;
    var password = User.getUser().password;
    AcountModel.findOne({ username: username, password: password })
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
            res.json({
              title: "Trang chủ",
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
