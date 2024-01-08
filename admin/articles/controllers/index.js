import articleService from "../use-cases/index.js"
import makeCreateArticle from "./createArticle.js"
import makeDeleteArticle from "./deleteArticle.js"
import makeUpdateArticle from "./updateArticle.js"
import makeGetAllArticles from "./getAllArticles.js"
import makeGetArticleById from "./getArticleById.js"

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
export{
  createArticle,
  deleteArticle,
  updateArticle,
  getAllArticles,
  findArticleById,
}
export default  articleController;
