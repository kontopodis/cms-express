const jwt = require("../../../modules/jwt")
const makeDeleteArticle = (deleteArticleUC)=>{
    return(deleteArticle=(httpRequest)=>{
        return {
            statusCode: 201,
            body: {message: "Under Development"},
          };
    })
}

module.exports = makeDeleteArticle