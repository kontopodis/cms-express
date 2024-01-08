import responses from "../../../modules/responses.js"
import userDB from "../data-access/index.js"
const makeDeleteUser = ()=>{
    const deleteUser = async (email)=>{
        const res = await userDB.deleteUserByEmail(email)
        if(res.changes === 1){
            return responses.ok
        }else{
            return responses.internalError
        }
    }
    return deleteUser

}
export default makeDeleteUser