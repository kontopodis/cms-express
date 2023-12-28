const jwt = require("../../../modules/jwt")
const makeCreateUser = (addUser) => {
  return (createUser = async (httpRequest) => {
    var payload = {
      code: 204,
      message : ""

    }
    try {
      const { source = {}, ...userInfo } = httpRequest.body;
      source.token = httpRequest.token
      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["User-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referrer = httpRequest.headers["Referer"];
      }

          // todo has to check if the userid is admin
          let added = await addUser(userInfo);
          if (added){
            payload.code = 201
            payload.message = "OK"
          }else{
            payload.code = 400
            payload.message = "Bad Request"
          }      
      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date(payload.modifiedOn).toUTCString(),
        },
        statusCode: payload.code,
        body: { posted: payload },
      };
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
