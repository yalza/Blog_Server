const express = require("express");
const router = express.Router();
const AcountController = require("../controllers/accountCtrl");

router.get("/login", (req, res) => {
  res.render("login", {
    header: "headerlogin",
    title: "Login",
    footer: "footerlogin",
  });
});

router.post("/login", AcountController.login);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

router.get(
  "/admin",
  AcountController.verify,
  AcountController.checkAdmin,
  (req, res) => {
    res.json("dang nhap thanh cong");
  }
);

module.exports = router;
