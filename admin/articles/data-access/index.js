const makeDB = require("../../../modules/db")
const makeArticleDB = require("./articleDb")
const articleDB = makeArticleDB(makeDB)
module.exports = articleDB