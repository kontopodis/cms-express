import jwt from "../modules/jwt/index.js"

const jwtMiddleware = (req, res, next) => {

  let token = req.headers.token;

  if (!token) {
    forbitenResponse(res);
  } else {
    let cachedUser = jwt.getTokensUser(token);
 
    let validToken = jwt.verifyToken(token)

    let all = jwt.getAll()
    console.log("keys:",all)

    if (cachedUser && validToken) {
      console.log("All valid for now")
      next();
    } else {
      console.log("Cached User: ",cachedUser)
      console.log("Valid Token: ",validToken)
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
export default jwtMiddleware;
