const makeUser = require("../user")
const makeAddUser = (userDB)=>{
    return  addUser = async (userInfo)=>{

        const db = userDB
        const user = makeUser(userInfo);
        let res = await db.addUser(user)
        if(res.posted){
            return "Register completed"
        }else{
            return res
        }
    }

}
module.exports = makeAddUser