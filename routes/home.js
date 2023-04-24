const express = require("express");
const router = express.Router();

const BlogController = require("../controllers/blogCtrl");
const AcountController = require("../controllers/accountCtrl");
const MyBlogController = require("../controllers/myblogCtrl");
const HomeController = require("../controllers/homeCtrl");

router.get("/home", AcountController.verify, HomeController.show);

module.exports = router;
