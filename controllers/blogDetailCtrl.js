const BlogModel = require("../models/blog");
const AcountModel = require("../models/account");
const CommentModel = require("../models/comment");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const User = require("../controllers/User");

const app = express();
app.use(cookieParser());

class BlogDetailController {
  show(req, res) {
    AcountModel.findOne({ username: User.getUser().username })
      .then((data) => {
        if (req.params.id) {
          BlogModel.findOne({
            _id: new objectId(req.params.id.toString()),
          })
            .then((blog) => {
              console.log(blog.like);
              CommentModel.find({ blogId: req.params.id })
                .then((comments) => {
                  comments = comments.map((comment) => comment.toObject());
                  comments.forEach(function (comment) {
                    comment.authorBlog = data.username;
                    comment.date = comment._id
                      .getTimestamp()
                      .toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      });
                  });

                  res.json({
                    title: "Trang chủ",
                    comments: comments,
                    username: data.username,
                    titleBlog: blog.title,
                    like: blog.like,
                    content: blog.content,
                    author: blog.author,
                    date: blog._id.getTimestamp().toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }),
                  });
                })
                .catch((err) => {});
            })
            .catch((err) => {});
        }
      })
      .catch((err) => {});
  }

  comment(req, res) {
    AcountModel.findOne({ username: User.getUser().username })
      .then((data) => {
        if (req.params.id) {
          BlogModel.findOne({
            _id: new objectId(req.params.id.toString()),
          })
            .then((blog) => {
              CommentModel.create({
                author: data.username,
                comment: req.body.comment,
                blogId: req.params.id,
              })
                .then((cmt) => {
                  res.redirect("/blog-detail/" + req.params.id);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {});
        }
      })
      .catch((err) => {});
  }

  deleteComment(req, res) {
    CommentModel.deleteOne({ _id: req.params.id })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {});
  }

  like(req, res) {
    BlogModel.findOne({ _id: req.params.id })
      .then((blog) => {
        let num = parseInt(blog.like);
        num += 1;
        let newLike = num.toString();
        return BlogModel.findOneAndUpdate(
          { _id: req.params.id },
          { $set: { like: newLike } },
          { new: true } // để trả về dữ liệu mới sau khi update
        );
      })
      .then((data) => {
        res.json("like thanh cong");
      })
      .catch((err) => console.log(err));
  }
}

module.exports = new BlogDetailController();
