const jwt = require("../../../modules/jwt")
const makeUpdateArticle = (updaterticleUC)=>{
    return(updateArticle=async(httpRequest)=>{
        const token = httpRequest.headers.token;
        const user = jwt.getTokensUser(token);
        if (user.role === "admin" || user.role === "moderator") {
          const authorId = user.getId();
          const title = httpRequest.body.title;
          const content = httpRequest.body.content;
          const imageUrl = httpRequest.body.imageUrl;
          if (authorId || title || content || imageUrl) {
            const article = makeArticle({
              authorId,
              title,
              content,
              imageUrl,
            });
    
            const res = updaterticleUC(article);
            if (res) {
              return {
                statusCode: 201,
                body: "OK",
              };
            } else {
              return {
                statusCode: 500,
                body: "Internal Error",
              };
            }
          } else {
            return {
              statusCode: 400,
              body: { message: "Bad Request" },
            };
          }
        } else {
          return {
            statusCode: 403,
            body: { message: "You are not authorised for this action" },
          };
        }
    })
}

module.exports = makeUpdateArticle