const jwt = require("../modules/jwt")
const bcrypt = require("bcrypt")
const userDB = require("../admin/users/data-access")
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
console.log(email,pass, user)
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
                console.log("matchung")
                let match = await bcrypt.compare(pass,user.password)
                console.log(match)
                if(match){
                    let token = jwt.generateToken(user)
                    jwt.insertToken(token,user)
                    return {
                        headers,
                        statusCode:200,
                        body:{
                            code:200,
                            token:token,
                            id:user.id,
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
  