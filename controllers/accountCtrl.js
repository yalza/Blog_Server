const AcountModel = require("../models/account");
const express = require("express");
const cookieParser = require("cookie-parser");
const User = require("../controllers/User");

const app = express();
app.use(cookieParser());

class AcountController {
  show(req, res) {
    AcountModel.findOne({
      username: User.getUser().username,
    })
      .then((data) => {
        if (data) {
          res.json({
            title: "Trang chủ",
            username: data.username,
          });
        }
      })
      .catch((err) => {});
  }

  checkAdmin(req, res, next) {
    AcountModel.findOne({ username: User.getUser().username })
      .then((data) => {
        if (data.role === "admin") {
          next();
        } else {
          res.json("Not permistion");
        }
      })
      .catch((err) => {});
  }

  signup(req, res, next) {
    if (!req.body.password || !req.body.confirmpassword || !req.body.username) {
      return res.status(400).send("Không được để trống");
    } else if (req.body.password != req.body.confirmpassword) {
      return res.status(422).send("mật khẩu không trùng khớp");
    }
    AcountModel.findOne({
      username: req.body.username,
    })
      .then((data) => {
        if (data) {
          return res.status(409).send("tài khoản đã tồi tại");
        }
        AcountModel.create({
          username: req.body.username,
          password: req.body.password,
          role: "user",
          fullname: "",
          hometown: "",
          dateofbirth: "",
        })
          .then((data) => {
            return res.status(201).send("Đăng ký tài khoản thành công");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {});
  }
  signupAdmin(req, res, next) {
    if (!req.body.password || !req.body.confirmpassword || !req.body.username) {
      res.json("Ô thông tin không được để trống");
    }
    if (req.body.password != req.body.confirmpassword) {
      res.json("mat khau xac nhan khogn trung khop");
    }
    AcountModel.findOne({
      username: req.body.username,
    })
      .then((data) => {
        if (data) {
          res.json("tai khoan da ton tai");
        }
        AcountModel.create({
          username: req.body.username,
          password: req.body.password,
          role: "admin",
        })
          .then((data) => {
            res.redirect("/login");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {});
  }

  showProfile(req, res) {
    AcountModel.findOne({ username: User.getUser().username })
      .then((data) => {
        res.json({
          title: "Trang chủ",
          username: data.username,
          password: data.password,
          hometown: data.hometown,
          dateofbirth: data.dateofbirth,
          fullname: data.fullname,
        });
      })
      .catch((err) => {});
  }

  showProfileAuthor(req, res) {
    AcountModel.findOne({ username: req.params.id })
      .then((data) => {
        res.json({
          username: data.username,
          hometown: data.hometown,
          dateofbirth: data.dateofbirth,
          fullname: data.fullname,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateProfile(req, res) {
    AcountModel.findOneAndUpdate(
      { username: User.getUser().username },
      {
        $set: {
          password: req.body.password,
          hometown: req.body.hometown,
          dateofbirth: req.body.dateofbirth,
          fullname: req.body.fullname,
        },
      },
      {
        new: true,
      }
    )
      .then((data) => {
        res.json({
          title: "Trang chủ",
          username: data.username,
          password: data.password,
          hometown: data.hometown,
          dateofbirth: data.dateofbirth,
          fullname: data.fullname,
        });
      })
      .catch((err) => {});
  }
}

module.exports = new AcountController();
