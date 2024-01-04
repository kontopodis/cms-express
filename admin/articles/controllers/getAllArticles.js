const jwt = require("../../../modules/jwt");
const makeFindAllArticles = (getAllArticles) => {
  return (findAllArticles = async (httpRequest) => {
    const articles = await getAllArticles()
    return {
      statusCode: 201,
      body: articles,
    };
  });
};

module.exports = makeFindAllArticles;
