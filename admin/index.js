const express = require("express");
const app = express.Router();
const log = require("../modules/log");
const makeCallBack = require("../express-callback");
const {
  createUser,
  getUsers,
  getUserById,
  removeUser,
  updateUser,
} = require("./users/controllers");

global.activeUsers = {}
// Home page route.
app.get("/admin", function (req, res) {
  res.render("login");
});

// without authentication
app.post("/auth", function (req, res) {});
app.post("/dashboard/users", makeCallBack(createUser));

//Only Admins access
app.get("/dashboard/users", makeCallBack(getUsers));
app.get("/dashboard/user/:id", makeCallBack(getUserById));
app.delete("/dashboard/users", makeCallBack(removeUser));
app.patch("/dashboard/users", makeCallBack(updateUser));

module.exports = app;
