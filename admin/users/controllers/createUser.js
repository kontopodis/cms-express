const jwt = require("../../../modules/jwt");
const responses = require("../../../modules/responses")
const makeCreateUser = (addUser) => {
  return (createUser = async (httpRequest) => {
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
      return responses.internalError
    }
  });
};

module.exports = makeCreateUser;
