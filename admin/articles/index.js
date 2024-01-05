const express = require("express");
const app = express.Router();
const makeCallBack = require("../../express-callback");
const jwtMiddleware = require("../../middlewares/jwt-middlesware");

const {
  createArticle,
  updateArticle,
  deleteArticle,
} = require("./controllers");

//Only Admins && Moderators Access
app.post("/articles", jwtMiddleware, makeCallBack(createArticle));
app.delete("/articles", jwtMiddleware, makeCallBack(deleteArticle));
app.patch("/articles", jwtMiddleware, makeCallBack(updateArticle));

module.exports = app;
