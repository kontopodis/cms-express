const makeUser = require("../user/index")
const makeDeleteUser = (userDB)=>{
    return  deleteUser = async (userInfo)=>{
        const db = userDB
        const user = makeUser(userInfo);
        return await db.deleteUserById(user.getId());
    }

}
module.exports = makeDeleteUser