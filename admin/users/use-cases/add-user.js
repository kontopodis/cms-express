const makeUser = require("../user");
const encryptPassword = require("../../modules/encrypt");
const validators = require("../../modules/index");
const responses = require("../../../modules/responses")
const makeAddUser = (userDB) => {
  return (addUser = async (userInfo) => {
    const db = userDB;

    if (
      validators.isValidEmail(userInfo.email) &&
      validators.isValidPassword(userInfo.password)
    ) {

      const usrInDB = await db.findByEmail(userInfo.email)

      if(!usrInDB){
        const user = makeUser(userInfo);

        let hash = await encryptPassword(user.getPassword());
        user.setPassword(hash);
        let res = await db.addUser(user);
 
        if (res.changes === 1) {
          return responses.ok
        } else {
          return responses.internalError
        }
      }else{
        
        return responses.userExists
      }

    } else {
      return responses.badRequest
    }
  });
};
module.exports = makeAddUser;
