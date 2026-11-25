const makeFindAllArticles = (getAllArticles) => {
  return async function findAllArticles (httpRequest){
    const articles = await getAllArticles()
    articles.map((article)=>{
      console.log(article)
    })
    return {
      statusCode: 201,
      body: articles,
    };
  }
};

export default  makeFindAllArticles;
