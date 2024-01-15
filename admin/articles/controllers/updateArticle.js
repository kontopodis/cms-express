import jwt from "../../../modules/jwt/index.js"
import responses from "../../../modules/responses.js"
const makeUpdateArticle = (updateArticleUC) => {
  return async function updateArticle (httpRequest){
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

         
        return await updateArticleUC(article);
        
      } else {
        return responses.badRequest
      }
    } else {
      return responses.notAuthorised
    }
  }
};

export default  makeUpdateArticle;
