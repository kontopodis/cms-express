const jwt = require("../../../modules/jwt");
const makeUpdateUser = (updateUserUC) => {
  return (updateUser = async (httpRequest) => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const id = httpRequest.body.id;
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
          if (user.role === "admin" && id) {
            const updateCase = {
              id: id,
              case: setting,
              value: value,
            };
         
             await updateUserUC(updateCase);
            return {
              headers,
              statusCode: 201,
              message: "Changes Successful",
            };
          } else {
            return {
              headers,
              statusCode: 403,
              message: "You are not authorized for this action",
            };
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
          await updateUserUC(updateCase);
          return {
            headers,
            statusCode: 201,
            message: "Changes Successful",
          };
        } else {
          return {
            headers,
            statusCode: 403,
            message: "You are not authorized for this action",
          };
        }
      } else {
        return {
          headers,
          statusCode: 400,
          message: "Bad Request",
        };
      }
    } catch (payload) {
      // TODO: Error logging
      console.log(payload);
      return {
        headers,
        statusCode: 500,
        body: {
          error: "Internal Error",
        },
      };
    }
  });
};

module.exports = makeUpdateUser;
