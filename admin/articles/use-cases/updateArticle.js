const makeArticle = require("../article")
const makeUpdateArticle = (articleDB) =>{
    return (updateArticle = async (articleData)=>{
        const article = makeArticle(articleData)
        const res = await articleDB.updateArticle(article)
        console.log(res)
        if(res.changes === 1 ){
            return true
        }else{
            return false
        }
    })
}
module.exports = makeUpdateArticle