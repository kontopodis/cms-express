const jwt = require("../../../modules/jwt");

const makeGetArticleById = (getArticleById) => {
  return (findArticleById = async (httpRequest) => {
    const id = httpRequest.query.id;

    var article = await getArticleById(id);
    article.authorId = "HasBeenRemoved"

  
    return {
      statusCode: 201,
      body: article,
    };
  });
};

module.exports = makeGetArticleById;
