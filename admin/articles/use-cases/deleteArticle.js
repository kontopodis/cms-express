const makeDeleteArticle = (articleDB) =>{
    const deleteArticle = async (id) =>{
        
        const res = await articleDB.deleteArticle(id)
        if(res){
            return true
        }else{
            return false
        }
    }
    return deleteArticle
}
export default makeDeleteArticle