const jwt = require("../../../modules/jwt");
const responses = require("../../../modules/responses")
const makeGetUsers = (findAll) => {
  return (getUsers = async (httpRequest) => {
    const token = httpRequest.headers.token
    const user = jwt.getTokensUser(token)
    
    if(user.role === "admin"){
     
      try {

        const payload = await findAll();
        var withHiddenData = [];
        payload.forEach(element => {
          element.password = "HasBeenRemoved"
          element.id = "HasBeenRemoved"

          withHiddenData.push(element)
        });
        return {
          statusCode: 200,
          body: withHiddenData,
        };
      } catch (payload) {
        // TODO: Error logging
        console.log(payload);
        return responses.internalError
      }
    }else{
      return responses.notAuthorised
    }


  });
};

module.exports = makeGetUsers
