const {generateAccessToken,verifyAccessToken} = require("./jwt")
  
  const jwt = Object.freeze({
    generateToken: (user)=> generateAccessToken(user),
    verifyToken: (user)=> verifyAccessToken(user),
  })

  module.exports = jwt