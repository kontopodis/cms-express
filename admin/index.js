const express = require("express");
const app = express.Router();
const log = require("../modules/log");
const makeCallBack = require("../express-callback");
const jwtMiddleware = require("../middlewares/jwt-middlesware")
const login = require("./login")
const {
  createUser,
  getUsers,
  removeUser,
  updateUser,
} = require("./users/controllers");
const articlesRouter = require("./articles")


app.use("/dashboard/",articlesRouter)
app.get("/admin", function (req, res) {
  res.render("login");
});

// without authentication
app.post("/login", makeCallBack(login));
app.post("/dashboard/users", makeCallBack(createUser));

//Only Admins access
app.get("/dashboard/users",jwtMiddleware, makeCallBack(getUsers));
app.delete("/dashboard/users",jwtMiddleware, makeCallBack(removeUser));
//Only Admins or the owner of that userInstance
app.patch("/dashboard/users",jwtMiddleware, makeCallBack(updateUser));

module.exports = app;
