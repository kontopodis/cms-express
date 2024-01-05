const jwt = require("../../../modules/jwt");
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
        let added = await addUser(user);

        if (added) {
          return {
            statusCode: 201,
            body: {
              message: "OK",
            },
          };
        } else {
          return {
            statusCode: 400,
            body: {
              message: "Bad Request",
            },
          };
        }
      } else {  

        return {
          statusCode: 500,
          body: {
            message: "Bad Request",
          },
        };
      }
    } catch (payload) {
      // TODO: Error logging
      console.log(payload);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: payload.code,
        body: {
          error: payload.message,
        },
      };
    }
  });
};

module.exports = makeCreateUser;
