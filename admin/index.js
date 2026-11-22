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


app.use("/",articlesRouter)

// without authentication
app.post("/login", makeCallBack(login));
app.post("/user", makeCallBack(createUser));

//Only Admins access
app.get("/users",jwtMiddleware, makeCallBack(getUsers));
app.delete("/user",jwtMiddleware, makeCallBack(removeUser));
//Only Admins or the owner of that userInstance
app.patch("/user",jwtMiddleware, makeCallBack(updateUser));

export default app
