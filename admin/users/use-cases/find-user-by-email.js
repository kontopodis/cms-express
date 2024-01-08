import userDB from "../data-access/index.js";
const makeFindUserByEmail = ()=>{
    return async function findByEmail (id){
        const user =  await userDB.findByEmail(id);
        return {
            statusCode:200,
            body: await user
        }
    }

}
export default makeFindUserByEmail