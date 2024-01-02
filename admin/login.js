const jwt = require("../modules/jwt")
const bcrypt = require("bcrypt")
const userDB = require("../admin/users/data-access")
const userService = require("./users/use-cases/")
const login = async (httpRequest) => {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        let emailJS = httpRequest.body.email
        let pass = httpRequest.body.password
        let emailL = emailJS.toLowerCase()
        let email = emailL.trim()
        let user = await userDB.findByEmail(email)

        if(!email || !pass){
            return {
                headers,
                statusCode: 400,
                body: {
                    code: 400,
                    message:"Bad Request"},
              };
        }else{
            if(!user){
                return {
                    headers,
                    statusCode: 401,
                    body: {
                        code: 401,
                        message:"Invalid Email or Password"},
                  };
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
                    return {
                        headers,
                        statusCode: 401,
                        body: {
                            code: 401,
                            message:"Invalid Email or Password"},
                      };
                }
            }
        }



      } catch (payload) {
        // TODO: Error logging
        console.log(payload);
        return {
          headers,
          statusCode: 400,
          body: {
            error: payload.message,
          },
        };
      }
    }

  
  module.exports = login
  