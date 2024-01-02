const Id = require("./id")
const Pass = require("./password")
const Email = require("./email")


const modules = Object.freeze({
    isValidId: (id)=>Id.isValid(id),
    isValidEmail:(email)=> Email(email),
    isValidPassword:(password)=>Pass.isValid(password),
    createId: ()=> Id.createId()
})

module.exports = modules