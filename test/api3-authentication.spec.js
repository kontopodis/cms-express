import { expect } from "chai";
import request from "supertest";
import app from "../server.js";
import userService from "../admin/users/use-cases/index.js";

let token;
let adminToken;
const admin = {
  username: "admin",
  password: "1A_qwerty",
  email: "admin@gmail.com",
};
describe("Authenticate a user", () => {
  before(async () => {
    // create admin
    try {
      const admRes = await userService.addUser(admin);

      const mail = admin.email;

      const adminUser = await userService.findByEmail(mail);

      const setting = {
        
        case: "toAdmin",
        email: await adminUser.body.email,
      };
      await userService.updateUser(setting);
      // login the admin
      const responseAdmin = await request(app).post("/admin/login").send({
        password: "1A_qwerty",
        email: "admin@gmail.com",
      });

      expect(responseAdmin.status).to.be.equal(200);
      
      adminToken = responseAdmin.body.token;
    } catch (err) {
      console.log(err);
    }
  });
  it("Gets 200 for new login", async () => {
    try{
    const response = await request(app).post("/admin/login").send({
      password: "1A_qwerty",
      email: "manos123@gmail.com",
    });

    expect(response.status).to.be.equal(200);
    token = response.body.token;
  }catch(err){
    console.log(err)
  }
  });

  it("Gets 201 when user updates his email", async () => {
    const response = await request(app)
      .patch("/admin/dashboard/users")
      .set("token", token)
      .send({
        case: "email",
        value: "manos@gmail.com",
      });

    expect(response.status).to.be.equal(201);
  });
  it("Gets 201 when user updates his password", async () => {
    const response = await request(app)
      .patch("/admin/dashboard/users")
      .set("token", token)
      .send({
        case: "password",
        value: "1A_qwerty",
      });

    expect(response.status).to.be.equal(201);
  });
  it("Gets 201 when user updates his username", async () => {
    const response = await request(app)
      .patch("/admin/dashboard/users")
      .set("token", token)
      .send({
        case: "username",
        value: "kontopodis",
      });

    expect(response.status).to.be.equal(201);
  });

  it("Gets 201 when trying to change toAdmin", async () => {

    const user = await userService.findByEmail("manos@gmail.com");

    const response = await request(app)
      .patch("/admin/dashboard/users")
      .set("token", adminToken)
      .send({
        email: user.body.email,
        case: "toAdmin",
        value: "admin",
      });

    expect(response.status).to.be.equal(201);


});

  it("Gets 201 when an admin trying to change toModerator", async () => {
    const user = await userService.findByEmail("manos@gmail.com");

    const response = await request(app)
      .patch("/admin/dashboard/users")
      .set("token", adminToken)
      .send({
        email: user.body.email,
        case: "toModerator",
        value: "moderator",
      });

    expect(response.status).to.be.equal(201);
    const user2 = await userService.findByEmail("manos@gmail.com");

    expect(user2.body.role).to.be.equal("moderator");
  });

  it("Gets 201 when an admin trying to get all users", async () => {
    const user = await userService.findByEmail("manos@gmail.com");
    const response = await request(app)
      .get("/admin/dashboard/users")
      .set("token", adminToken);

    expect(response.status).to.be.equal(200);
  });
  it("Gets 401 for invalid password", async () => {
    const response = await request(app).post("/admin/login").send({
      email: "manos123@gmail.com",
      password: "1trtrt",
    });

    expect(response.status).to.be.equal(401);
  });
  it("Gets 401 for invalid email syntax", async () => {
    const response = await request(app).post("/admin/login").send({
      email: "manos123@gmail.com",
      password: "1A#dcfddsfvbedfgvb",
    });

    expect(response.status).to.be.equal(401);
  });
  it("Gets 400 for not providing email", async () => {
    const response = await request(app).post("/admin/login").send({
      password: "1A#dcfddsfvbedfgvb",
    });

    expect(response.status).to.be.equal(400);
  });
  it("Gets 400 for not providing password", async () => {
    const response = await request(app).post("/admin/login").send({
      email: "manos123@gmail.com",
    });

    expect(response.status).to.be.equal(400);
  });
  it("Gets 403 when a reader is trying to change toAdmin", async () => {
    const user = await userService.findByEmail("manos@gmail.com");
    const response = await request(app)
      .patch("/admin/dashboard/users")
      .set("token", token)
      .send({
        id: user.id,
        case: "toAdmin",
        value: "admin",
      });

    expect(response.status).to.be.equal(403);
  });

  it("Gets 403 when its not admin to get all users", async () => {
    const response = await request(app)
      .get("/admin/dashboard/users")
      .set("token", token);

    expect(response.status).to.be.equal(403);
  });
  it("Gets 403 when its not admin to delete a user", async () => {
    const response = await request(app)
      .delete("/admin/dashboard/users")
      .set("token", token)
      .send({ email: "aergesargesargergaewrg" });

    expect(response.status).to.be.equal(403);
  });
});
