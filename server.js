
const log = require("./modules/log.js")
const express = require("express");
const adminRouter = require("./admin/index.js");
var bodyParser = require('body-parser');
const notFound = require("./controllers/notFound.js")
const makeCallBack = require("./express-callback/index")
const {
    getAllArticles,
    getArticleById
} = require("./admin/articles/controllers")

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin", adminRouter)



app.set('view engine', 'pug');
app.set('views','./views');



app.get("/", function (req, res) {
    res.render("homepage")
    log("Reloaded index.js","red")
});

// without authentication
app.get("/articles", makeCallBack(getAllArticles));
app.get("/articles/:id", makeCallBack(getArticleById));
app.use(makeCallBack(notFound))

module.exports = app
