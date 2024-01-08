import makeUser from "../admin/users/user/index.js"
import Id from "../admin/modules/id.js"
import { expect, assert } from "chai"

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

    describe("User Entity Tests",()=>{
        it("These should work",()=>{
           
            const user = makeUser(validUser)
            assert.isOk(user)
            expect(user.getEmail()).to.be.equal("asd@gmail.com")
        })

        it("Password should fail",()=>{
            
            expect(()=>{
                makeUser(invalidUserPassword)
            }).to.throw("User Password is invalid")
        })

    })
