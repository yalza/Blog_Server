const express = require("express");
const router = express.Router();

const BlogDetailController = require("../controllers/blogDetailCtrl");

const handlebars = require("handlebars");
handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

router.get("/blog-detail/:id", BlogDetailController.show);

router.get("/delete-comment/:id", BlogDetailController.deleteComment);

router.post("/blog-detail/:id", BlogDetailController.comment);

module.exports = router;
