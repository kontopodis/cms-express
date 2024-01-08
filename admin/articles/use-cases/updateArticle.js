import makeArticle from "../article/index.js"
const makeUpdateArticle = (articleDB) =>{
    const updateArticle = async (articleData)=>{
        const article = makeArticle(articleData)
        const res = await articleDB.updateArticle(article)

        if(res.changes === 1 ){
            return true
        }else{
            return false
        }
    }
    return updateArticle
}
export default makeUpdateArticle