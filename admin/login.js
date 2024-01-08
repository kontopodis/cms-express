import jwt from "../modules/jwt/index.js"
import bcrypt from "bcrypt"
import userDB from "../admin/users/data-access/index.js"
import userService from "./users/use-cases/index.js"
import responses from "../modules/responses.js"
const login = async (httpRequest) => {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        let emailJS = httpRequest.body.email
        let pass = httpRequest.body.password
   

        if(!emailJS || !pass){
            return responses.badRequest
        }else{
          let emailL = emailJS.toLowerCase()
          let email = emailL.trim()
          let user = await userDB.findByEmail(email)
            if(!user){
                return responses.notAthenticated
            }else{

        
                let match = await bcrypt.compare(pass,user.password)
              
                if(match){
                    let token = jwt.generateToken(user)
                    jwt.insertToken(token,user)
                    let update = {
                      case:"login",
                      id: user.id
                    }

                   await userService.updateUser(update)
             

                    return {
                        headers,
                        statusCode:200,
                        body:{
                            code:200,
                            token:token,
                            message:"Login Successfull"
                        }
                    }
                }else{
                    return responses.notAthenticated
                }
            }
        }



      } catch (payload) {
        // TODO: Error logging
        console.log(payload);
        return responses.internalError
      }
    }

  
export default login
  