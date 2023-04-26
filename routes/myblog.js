const express = require("express");
const router = express.Router();
const MyBlogController = require("../controllers/myblogCtrl");

router.get("/myblog", MyBlogController.show);

router.get("/delete-blog/:id", MyBlogController.deleteBlog);

router.get("/update-blog/:id", MyBlogController.showAndUpdateBlog);

router.post("/update-blog/:id", MyBlogController.updateBlog);

module.exports = router;
