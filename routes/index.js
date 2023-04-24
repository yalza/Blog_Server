const signup = require("./signup");
const login = require("./login");
const createBlog = require("./createBlog");
const blogDetail = require("./blogDetail");
const myblog = require("./myblog");
const home = require("./home");
const profile = require("./profile");

function route(app) {
  app.use("/", login);
  app.use("/", signup);
  app.use("/", createBlog);
  app.use("/", blogDetail);
  app.use("/", myblog);
  app.use("/", home);
  app.use("/", profile);
  app.get("/", (req, res) => {
    res.redirect("/home");
  });
}
module.exports = route;
