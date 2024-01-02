const jwt = require("../../../modules/jwt")
const makeRemoveUser = (deleteUser) => {
    return (removeUser = async (httpRequest) => {
      const headers = {
        "Content-Type": "application/json",
      };
   
      const token = httpRequest.headers.token
      const user = jwt.getTokensUser(token)
  
      if(user.role === "admin"){
       
        try {
  
          const payload = await deleteUser(httpRequest.body.id)
          return {
            headers,
            statusCode: 200,
            body: payload,
          };
        } catch (payload) {
          // TODO: Error logging
          console.log(payload);
          return {
            headers,
            statusCode: 400,
            body: {
              error: payload.message,
            },
          };
        }
      }else{

        return {
          headers,
          statusCode:403,
          message: "You are not authorized for that action"
        }
      }
    });
  };
  
  module.exports = makeRemoveUser
  