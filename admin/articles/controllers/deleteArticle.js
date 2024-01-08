import jwt from "../../../modules/jwt/index.js"
const makeDeleteArticle = (deleteArticleUC) => {
  return async function deleteArticle (httpRequest){
    const token = httpRequest.headers.token;
    const user = jwt.getTokensUser(token);

    if (user.role === "admin" || user.role === "moderator") {
      const id = httpRequest.body.id;
      console.log(id);
      if (id) {
        const res = await deleteArticleUC(id);
        console.log(res);
        if (res) {
          return {
            statusCode: 201,
            body: {
              message: "OK",
            },
          };
        } else {
          return {
            statusCode: 500,
            body: {
              message: "Internal Error",
            },
          };
        }
      }
    } else {
      return {
        statusCode: 403,
        body: {
          message: "You are not authorized for this action",
        },
      };
    }
  }
};

export default  makeDeleteArticle;
