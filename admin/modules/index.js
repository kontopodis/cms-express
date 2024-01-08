import Id from "./id.js"
import Pass from "./password.js"
import Email from "./email.js"


const modules = Object.freeze({
    isValidId: (id)=>Id.isValid(id),
    isValidEmail:(email)=> Email(email),
    isValidPassword:(password)=>Pass.isValid(password),
    createId: ()=> Id.createId()
})

export default modules