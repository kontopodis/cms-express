const makeUser = require("../user")
const encryptPassword = require("../validators/encrypt")
const makeAddUser = (userDB)=>{
    return  addUser = async (userInfo)=>{

        const db = userDB
        const user = makeUser(userInfo);

        let hash = await encryptPassword(user.getPassword())
        user.setPassword(hash)
        let res = await db.addUser(user)
        if(res.posted){
            console.log(res)
            return true
        }else{
            console.log(res)
            return false
        }
    }

}
module.exports = makeAddUser