const makeUser = require("../user/index");
const makeUpdateUser = (userDB) => {
  return (updateUser = async (update) => {
    const db = userDB;

    if (update.case === "username") {
      let dbUser = await db.findById(update.id);
      let oldUser = makeUser(dbUser);
      oldUser.setUsername(update.value);
      let newUser = makeUser(oldUser.toObject());
      let res = await db.updateUserById(newUser);
      if (res.changes === 1) {
        return "Changes completed";
      } else {
        return res;
      }
    }
    if (update.case === "password") {
      let dbUser = await db.findById(update.id);
      let oldUser = makeUser(dbUser);
      oldUser.setPassword(update.value);

      let newUser = makeUser(oldUser.toObject());
      let res = await db.updateUserById(newUser);
      if (res.changes === 1) {
        return "Changes completed";
      } else {
        return res;
      }
    }
    if (update.case === "email") {
      let dbUser = await db.findById(update.id);
      let oldUser = makeUser(dbUser);
      oldUser.setEmail(update.value);

      let newUser = makeUser(oldUser.toObject());
      let res = await db.updateUserById(newUser);
      if (res.changes === 1) {
        return "Changes completed";
      } else {
        return res;
      }
    }
    if (update.case === "toAdmin"){
        let dbUser = await db.findById(update.id)
        let oldUser = makeUser(dbUser)
        oldUser.changeRoleToAdmin()
        let newUser = makeUser(oldUser.toObject())
        let res = await db.updateUserById(newUser)
        if(res.changes === 1){
            return "Changes completed"
        }else{
            return res
        }
    }
    if (update.case === "toModerator"){
        let dbUser = await db.findById(update.id)
        let oldUser = makeUser(dbUser)
        oldUser.changeRoleToModerator()
        let newUser = makeUser(oldUser.toObject())
        let res = await db.updateUserById(newUser)
        if(res.changes === 1){
            return "Changes completed"
        }else{
            return res
        }
    }
    if (update.case === "toReader"){
        let dbUser = await db.findById(update.id)
        let oldUser = makeUser(dbUser)
        oldUser.changeRoleToReader()
        let newUser = makeUser(oldUser.toObject())
        let res = await db.updateUserById(newUser)
        if(res.changes === 1){
            return "Changes completed"
        }else{
            return res
        }
    }
    if (update.case === "login"){
        let dbUser = await db.findById(update.id)
        let oldUser = makeUser(dbUser)
        oldUser.setLastLogin(Date.now())
        let newUser = makeUser(oldUser.toObject())
        let res = await db.updateUserById(newUser)
        if(res.changes === 1){
            return "Changes completed"
        }else{
            return res
        }
    }
  });
};
module.exports = makeUpdateUser;
