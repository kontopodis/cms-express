import articleDB from "../data-access/index.js"
import makeUpdateArticle from "./updateArticle.js"
import makeAddArticle from "./addArticle.js"
import makeDeleteArticle from "./deleteArticle.js"
import makeGetAllArticles from "./getAllArticles.js"
import makeGetArticleById from "./getArticleById.js"

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
export{
    addArticle,
    deleteArticle,
    updateArticle,
    getAllArticles,
    getArticleById,
}
export default articleService