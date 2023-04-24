const BlogModel = require("../models/blog");
const AcountModel = require("../models/account");
const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

class MyBlogController {
  show(req, res) {
    var token = req.cookies.token;
    var kq = jwt.verify(token, "toandeptrai");

    AcountModel.findOne({ _id: kq._id })
      .then((data) => {
        BlogModel.find({ author: data.username }).then((blogs) => {
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
          res.render("myblog", {
            title: "Blog của tôi",
            header: "headerhome",
            footer: "footerhome",
            username: data.username,
            blogs: blogs,
            id: blogs._id,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteBlog(req, res) {
    BlogModel.findOneAndDelete({ _id: req.params.id })
      .then((data) => {
        res.redirect("/myblog");
      })
      .catch((err) => {});
  }

  showAndUpdateBlog(req, res) {
    var token = req.cookies.token;
    var kq = jwt.verify(token, "toandeptrai");

    AcountModel.findOne({ _id: kq._id })
      .then((data) => {
        BlogModel.findOne({ _id: req.params.id })
          .then((blog) => {
            res.render("updateblog", {
              title: "Sua blog",
              header: "headerhome",
              footer: "footerhome",
              username: data.username,
              titleBlog: blog.title,
              contentBlog: blog.content,
            });
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  }

  updateBlog(req, res) {
    BlogModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
        },
      },
      {
        new: true,
      }
    ).then((data) => {
      res.redirect("/blog-detail/" + req.params.id);
    });
  }
}

module.exports = new MyBlogController();
