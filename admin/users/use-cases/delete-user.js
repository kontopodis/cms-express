const responses = require("../../../modules/responses")
const makeDeleteUser = (userDB)=>{
    return  deleteUser = async (email)=>{
        const db = userDB
        const res = await db.deleteUserByEmail(email)
        if(res.changes === 1){
            return responses.ok
        }else{
            return responses.internalError
        }
    }

}
module.exports = makeDeleteUser