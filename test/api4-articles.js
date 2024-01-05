const {expect} = require("chai")
const request = require("supertest");
const app = require("../server");

let token;
describe("Article tests",()=>{
    before(async ()=>{
        const response = await request(app).post("/admin/login").send({
            password: "1A_qwerty",
            email: "admin@gmail.com",
          });
          token = response.body.token;

    })

    it("Should create an article",async ()=>{
        const response = await request(app).post("/admin/dashboard/articles")
        .set("token", token)
        .send({
            title:"A title",
            content:"Some Content",
            imageUrl:"some/url/somewhere"
          });
expect(response.statusCode).to.be.equal(201)
    })
})
