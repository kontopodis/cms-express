import jwt from "../../../modules/jwt/index.js"
import responses from "../../../modules/responses.js"
const makeDeleteArticle = (deleteArticleUC) => {
  return async function deleteArticle (httpRequest){
    const token = httpRequest.headers.token;
    const user = jwt.getTokensUser(token);

    if (user.role === "admin" || user.role === "moderator") {
      const id = httpRequest.body.id;
     
      if (id) {
        const res = await deleteArticleUC(id);
      
        if (res) {
          return responses.ok
        } else {
          return responses.internalError
        }
      }
    } else {
      return responses.notAuthorised
    }
  }
};

export default  makeDeleteArticle;
