var passwordValidator = require('password-validator');

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digits
.has().symbols(1)                               // Must have a symbol
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

const isValid = (password) =>{
    
    if (schema.validate(password)){ 
        return true
        
    }else{
        return false
    }
    

}

const Pass = Object.freeze({
    isValid : (password)=> isValid(password),
    hash : ()=>{log("function Pass.hash TODO","blue")}
})

module.exports = Pass;