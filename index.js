
const log = require("./tools/log.js")
const express = require("express");
const adminRouter = require("./routes/admin/index.js");
const converter = require("./tools/xls-json-converter.js")
var bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin", adminRouter)

app.set('view engine', 'pug');
app.set('views','./views');


app.get("/", function (req, res) {
    res.render("homepage")
    log("Reloaded index.js","red")
});


app.listen(port, function () {
    log(`Server on port ${port}!`);
});
