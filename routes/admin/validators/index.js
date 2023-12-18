const Id = require("./id")
const Pass = require("./password")
const Email = require("./email")

const validators = Object.freeze({
    isValidId: (id)=>Id.isValid(id),
    isValidEmail:(email)=> Email(email),
    isValidPassword:(password)=>Pass.isValid(password)

})

module.exports = validators