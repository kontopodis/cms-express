import jwt from "../../../modules/jwt/index.js"
import responses from "../../../modules/responses.js"
import {findAll} from "../use-cases/index.js"
const makeGetUsers = () => {
  return async function getUsers (httpRequest){
    const token = httpRequest.headers.token
    const user = jwt.getTokensUser(token)
    
    if(user.role === "admin"){
     
      try {

        const payload = await findAll();
        var withHiddenData = [];
        payload.forEach(element => {
          element.password = "HasBeenRemoved"
          element.id = "HasBeenRemoved"

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
    }else{
      return responses.notAuthorised
    }


  }
};

export default makeGetUsers
