import { generateAccessToken, verifyAccessToken } from "./jwt.js"
import { insertToken, deleteToken, getTokensUser,flushAll } from "./jwt-cache.js"
const jwt = Object.freeze({
  generateToken: (user) => generateAccessToken(user),
  verifyToken: (user) => verifyAccessToken(user),
  insertToken: (token, user) => insertToken(token, user),
  deleteToken: (token) => deleteToken(token),
  getTokensUser: (token) => getTokensUser(token),
  flushAll: ()=> flushAll()
});

export default jwt
