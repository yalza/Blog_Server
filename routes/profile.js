const express = require("express");
const router = express.Router();

const BlogController = require("../controllers/blogCtrl");
const AcountController = require("../controllers/accountCtrl");
const MyBlogController = require("../controllers/myblogCtrl");

router.get("/profile", AcountController.verify, AcountController.showProfile);

router.post(
  "/profile",
  AcountController.verify,
  AcountController.updateProfile
);

module.exports = router;
