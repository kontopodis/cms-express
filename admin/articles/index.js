import express from "express"
const app = express.Router();
import makeCallBack from "../../express-callback/index.js"
import jwtMiddleware from "../../middlewares/jwt-middlesware.js"

import {
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
  findArticleById
} from "./controllers/index.js"
 
//Only Admins && Moderators Access
app.post("/article", jwtMiddleware, makeCallBack(createArticle));
app.delete("/article", jwtMiddleware, makeCallBack(deleteArticle));
app.patch("/article", jwtMiddleware, makeCallBack(updateArticle));

//without authentication
app.get("/articles", makeCallBack(getAllArticles));
app.get("/article", makeCallBack(findArticleById));
export default app;
