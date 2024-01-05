const makeUser = require("../user");
const encryptPassword = require("../../modules/encrypt");
const validators = require("../../modules/index");
const makeAddUser = (userDB) => {
  return (addUser = async (userInfo) => {
    const db = userDB;

    if (
      validators.isValidEmail(userInfo.email) &&
      validators.isValidPassword(userInfo.password)
    ) {
      const user = makeUser(userInfo);

      let hash = await encryptPassword(user.getPassword());
      user.setPassword(hash);
      let res = await db.addUser(user);

      if (res.changes === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  });
};
module.exports = makeAddUser;
