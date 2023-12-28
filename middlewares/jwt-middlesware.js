const jwt = require("../modules/jwt");

const jwtMiddleware = (req, res, next) => {
  console.log("jwtMiddleware");
  let token = req.headers.token;
  let userId = req.headers.id;
console.log(token,userId)
  if (!token || !userId) {
    forbitenResponse(res);
  } else {

    let cachedUser = jwt.getTokensUser(token);
    console.log(cachedUser)
    if (cachedUser) {
      if (cachedUser.id === userId) {
        next();
      } else {
        forbitenResponse(res);
      }
    } else {
      forbitenResponse(res);
    }
  }
};

const forbitenResponse = (res) => {
    const message = {
        code: 403,
        message:"You are not authorized to have access to this route"
    }
  res.type("json");
  res.status(403).send(message);
};
module.exports = jwtMiddleware;
