const makeArticle = require("../article");

const makeAddArticle = (articleDB) => {
  return (addArticle = async (articleData) => {
    const article = makeArticle(articleData);
    const res = await articleDB.addArticle(article);
    if (res.changes == 1) {
      return true;
    } else {
      return false;
    }
  });
};

module.exports = makeAddArticle;
