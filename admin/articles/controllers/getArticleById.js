const jwt = require("../../../modules/jwt")
const makeGetArticleById = (getArticleById)=>{
    return(getArticleById=async (httpRequest)=>{
        const id = httpRequest.params.id
        const article = await getArticleById(id)
        return {
            statusCode: 201,
            body: article,
          };
    })
}

module.exports = makeGetArticleById