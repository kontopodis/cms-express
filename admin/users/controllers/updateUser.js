
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
        const payload = await updateUserUC(updateCase);
        return {
          headers,
          statusCode: 200,
          body: payload,
        };
      } catch (payload) {
        // TODO: Error logging
        console.log(payload);
        return {
          headers,
          statusCode: 400,
          body: {
            error: payload.message,
          },
        };
      }
    });
  };
  
  module.exports = makeUpdateUser
  