import jwt from "../../../modules/jwt/index.js"
import responses from "../../../modules/responses.js"
import {deleteUser} from "../use-cases/index.js"
const makeRemoveUser = () => {
    return async function removeUser (httpRequest){
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
    }
  };
  
  export default makeRemoveUser
  