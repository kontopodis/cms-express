const makeUser = require("../user/index")
const makeUpdateUser = (userDB)=>{
    return updateUser = async (userInfo)=>{
        const db = userDB
        let user = makeUser(userInfo)
        let res = await db.updateUserById(user.getId(),user)
    }
}
module.exports = makeUpdateUser