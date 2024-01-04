const makeGetArticleById = (articleDB)=>{
    return (getArticleById = async (id)=>{
        return await articleDB.findById(id)
    })
}
module.exports = makeGetArticleById