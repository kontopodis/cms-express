const makeRemoveUser = (deleteUser) => {
    return (removeUser = async (httpRequest) => {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        const user = await deleteUser(httpRequest.body.id);
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
  
  module.exports = makeRemoveUser
  