const makeFindUserByEmail = (userDB)=>{
    return  findUserByEmail = async (id)=>{
        const db = userDB
        return await db.findByEmail(id);
    }

}
module.exports = makeFindUserByEmail