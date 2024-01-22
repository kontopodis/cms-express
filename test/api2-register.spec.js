import { expect } from "chai"
import request from "supertest"
import app from "../server.js"


describe("Register a user", () => {
  it("Gets 400 for invalid password", async () => {
    const response = await request(app).post("/admin/dashboard/users").send({
      username: "manos",
      password: "1trtrt",
      email: "manos123@gmail.com",
    });

    expect(response.status).to.be.equal(400);
  });
  it("Gets 400 for invalid email syntax", async () => {
    const response = await request(app).post("/admin/dashboard/users").send({
      username: "manos",
      password: "1A_dcfddsfvbedfgvb",
      email: "manos123@gmail",
    });

    expect(response.status).to.be.equal(400);
  });
  it("Gets 201 for new user", async () => {
    const response = await request(app).post("/admin/dashboard/users").send({
      username: "manos",
      password: "1A_qwerty",
      email: "manos123@gmail.com",
    });

    expect(response.status).to.be.equal(201);
  });
  
  it("Gets 409 when trying to register a user with an existing email",async ()=>{
    const response = await request(app).post("/admin/dashboard/users").send({
      username: "manos",
      password: "1A_qwerty",
      email: "manos123@gmail.com",
    });

    expect(response.status).to.be.equal(409);
  })
});
