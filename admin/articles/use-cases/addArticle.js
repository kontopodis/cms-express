import makeArticle from "../article/index.js"

const makeAddArticle = (articleDB) => {
  const addArticle = async (articleData) => {
    const article = makeArticle(articleData);
    const res = await articleDB.addArticle(article);
    if (res.changes == 1) {
      return true;
    } else {
      return false;
    }
  }
  return addArticle
};

export default makeAddArticle;
