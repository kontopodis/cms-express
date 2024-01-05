const jwt = require("../../../modules/jwt");
const makeCreateArticle = (addArticle) => {
  return (createArticle = async (httpRequest) => {
    const token = httpRequest.headers.token;
    const user = jwt.getTokensUser(token);
    if (user.role === "admin" || user.role === "moderator") {
      const authorId = user.id;
    
      const title = httpRequest.body.title;
      const content = httpRequest.body.content;
      const imageUrl = httpRequest.body.imageUrl;
      if (authorId || title || content || imageUrl) {
        const article = {
          authorId:authorId,
          title: title,
          content: content,
          imageUrl:imageUrl,
        };

        const res = addArticle(article);
        if (res) {
          return {
            statusCode: 201,
            body: {
              message: "OK"
            }
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
  });
};

module.exports = makeCreateArticle;
