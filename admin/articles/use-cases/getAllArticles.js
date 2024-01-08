const makeGetAllArticles = (articleDB)=>{
    const getAllArticles = async ()=>{
        return await articleDB.findAll()
    }
    return getAllArticles
}
export default makeGetAllArticles