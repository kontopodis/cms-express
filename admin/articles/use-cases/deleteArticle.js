const makeDeleteArticle = (articleDB) =>{
    return (deleteArticle = async (id) =>{
        
        const res = await articleDB.deleteArticle(id)
        if(res){
            return true
        }else{
            return false
        }
    })
}
module.exports = makeDeleteArticle