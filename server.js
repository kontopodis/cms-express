import log from "./modules/log.js";
import cors from 'cors'
import express from "express";
import adminRouter from "./admin/index.js";
import bodyParser from "body-parser";
import notFound from "./controllers/notFound.js";
import makeCallBack from "./express-callback/index.js";
import {
  getAllArticles,
  findArticleById,
} from "./admin/articles/controllers/index.js";
import {
  contentMiddleware,
} from "api-security-middleware";

const app = express();
const corsOptions = {
  origin: "*"
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(contentMiddleware.sqlDetectionMiddleware());

// XSS Detection
app.use(contentMiddleware.xssDetectionMiddleware());


app.use(express.static("public"));
app.use("/admin", adminRouter);

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function (req, res) {
  res.render("homepage");
  log("Reloaded index.js", "red");
});

// without authentication
app.get("/article", makeCallBack(findArticleById));
app.get("/articles", makeCallBack(getAllArticles));
app.get("/view/article", async (req, res) => {
  const article = await findArticleById(req);
  console.log(article);
  res.render("article", article.body);
});
app.use(makeCallBack(notFound));

export default app;
