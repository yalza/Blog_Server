const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AcountModel = new Schema(
  {
    username: String,
    password: String,
    role: String,
    fullname: String,
    dateofbirth: String,
    hometown: String,
  },
  {
    collection: "account",
  }
);

module.exports = mongoose.model("account", AcountModel);
