const BlogModel = require("../models/blog");
const AcountModel = require("../models/account");
const express = require("express");
const cookieParser = require("cookie-parser");
const User = require("../controllers/User");

const app = express();
app.use(cookieParser());

class MyBlogController {
  show(req, res) {
    AcountModel.findOne({
      username: User.getUser().username,
    })
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
          res.json({
            title: "Blog của tôi",
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
        res.json("xoa thanh cong");
      })
      .catch((err) => {});
  }

  showAndUpdateBlog(req, res) {
    AcountModel.findOne({ username: User.getUser().username })
      .then((data) => {
        BlogModel.findOne({ _id: req.params.id })
          .then((blog) => {
            res.json({
              title: "Sua blog",
              username: data.username,
              titleBlog: blog.title,
              contentBlog: blog.content,
              _id: req.params.id,
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
      res.json("AAAAAAAAA");
    });
  }
}

module.exports = new MyBlogController();
