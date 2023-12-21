const express = require("express");
const app = express.Router();
const log = require("../../tools/log");
const makeCallBack = require("../../express-callback")
const {createUser} = require("./controllers")
// Home page route.
app.get("/admin", function (req, res) {
  res.render("login");
});

// About page route.
app.post("/auth", function (req, res) {});

app.post("/dashboard/user", makeCallBack(createUser));

module.exports = app;
