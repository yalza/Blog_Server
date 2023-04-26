const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/homeCtrl");

router.get("/home", HomeController.show);

module.exports = router;
