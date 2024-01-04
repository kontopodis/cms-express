const jwt = require("../../../modules/jwt")
const makeUpdateArticle = (updaterticleUC)=>{
    return(updateArticle=async(httpRequest)=>{
        
        return {
            statusCode: 201,
            body: {message: "Under Development"},
          };
    })
}

module.exports = makeUpdateArticle