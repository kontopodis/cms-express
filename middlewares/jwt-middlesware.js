const jwt = require("../modules/jwt");

const jwtMiddleware = (req, res, next) => {
  let token = req.headers.token;


  if (!token) {
    forbitenResponse(res);
  } else {
    let cachedUser = jwt.getTokensUser(token);
 
    let validToken = jwt.verifyToken(token)
    if (cachedUser && validToken) {
      next();
    } else {
      forbitenResponse(res);
    }
  }
};

const forbitenResponse = (res) => {
  const message = {
    code: 403,
    message: "You are not authorized to have access to this route",
  };
  res.type("json");
  res.status(403).send(message);
};
module.exports = jwtMiddleware;
