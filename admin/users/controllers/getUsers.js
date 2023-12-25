const makeGetUsers = (findAll) => {
  return (getUsers = async (httpRequest) => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const payload = await findAll();
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

module.exports = makeGetUsers
