const express = require("express");
const router = express.Router();

const BlogController = require("../controllers/blogCtrl");
const AcountController = require("../controllers/accountCtrl");
const MyBlogController = require("../controllers/myblogCtrl");
const blogDetailCtrl = require("../controllers/blogDetailCtrl");

router.get("/myblog", AcountController.verify, MyBlogController.show);
router.get(
  "/delete-blog/:id",
  AcountController.verify,
  MyBlogController.deleteBlog
);

router.get(
  "/update-blog/:id",
  AcountController.verify,
  MyBlogController.showAndUpdateBlog
);

router.post(
  "/update-blog/:id",
  AcountController.verify,
  MyBlogController.updateBlog
);

module.exports = router;
