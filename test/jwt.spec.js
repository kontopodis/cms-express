import { expect, assert } from "chai"
import makeUser from "../admin/users/user/index.js"
import Id from "../admin/modules/id.js"
import jwt from "../modules/jwt/index.js"
import userCache from "../modules/cache/user-cache.js"

  let validUser = {
    id: Id.createId(),
    username: "manos",
    password: "1_aAhsbx2",
    createdOn: Date.now(),
    role: "admin",
    salt: "active",
    email: "asd@gmail.com",
    lastLogin: Date.now(),
  };

  let user = makeUser(validUser);
  describe("JWT Tests", () => {
    before("preparing cache",()=>{
      jwt.flushAll()
    })
    let globalToken = "Invalid Token";
    it("Creates a token", () => {
      let token = jwt.generateToken(user);
      expect(token).to.be.a("string");
      expect(token.length).to.be.above(10);
    });
    it("Validates a token", () => {
      let token = jwt.generateToken(user);
      let validation = jwt.verifyToken(token);
      expect(validation.success).to.be.true;
    });
    it("Inserts a token to cache", () => {
      let token = jwt.generateToken(user);
      let success = jwt.insertToken(token, user);
      globalToken = token;
      expect(success).to.be.true;
      let obj = userCache.getStats();
      expect(obj.keys).to.be.equal(1);
    });

    it("Gets a User from cache", () => {
      const jwtUser = jwt.getTokensUser(globalToken);
      expect(jwtUser).to.be.a("object");
      let obj = userCache.getStats();
      expect(obj.keys).to.be.equal(1);
    });
    it("Deletes a User from cache", () => {
      const res = jwt.deleteToken(globalToken);
      expect(res).to.be.equal(1);
      let obj = userCache.getStats();
      expect(obj.keys).to.be.equal(0);
    });
    it("Cache should be empty", () => {
      let obj = userCache.getStats();
      expect(obj.keys).to.be.equal(0);
    });
  });

