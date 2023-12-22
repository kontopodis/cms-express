const makeGetUsers = (findAll) => {
  return (getUsers = async (httpRequest) => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const users = await findAll();
      return {
        headers,
        statusCode: 200,
        body: users,
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

module.exports = makeGetUsers
