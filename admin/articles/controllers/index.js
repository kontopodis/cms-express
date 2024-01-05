const articleService = require("../use-cases");
const makeCreateArticle = require("./createArticle");
const makeDeleteArticle = require("./deleteArticle");
const makeUpdateArticle = require("./updateArticle");
const makeGetAllArticles = require("./getAllArticles");
const makeGetArticleById = require("./getArticleById");

const createArticle = makeCreateArticle(articleService.addArticle);
const deleteArticle = makeDeleteArticle(articleService.deleteArticle);
const updateArticle = makeUpdateArticle(articleService.updateArticle);
const getAllArticles = makeGetAllArticles(articleService.getAllArticles);
const findArticleById = makeGetArticleById(articleService.getArticleById);

const articleController = Object.freeze({
  createArticle,
  deleteArticle,
  updateArticle,
  getAllArticles,
  findArticleById,
});

module.exports = articleController;
