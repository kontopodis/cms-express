const { generateAccessToken, verifyAccessToken } = require("./jwt");
const { insertToken, deleteToken, getTokensUser,flushAll } = require("./jwt-cache");
const jwt = Object.freeze({
  generateToken: (user) => generateAccessToken(user),
  verifyToken: (user) => verifyAccessToken(user),
  insertToken: (token, user) => insertToken(token, user),
  deleteToken: (token) => deleteToken(token),
  getTokensUser: (token) => getTokensUser(token),
  flushAll: ()=> flushAll()
});

module.exports = jwt;
