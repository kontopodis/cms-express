const jwt = require("../../../modules/jwt")
const makeDeleteArticle = (deleteArticleUC)=>{
    return(deleteArticle=(httpRequest)=>{
        const token = httpRequest.headers.token
        const user = jwt.getTokensUser(token)
        

        if(user.role === "admin" || user.role === "moderator"){

            const id = httpRequest.body.id
            if(id){
                const res = deleteArticleUC(id)
                if (res){
                    return {
                        statusCode:201,
                        body:{
                            message:"OK"
                        }
                    }
                }
                else{
                    return{
                        statusCode:500,
                        body:{
                            message:"Internal Error"
                        }
                    }
                }
            }
          
        }else{
            return {
                statusCode:403,
                body:  {
                    message:"You are not authorized for this action"
                }
            } 
        }

    })
}

module.exports = makeDeleteArticle