import makeUser from "../user/index.js"
import encryptPassword from "../../modules/encrypt.js"
import validators from "../../modules/index.js"
import responses from "../../../modules/responses.js"
const makeAddUser = ({userDB}) => {
 return async function addUser(userInfo){
    const db = userDB;

    if (
      validators.isValidEmail(userInfo.email) &&
      validators.isValidPassword(userInfo.password)
    ) {

      const usrInDB = await db.findByEmail(userInfo.email)

      if(!usrInDB){
        const user = makeUser(userInfo);

        let hash = await encryptPassword(user.getPassword());
        user.setPassword(hash);
        let res = await db.addUser(user);
 
        if (res.changes === 1) {
          return responses.ok
        } else {
          return responses.internalError
        }
      }else{
        
        return responses.userExists
      }

    } else {
      return responses.badRequest
    }
  };
  
};
export default makeAddUser;
