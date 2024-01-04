const makeDeleteArticle = (articleDB) =>{
    return (deleteArticle = async (id) =>{
        return await articleDB.deleteArticle(id)
    })
}
module.exports = makeDeleteArticle