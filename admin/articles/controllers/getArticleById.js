const jwt = require("../../../modules/jwt");
const makeGetArticleById = (getArticleById) => {
  return (findArticleById = async (httpRequest) => {
    const id = httpRequest.query.id;

    const article = await getArticleById(id);
    return {
      statusCode: 201,
      body: article,
    };
  });
};

module.exports = makeGetArticleById;
