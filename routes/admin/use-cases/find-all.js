const makeFindAll = ({userDB})=>{
    return  findAll = async ()=>{
        const db = userDB
        return await db.findAll();
    }

}
module.exports = makeFindAll