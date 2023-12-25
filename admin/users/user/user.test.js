const buildMakeUser = require("./user");
const Pass = require("../validators/password");
const Id = require("../validators/id");
const Email = require("../validators/email")
const validators = require("../validators/index")
var { expect, assert } = require("chai");

const validUser={
    id : Id.createId(),
    username:"manos",
    password:"1_aAhsbx2",
    createdOn : Date.now(),
    role:"admin",
    salt:"active",
    email:"asd@gmail.com",
    lastLogin : Date.now(),
}

const invalidUserPassword={
    id : Id.createId(),
    username:"manos",
    password:"1234",
    createdOn : Date.now(),
    role:"admin",
    salt:"active",
    email:"asd@gmail.com",
    lastLogin : Date.now(),
}

module.exports = ()=>{
    describe("User Entity Tests",()=>{
        const makeUser = buildMakeUser({validators})
        it("These should work",()=>{
           
            const user = makeUser(validUser)
            assert.isOk(user)
            expect(user.getEmail()).to.be.equal("asd@gmail.com")
        })

        it("Password should fail",()=>{
            expect(()=>{
                let invaliduser = makeUser(invalidUserPassword)
            }).to.throw("User Password is invalid")
        })

    })
}