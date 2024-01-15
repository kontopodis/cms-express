import makeArticle from "../article/index.js"
import responses from "../../../modules/responses.js"
const makeUpdateArticle = (articleDB) =>{
    const updateArticle = async (articleData)=>{
        const article = makeArticle(articleData)
        const res = await articleDB.updateArticle(article)

        if(res.changes === 1 ){
            return responses.ok
        }else{
            return responses.internalError
        }
    }
    return updateArticle
}
export default makeUpdateArticle