const AcountModel = require("../models/account");
const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(res, cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const options = { expires: d, path: "/" }; // set the options object with the expires option
  res.cookie(cname, cvalue, options); // set the cookie with the options object
}

class AcountController {
  login(req, res) {
    AcountModel.findOne({
      username: req.body.username,
      password: req.body.password,
    })
      .then((data) => {
        if (data) {
          var token = jwt.sign(
            {
              _id: data._id,
            },
            "toandeptrai"
          );

          try {
            setCookie(res, "token", token, 1);
          } catch (err) {
            console.log(err);
          }

          res.redirect("/home");
        } else {
          res.redirect("/signup");
        }
      })
      .catch((err) => {});
  }

  verify(req, res, next) {
    try {
      var token = req.cookies.token;
      var kq = jwt.verify(token, "toandeptrai");
      // AcountModel.findOne({ _id: kq._id })
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch((err) => {});
      if (kq) {
        next();
      }
    } catch (err) {
      res.redirect("/login");
    }
  }

  show(req, res) {
    var token = req.cookies.token;
    var kq = jwt.verify(token, "toandeptrai");

    AcountModel.findOne({ _id: kq._id })
      .then((data) => {
        if (data) {
          res.render("home", {
            title: "Trang chủ",
            header: "headerhome",
            footer: "footerhome",
            username: data.username,
          });
        }
      })
      .catch((err) => {});
  }

  checkAdmin(req, res, next) {
    var token = req.cookies.token;
    var kq = jwt.verify(token, "toandeptrai");
    AcountModel.findOne({ _id: kq._id })
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
      res.redirect("/signup");
    }
    if (req.body.password != req.body.confirmpassword) {
      res.redirect("/signup");
    }
    AcountModel.findOne({
      username: req.body.username,
    })
      .then((data) => {
        if (data) {
          res.redirect("/login");
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
            res.redirect("/login");
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
    var token = req.cookies.token;
    var kq = jwt.verify(token, "toandeptrai");
    AcountModel.findOne({ _id: kq._id })
      .then((data) => {
        res.render("profile", {
          title: "Trang chủ",
          header: "headerhome",
          footer: "footerhome",
          username: data.username,
          password: data.password,
          hometown: data.hometown,
          dateofbirth: data.dateofbirth,
          fullname: data.fullname,
        });
      })
      .catch((err) => {});
  }

  updateProfile(req, res) {
    var token = req.cookies.token;
    var kq = jwt.verify(token, "toandeptrai");
    AcountModel.findOneAndUpdate(
      { _id: kq._id },
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
        console.log(data);
        res.render("profile", {
          title: "Trang chủ",
          header: "headerhome",
          footer: "footerhome",
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
