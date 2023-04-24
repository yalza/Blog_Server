const express = require("express");
const router = express.Router();

const AcountController = require("../controllers/accountCtrl");

router.get("/signup", (req, res) => {
  res.render("signup", {
    header: "headerlogin",
    title: "Signup",
    footer: "footerlogin",
  });
});

router.post("/signup", AcountController.signup);

router.get("/admin/signup", (req, res) => {
  res.render("signup", {
    header: "headerlogin",
    title: "Signup",
    footer: "footerlogin",
  });
});

router.post("/admin/signup", AcountController.signupAdmin);

module.exports = router;
