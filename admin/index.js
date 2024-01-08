import express from "express"
const app = express.Router()
import log from "../modules/log.js"
import makeCallBack from "../express-callback/index.js"
import jwtMiddleware from "../middlewares/jwt-middlesware.js"
import login from "./login.js"
import {
  createUser,
  getUsers,
  removeUser,
  updateUser,
} from "./users/controllers/index.js"
import articlesRouter from "./articles/index.js"


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

export default app
