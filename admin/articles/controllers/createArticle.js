import jwt from "../../../modules/jwt/index.js"
import responses from "../../../modules/responses.js"
const makeCreateArticle = (addArticle) => {
  return async function createArticle (httpRequest){
    const token = httpRequest.headers.token;
    const user = jwt.getTokensUser(token);
    if (user.role === "admin" || user.role === "moderator") {
      const authorId = user.id;
    
      const title = httpRequest.body.title;
      const content = httpRequest.body.content;
      const imageUrl = httpRequest.body.imageUrl;
      if (authorId && title && content && imageUrl) {
        const article = {
          authorId:authorId,
          title: title,
          content: content,
          imageUrl:imageUrl,
        };

        const res = addArticle(article);
        if (res) {
          return responses.ok
        } else {
          return responses.internalError
        }
      } else {
        return responses.badRequest
      }
    } else {
      return responses.notAuthorised
      };
    }
  }


export default makeCreateArticle;
