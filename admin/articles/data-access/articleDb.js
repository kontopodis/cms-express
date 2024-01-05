const makeArticleDB = (makeDB)=>{

    const findById = async (id)=>{
        let db =  await makeDB()
        sql = "SELECT * FROM cmsArticle WHERE id=?"
        return await db.get(sql,id)
    }
    const findAll = async () =>{
        let db =  await makeDB()
        sql = "SELECT * FROM cmsArticle"
        return await db.all(sql)
    }
    const addArticle = async (article)=>{
        let db = await makeDB();
        let sql = `INSERT INTO cmsArticle
      (id,authorId,title,content,imageUrl,createdOn,lastEditedOn) 
      VALUES(:id,:authorId,:title,:content,:imageUrl,:createdOn,:lastEditedOn)`;
        let obj = {
          ":id": article.getId(),
          ":authorId": article.getAuthorsId(),
          ":title": article.getTitle(),
          ":content": article.getContent(),
          ":imageUrl": article.getImageUrl(),
          ":createdOn": article.getCreatedOn(),
          ":lastEditedOn": article.getLastEditedOn(),
        };
        let res = await db.run(sql, obj);

        return await res;
    
    }
    const updateArticle = async (article)=>{
        console.log(article)
        let db = await makeDB();
        sql = `update cmsArticle set title= :title, content= :content ,imageUrl= :imageUrl, lastEditedOn = :lastEditedOn where id= :id`  
        let obj = {
          ":id":article.getId(),
          ":title": article.getTitle(),
          ":content": article.getContent(),
          ":imageUrl": article.getImageUrl(),
          ":lastEditedOn": article.getLastEditedOn(),
          
        };
    
        let res = await db.run(sql,obj,(error, res)=>{
            if(error){
                throw new Error(error)
            }else{
                console.log(res)
            }
        })
        return await res;
    }
    const deleteArticle = async (id) =>{
        let db =  await makeDB()
        sql = "DELETE FROM cmsArticle WHERE id=?"
        return await db.run(sql,id)
    }

    return Object.freeze({
        findById,
        findAll,
        addArticle,
        updateArticle,
        deleteArticle
        
    })

}

module.exports = makeArticleDB