const userDB = require("./index");
const Id = require("../validators/id");
const { expect, assert } = require("chai");
const userMakeDB = require("./user-db");
const makeUser = require("../user/index");
module.exports = dataTest = () => {
  describe("Database Tests", () => {
    const validUser = {
      id: Id.createId().toString(),
      username: "manos",
      password: "1_aAhsbx2",
      createdOn: Date.now().toString(),
      role: "admin",
      currentStatus: "active",
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
      currentStatus: "active",
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
      currentStatus: "active",
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

    it("Doesn't insert a user with the same id", async () => {
      const db = userDB

      let user2 = makeUser(sameIdUser);
      // user1 had been inserted in previous test
      let result = await db.addUser(user2);
      expect(result).to.be.equal("User Exists");
    });

    it("Doesn't insert a user with the same email", async () => {
      const db = userDB
      let user2 = makeUser(sameEmailUser);
      // user1 had been inserted in previous test
      let result = await db.addUser(user2);
      expect(result).to.be.equal("User Exists");
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
      let res = await db.updateUserById(user.getId(),user)
      expect(res).to.be.a("object")
    })
    it("Should delete a user by id", async () => {
      const db = userDB

      db.deleteUserById(validUser.id);
    });

    it("Cleaning up", async () => {
      const db = userDB
      let allUsers = await db.findAll();
      
      expect(allUsers).to.be.a("array");
      expect(allUsers.length).to.be.equal(0);
    });
  });
};
