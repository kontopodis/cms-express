const makeUser = require("../user")
const makeAddUser = (userDB)=>{
    return  addUser = async (userInfo)=>{

        const db = userDB
        const user = makeUser(userInfo);
        return await db.addUser(user)
    }

}
module.exports = makeAddUser