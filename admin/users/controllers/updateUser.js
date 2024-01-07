const jwt = require("../../../modules/jwt");
const responses = require("../../../modules/responses")
const makeUpdateUser = (updateUserUC) => {
  return (updateUser = async (httpRequest) => {
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
  });
};

module.exports = makeUpdateUser;
