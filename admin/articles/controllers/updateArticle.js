const jwt = require("../../../modules/jwt");
const makeUpdateArticle = (updateArticleUC) => {
  return (updateArticle = async (httpRequest) => {
    const token = httpRequest.headers.token;
    const user = jwt.getTokensUser(token);
    if (user.role === "admin" || user.role === "moderator") {
      const id = httpRequest.body.id;
      const authorId = user.id;
      const title = httpRequest.body.title;
      const content = httpRequest.body.content;
      const imageUrl = httpRequest.body.imageUrl;
      if (authorId && title && content && imageUrl && id) {
        const article = {
          id: id,
          authorId: authorId,
          title: title,
          content: content,
          imageUrl: imageUrl,
        };

        console.log(article);
        const res = await updateArticleUC(article);
        console.log(res);
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
  });
};

module.exports = makeUpdateArticle;
