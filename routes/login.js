const express = require("express");
const router = express.Router();
const AcountController = require("../controllers/accountCtrl");
const AcountModel = require("../models/account");
const cookieParser = require("cookie-parser");
const User = require("../controllers/User");

const app = express();
app.use(cookieParser());

var aaa;
router.post("/login", (req, res) => {
  User.saveUser(req.body.username, req.body.password);
  AcountModel.findOne({
    username: req.body.username,
    password: req.body.password,
  })
    .then((data) => {
      if (data) {
        res.status(200).send("Đăng nhập thành công");
      } else {
        res.status(401).send("Đăng nhập không thành công");
      }
    })
    .catch((err) => {});
});

router.get("/login", (req, res) => {
  res.json({
    title: "login",
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

router.get("/admin", AcountController.checkAdmin, (req, res) => {
  res.json("dang nhap thanh cong");
});

module.exports = router;
