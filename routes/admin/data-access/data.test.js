const makeDB = require("./index");
const Id = require("../validators/id");
const { expect, assert } = require("chai");
const userMakeDB = require("./user-db");
const makeUser = require("../user/index");
module.exports = dataTest = () => {
  describe("Database Tests", () => {
    const db = userMakeDB(makeDB);
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
  

    it("Should insert a row", () => {
      const user = makeUser(validUser);
      let result = db.addUser(user);
 
      });
    it("Gives back users", () => {
    let user = makeUser(validUser)
    let userId = user.getId();
    console.log("userid: "+userId)
     let userIndb = db.findById(userId)
     console.log("User in db: "+userIndb)

    });
  });
};
