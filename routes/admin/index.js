const express = require("express");
const app = express.Router();
const log = require("../../tools/log");

// Home page route.
app.get("/admin", function (req, res) {
  res.render("login");
});

// About page route.
app.post("/auth", function (req, res) {});

app.get("/dashboard", function (req, res) {});

module.exports = app;
