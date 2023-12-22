
const makeUpdateUser = (updateUserUC) => {
    return (updateUser = async (httpRequest) => {
      const headers = {
        "Content-Type": "application/json",
      };
      try {

        const tempUser = {
            id : httpRequest.body.id,
            username : httpRequest.body.username,
            password : httpRequest.body.password,
            email : httpRequest.body.email
        }
        const user = await updateUserUC(tempUser);
        return {
          headers,
          statusCode: 200,
          body: user,
        };
      } catch (e) {
        // TODO: Error logging
        console.log(e);
        return {
          headers,
          statusCode: 400,
          body: {
            error: e.message,
          },
        };
      }
    });
  };
  
  module.exports = makeUpdateUser
  