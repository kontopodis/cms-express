import responses from "../../../modules/responses.js"
import { addUser} from "../use-cases/index.js";
const makeCreateUser = () => {
  return async function createUser (httpRequest) {
    try {
      const username = httpRequest.body.username;
      const password = httpRequest.body.password;
      const email = httpRequest.body.email;
      if (username && password && email) {
        const user = {
          username:username,
          password:password,
          email: email
        }
        return await addUser(user);

      } else {  

        return responses.notAuthorised
      }
    } catch (error) {
      console.log(error)
      return responses.internalError
    }
  }
};

export default makeCreateUser;
