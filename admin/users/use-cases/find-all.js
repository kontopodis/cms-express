import userDB from "../data-access/index.js";
const makeFindAll = ()=>{
    const findAll = async ()=>{
        const db = userDB
        return await db.findAll();
    }
    return findAll

}
export default makeFindAll