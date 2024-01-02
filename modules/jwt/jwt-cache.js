const userCache = require("../cache/user-cache");
const insertToken = (token, user) => {
  return userCache.set(token, user);
};
const deleteToken = (token) => {
  return userCache.del(token);
};

const getTokensUser = (token) => {
  return userCache.get(token);
};

const flushAll = ()=>{
  userCache.flushAll()
}

module.exports = { insertToken, deleteToken, getTokensUser,flushAll };
