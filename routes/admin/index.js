const express = require("express");
const app = express.Router();
const log = require("../../tools/log");
const makeCallBack = require("../../express-callback")
const {createUser,getUsers} = require("./controllers")
// Home page route.
app.get("/admin", function (req, res) {
  res.render("login");
});

// About page route.
app.post("/auth", function (req, res) {});

app.post("/dashboard/user", makeCallBack(createUser));
app.get("/dashboard/users", makeCallBack(getUsers));

module.exports = app;
