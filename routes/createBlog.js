const express = require("express");
const router = express.Router();

const BlogController = require("../controllers/blogCtrl");
const AcountController = require("../controllers/accountCtrl");

router.get("/create-blog", BlogController.show);

router.post("/create-blog", BlogController.createBlog);

module.exports = router;
