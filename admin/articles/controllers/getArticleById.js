import responses from "../../../modules/responses.js"
const makeGetArticleById = (getArticleById) => {
  return async function findArticleById(httpRequest){
    const id = httpRequest.query.id;

    var article = await getArticleById(id);

    if(!article){
      return responses.badRequest
    }else{
      
      return {
        statusCode: 201,
        body: article,
      };
    }
 
  }
};

export default  makeGetArticleById;
