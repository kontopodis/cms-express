const makeUser = require("../user/index");
const responses = require("../../../modules/responses")
const modules = require("../../modules")
const encryptPassword = require("../../modules/encrypt")
const makeUpdateUser = (userDB) => {
  return (updateUser = async (update) => {
    const db = userDB;

    if (update.case === "username") {
      let dbUser = await db.findById(update.id);
      let user = makeUser(dbUser);
      user.setUsername(update.value);
      let res = await db.updateUserById(user);
      if (res.changes === 1) {
        return responses.ok
      } else {
        return responses.internalError
      }
    }
    if (update.case === "password") {
      let dbUser = await db.findById(update.id);
      let user = makeUser(dbUser);
      
      if(modules.isValidPassword(update.value)){
        const hash = await encryptPassword(update.value)
        user.setPassword(hash);
        
        let res = await db.updateUserById(user);
        if (res.changes === 1) {
          return responses.ok
        } else {
          return responses.internalError
        }
      }else{
        return responses.badRequest
      }


    }
    if (update.case === "email") {
      let dbUser = await db.findById(update.id);
      let user = makeUser(dbUser);
      user.setEmail(update.value);
      let res = await db.updateUserById(user);
      if (res.changes === 1) {
        return responses.ok
      } else {
        return responses.internalError
      }
    }
    if (update.case === "toAdmin"){
        let dbUser = await db.findByEmail(update.email)
  
        let user = makeUser(dbUser)
        user.changeRoleToAdmin()
        
        let res = await db.updateUserById(user)
        if(res.changes === 1){
            return responses.ok
        }else{
            return responses.internalError
        }
    }
    if (update.case === "toModerator"){
        let dbUser = await db.findByEmail(update.email)

        let user = makeUser(dbUser)
        user.changeRoleToModerator()

        let res = await db.updateUserById(user)
        if(res.changes === 1){
            return responses.ok
        }else{
            return responses.internalError
        }
    }
    if (update.case === "toReader"){
        let dbUser = await db.findByEmail(update.email)
        let user = makeUser(dbUser)
        user.changeRoleToReader()
        
        let res = await db.updateUserById(user)
        if(res.changes === 1){
            return responses.ok
        }else{
            return responses.internalError
        }
    }
    if (update.case === "login"){

        let dbUser = await db.findById(update.id)
        let user = makeUser(dbUser)
        const now = new Date().toLocaleString('en-GB', {
          hour12: false,
        });
        user.setLastLogin(now)
        
        let res = await db.updateUserById(user)

        if(res.changes === 1){
            return responses.ok
        }else{
            return responses.internalError
        }
    }
  });
};
module.exports = makeUpdateUser;
