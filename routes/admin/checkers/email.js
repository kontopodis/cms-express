var validator = require("email-validator");
module.exports= (email)=>{
    return validator.validate(email)
}
