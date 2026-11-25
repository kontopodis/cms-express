import jwt from "../../../modules/jwt/index.js"
import responses from "../../../modules/responses.js"
import modules from "../../modules/index.js"
import {findAll , findById ,findByRole} from "../use-cases/index.js"
const makeGetUsers = () => {
  return async function getUsers (httpRequest){
    const token = httpRequest.headers.token
    const user = jwt.getTokensUser(token)
    console.log(user)
    if(user.role === "admin"){
     
      try {

        const payload = await findAll();
        var withHiddenData = [];
        payload.forEach(element => {
          element.password = "HasBeenRemoved"
          

          withHiddenData.push(element)
        });
        return {
          statusCode: 200,
          body: withHiddenData,
        };
      } catch (payload) {
        // TODO: Error logging
        console.log(payload);
        return responses.internalError
      }
    } else if (user.role === "moderator") 
      {
      try {
        
        const payload = await findByRole("reader");

          payload.password = "HasBeenRemoved"
  
        return {
          statusCode: 200,
          body: [payload],
        };
      } catch (payload) {
        // TODO: Error logging
        console.log(payload);
        return responses.internalError
      }
    }
    else if (user.role === "reader") 
      {
      try {
        
        const payload = await findById(user.id);

          payload.password = "HasBeenRemoved"
  
        return {
          statusCode: 200,
          body: [payload],
        };
      } catch (payload) {
        // TODO: Error logging
        console.log(payload);
        return responses.internalError
      }
    }
    else {
      return responses.notAuthorised
    }


  }
};

export default makeGetUsers
