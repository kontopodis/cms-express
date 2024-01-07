const jwt = require("../../../modules/jwt")
const responses = require("../../../modules/responses")
const makeRemoveUser = (deleteUser) => {
    return (removeUser = async (httpRequest) => {
      const headers = {
        "Content-Type": "application/json",
      };
   
      const token = httpRequest.headers.token
      const user = jwt.getTokensUser(token)
      if(!token || !user || !httpRequest.body.email){
        return responses.badRequest
      }else  if(user.role === "admin"){
       
        try {
  
          return await deleteUser(httpRequest.body.email)
    
        } catch (error) {
          console.log(error);
    
          return responses.internalError
        }
      }else{

        return responses.notAuthorised
      }
    });
  };
  
  module.exports = makeRemoveUser
  