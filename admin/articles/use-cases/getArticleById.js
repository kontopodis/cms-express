const makeGetArticleById = (articleDB)=>{
    const getArticleById = async (id)=>{
        return await articleDB.findById(id)
    }
    return getArticleById 
}
export default makeGetArticleById