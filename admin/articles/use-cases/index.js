const articleDB = require("../data-access")
const makeUpdateArticle = require("./updateArticle")
const makeAddArticle = require("./addArticle")
const makeDeleteArticle = require("./deleteArticle")
const makeGetAllArticles = require("./getAllArticles")
const makeGetArticleById = require("./getArticleById")

const addArticle = makeAddArticle(articleDB)
const updateArticle = makeUpdateArticle(articleDB)
const deleteArticle = makeDeleteArticle(articleDB)
const getAllArticles = makeGetAllArticles(articleDB)
const getArticleById = makeGetArticleById(articleDB)

const articleService = Object.freeze({
    addArticle,
    deleteArticle,
    updateArticle,
    getAllArticles,
    getArticleById,
})

module.exports = articleService