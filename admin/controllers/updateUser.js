
const makeUpdateUser = (updateUserUC) => {
    return (updateUser = async (httpRequest) => {
      const headers = {
        "Content-Type": "application/json",
      };
      try {

        const updateCase = {
            id: httpRequest.body.id,
            case: httpRequest.body.case,
            value: httpRequest.body.value
        }
        const user = await updateUserUC(updateCase);
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
  