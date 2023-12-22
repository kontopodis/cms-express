
const makeDeleteUser = (userDB)=>{
    return  deleteUser = async (id)=>{
        const db = userDB
        return await db.deleteUserById(id);
    }

}
module.exports = makeDeleteUser