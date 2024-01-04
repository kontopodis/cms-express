const jwt = require("../../../modules/jwt")
const makeCreateArticle = (addArticle)=>{
    return(createArticle=async(httpRequest)=>{
        return {
            statusCode: 201,
            body: {message: "Under Development"},
          };
    })
}

module.exports = makeCreateArticle