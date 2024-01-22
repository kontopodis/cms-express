import { expect } from "chai";
import request from "supertest";
import app from "../server.js";

let token;
let articleToUpdate;
describe("Article tests", () => {
  before(async () => {
    const response = await request(app).post("/admin/login").send({
      password: "1A_qwerty",
      email: "admin@gmail.com",
    });
    token = response.body.token;
  });

  it("Should return 201 when creating an article", async () => {
    const response = await request(app)
      .post("/admin/dashboard/articles")
      .set("token", token)
      .send({
        title: "A title",
        content: "Some Content",
        imageUrl: "some/url/somewhere",
      });
    expect(response.statusCode).to.be.equal(201);

    const allArticlesRes = await request(app).get("/articles");
    const allArticles = allArticlesRes.body;
    expect(allArticles.length).to.be.equal(1);
    articleToUpdate = allArticles[0];
  });
  it("should return 201 when updating an article", async () => {
    articleToUpdate.title = "Updated Article";
    articleToUpdate.content = "Updated Content";
    articleToUpdate.createdOn = ""
    articleToUpdate.lastEditedOn = ""
    const response = await request(app)
      .patch("/admin/dashboard/articles")
      .set("token", token)
      .send(articleToUpdate);
console.log(response.body,articleToUpdate)
    expect(response.statusCode).to.be.equal(201);
  });

  it("should return 201 when deleting an article", async () => {
    const response = await request(app)
      .delete("/admin/dashboard/articles")
      .set("token", token)
      .send({
        id: articleToUpdate.id,
      });

    expect(response.statusCode).to.be.equal(201);
  });
  it("should return 400 when title is not defined", async () => {
    const response = await request(app)
      .post("/admin/dashboard/articles")
      .set("token", token)
      .send({
        content: "Some Content",
        imageUrl: "some/url/somewhere",
      });
    expect(response.statusCode).to.be.equal(400);
  });
  it("should return 400 when content is not defined", async () => {
    const response = await request(app)
      .post("/admin/dashboard/articles")
      .set("token", token)
      .send({
        title: "A title",
        imageUrl: "some/url/somewhere",
      });
    expect(response.statusCode).to.be.equal(400);
  });
  it("should return 400 when image is not defined", async () => {
    const response = await request(app)
      .post("/admin/dashboard/articles")
      .set("token", token)
      .send({
        title: "A title",
        content: "Some Content",
      });
    expect(response.statusCode).to.be.equal(400);
  });
  it(
    "should return 403 when trying to create an article without authentication",async ()=>{
      const response = await request(app)
      .post("/admin/dashboard/articles")
      .send({
        title: "A title",
        content: "Some Content",
        imageUrl:"some/url"
      });
    expect(response.statusCode).to.be.equal(403);
    }
  );
  it(
    "should return 403 when trying to update an article without authentication",async ()=>{
      const response = await request(app)
      .patch("/admin/dashboard/articles")
      .send({
        title: "A title",
        content: "Some Content",
        imageUrl:"some/url"
      });
    expect(response.statusCode).to.be.equal(403);
    }
  );
  it(
    "should return 403 when trying to delete an article without authentication",async ()=>{
      const response = await request(app)
      .delete("/admin/dashboard/articles")
      .send({
        title: "A title",
        content: "Some Content",
        imageUrl:"some/url"
      });
    expect(response.statusCode).to.be.equal(403);
    }
  );
});
