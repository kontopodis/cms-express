const makeFindUserById = (userDB)=>{
    return  findUserById = async (id)=>{
        const db = userDB
                return await db.findById(id);
    }

}
module.exports = makeFindUserById