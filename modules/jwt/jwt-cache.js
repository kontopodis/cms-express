import userCache from "../cache/user-cache.js"
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

export { insertToken, deleteToken, getTokensUser,flushAll };
