const makeGetAllArticles = (articleDB)=>{
    return (getAllArticles = async ()=>{
        return await articleDB.findAll()
    })
}
module.exports = makeGetAllArticles