const makeFindAllArticles = (getAllArticles) => {
  return async function findAllArticles (httpRequest){
    const articles = await getAllArticles()
    return {
      statusCode: 201,
      body: articles,
    };
  }
};

export default  makeFindAllArticles;
