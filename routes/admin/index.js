const express = require("express");
const app = express.Router();
const log = require("../../tools/log");
const makeCallBack = require("../../express-callback");
const {
  createUser,
  getUsers,
  getUserById,
  removeUser,
  updateUser,
} = require("./controllers");
// Home page route.
app.get("/admin", function (req, res) {
  res.render("login");
});

// About page route.
app.post("/auth", function (req, res) {});

app.post("/dashboard/register", makeCallBack(createUser));
app.get("/dashboard/users", makeCallBack(getUsers));
app.get("/dashboard/user", makeCallBack(getUserById));
app.delete("/dashboard/remove", makeCallBack(removeUser));
app.patch("/dashboard/update", makeCallBack(updateUser));

module.exports = app;
