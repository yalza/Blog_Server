const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const route = require("./routes/index");
const db = require("./config/connectdb");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(cookieParser());

db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

route(app);

app.listen(port, () => console.log("Server started"));
