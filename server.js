import log from "./modules/log.js";

import express from "express";
import adminRouter  from "./admin/index.js";
import bodyParser from "body-parser";
import notFound from "./controllers/notFound.js";
import makeCallBack from "./express-callback/index.js";
import {
  getAllArticles,
  findArticleById,
} from "./admin/articles/controllers/index.js";
import {contentMiddleware, ipFilterMiddleware, rateLimitMiddleware} from "api-security-middleware"



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
  app.use(contentMiddleware.sqlDetectionMiddleware());

// XSS Detection
app.use(contentMiddleware.xssDetectionMiddleware());

// Rate limit for every IP, maximum of 20 requests in 1 sec
app.use(rateLimitMiddleware(1000, 1));
*/




app.use(express.static("public"))
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function (req, res) {
  res.render("homepage");
  log("Reloaded index.js", "red");
});
app.use("/admin", adminRouter);
// without authentication
app.get("/article", makeCallBack(findArticleById));
app.get("/articles", makeCallBack(getAllArticles));
app.get("/view/article",async (req,res)=>{
  const article = await findArticleById(req)
  console.log(article)
  res.render("article",article.body)
})
app.use(makeCallBack(notFound));

export default app
