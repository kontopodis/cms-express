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
      console.log(result)
 
      });
    it("Gives back users", () => {
     let user = db.findById(validUser.id)
     console.log(user)
    });
  });
};
