import jwt from "../../../modules/jwt/index.js"
import responses from "../../../modules/responses.js"
import {updateUser as updateUserUC} from "../use-cases/index.js"
const makeUpdateUser = () => {
  return async function updateUser (httpRequest){
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const email = httpRequest.body.email;
      const setting = httpRequest.body.case;
      const value = httpRequest.body.value;

      const token = httpRequest.headers.token;
      if (setting && value && token) {
        let user = jwt.getTokensUser(token);

        if (
          setting === "toAdmin" ||
          setting === "toModerator" ||
          setting === "toReader"
        ) {
 
          if (user.role === "admin" && email) {
            const updateCase = {
              email: email,
              case: setting,
              value: value,
            };
       
         
         return await updateUserUC(updateCase);
   
          } else {
            return responses.notAuthorised
          }
        } else if (
          setting === "email" ||
          setting === "password" ||
          setting === "username"
        ) {
          const updateCase = {
            id: user.id,
            case: setting,
            value: value,
          };

         return await updateUserUC(updateCase);

        } else {
          return responses.notAuthorised
        }
      } else {
        return responses.badRequest
      }
    } catch (payload) {
      // TODO: Error logging
      console.log(payload);
      return responses.internalError
    }
  }
};

export default makeUpdateUser;
