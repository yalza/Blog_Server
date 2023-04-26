const express = require("express");
const router = express.Router();

const AcountController = require("../controllers/accountCtrl");

router.get("/profile", AcountController.showProfile);

router.post("/profile", AcountController.updateProfile);

router.get("/author/:id", AcountController.showProfileAuthor);

module.exports = router;
