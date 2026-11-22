import {userCache} from "../../server.js"
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

const getAll = ()=>{
  return userCache.keys()
}

const cleanup = ()=>{
  userCache.cleanup()
}

export { insertToken, deleteToken, getTokensUser,flushAll,getAll };
