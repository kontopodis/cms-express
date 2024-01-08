import express from "express"
const app = express.Router();
import makeCallBack from "../../express-callback/index.js"
import jwtMiddleware from "../../middlewares/jwt-middlesware.js"

import {
  createArticle,
  updateArticle,
  deleteArticle,
} from "./controllers/index.js"

//Only Admins && Moderators Access
app.post("/articles", jwtMiddleware, makeCallBack(createArticle));
app.delete("/articles", jwtMiddleware, makeCallBack(deleteArticle));
app.patch("/articles", jwtMiddleware, makeCallBack(updateArticle));

export default app;
