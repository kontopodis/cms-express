const userDB = require("./index");
const Id = require("../../modules/id");
const { expect, assert } = require("chai");
const userMakeDB = require("./user-db");
const makeUser = require("../user/index");
module.exports = dataTest = () => {
  describe("Database Tests", () => {
    after("Cleaning up", async () => {
      const db = userDB

      let allUsers = await db.findAll();
      if(allUsers.length > 0){
        for(i=0;i<allUsers.length;i++){
          await db.deleteUserById(allUsers[i].id);
        }
      }
      let noneUser = await db.findAll()
      expect(noneUser).to.be.a("array");
      expect(noneUser.length).to.be.equal(0);
    });
    const validUser = {
      id: Id.createId().toString(),
      username: "manos",
      password: "1_aAhsbx2",
      createdOn: Date.now().toString(),
      role: "admin",
      salt: "active",
      email: "asd@gmail.com",
      lastLogin: Date.now().toString(),
    };

    //same id
    let sameIdUser = {
      id: validUser.id,
      username: "maria",
      password: "1_aAhsbx2",
      createdOn: Date.now().toString(),
      role: "moderator",
      salt: "active",
      email: "artu@gmail.com",
      lastLogin: Date.now().toString(),
    };
    //same email
    let sameEmailUser = {
      id: Id.createId().toString(),
      username: "nikos",
      password: "1_aAhsbx2",
      createdOn: Date.now().toString(),
      role: "moderator",
      salt: "active",
      email: "asd@gmail.com",
      lastLogin: Date.now().toString(),
    };

    it("Inserts a user ", async () => {
      const db = userDB
      const user = makeUser(validUser);
      const id = user.getId();
      expect(id).to.be.equal(validUser.id);
      let result = await db.addUser(user);
      let userInDB = await db.findById(id);
      expect(await userInDB.id).to.be.equal(id);
      expect(result).to.be.a("object");
    });

    it("Gives back users", async () => {
      const db = userDB
      let users = await db.findAll();
      expect(users.length).to.above(0);
      expect(users).to.be.ok;
      expect(users).to.be.a("array");
    });

    it("Gives back a user by id", async () => {
      const db = userDB
      let user = await db.findById(validUser.id);
      expect(user).to.be.ok;
      expect(user).to.be.a("object");
      expect(user.id).to.be.equal(validUser.id);
    });

    it("Gives back a user by email", async () => {
      const db = userDB
      let user = await db.findByEmail(validUser.email);

      expect(user).to.be.ok;
      expect(user).to.be.a("object");
      expect(user.id).to.be.equal(validUser.id);
    });

    it("Updates a user",async ()=>{
      const db = userDB
      let user = makeUser(validUser)
      user.changeRoleToReader()
      let res = await db.updateUserById(user)
      expect(res).to.be.a("object")
    })
    it("Should delete a user by id", async () => {
      const db = userDB
     const res = await db.deleteUserById(validUser.id);
     expect(res.changes).to.be.equal(1)
    });


  });
};
