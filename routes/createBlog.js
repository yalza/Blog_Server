const express = require("express");
const router = express.Router();

const BlogController = require("../controllers/blogCtrl");
const AcountController = require("../controllers/accountCtrl");

router.get("/create-blog", AcountController.verify, BlogController.show);

router.post("/create-blog", AcountController.verify, BlogController.createBlog);

module.exports = router;
