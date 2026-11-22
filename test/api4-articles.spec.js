import { expect } from "chai";
import request from "supertest";
import {app} from "../server.js";
import articleService from "../admin/articles/use-cases/index.js"
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

  after("clean up",async ()=>{
            const articles = await articleService.getAllArticles()
            articles.map((article)=>{
                articleService.deleteArticle(article.id)
            })
        })

  it("Should return 201 when creating an article", async () => {
    const response = await request(app)
      .post("/admin/article")
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
      .patch("/admin/article")
      .set("token", token)
      .send(articleToUpdate);

    expect(response.statusCode).to.be.equal(201);
  });

  it("should return 201 when deleting an article", async () => {
    const response = await request(app)
      .delete("/admin/article")
      .set("token", token)
      .send({
        id: articleToUpdate.id,
      });

    expect(response.statusCode).to.be.equal(201);
  });
  it("should return 400 when title is not defined", async () => {
    const response = await request(app)
      .post("/admin/article")
      .set("token", token)
      .send({
        content: "Some Content",
        imageUrl: "some/url/somewhere",
      });
    expect(response.statusCode).to.be.equal(400);
  });
  it("should return 400 when content is not defined", async () => {
    const response = await request(app)
      .post("/admin/article")
      .set("token", token)
      .send({
        title: "A title",
        imageUrl: "some/url/somewhere",
      });
    expect(response.statusCode).to.be.equal(400);
  });
  it("should return 400 when image is not defined", async () => {
    const response = await request(app)
      .post("/admin/article")
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
      .post("/admin/article")
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
      .patch("/admin/article")
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
      .delete("/admin/article")
      .send({
        title: "A title",
        content: "Some Content",
        imageUrl:"some/url"
      });
    expect(response.statusCode).to.be.equal(403);
    }
  );
  it(
    "Should create 3 articles", async()=>{
      const response1 = await request(app)
      .post("/admin/article")
      .set("token", token)
      .send({
        title: "A title1",
        content: "Some Content",
        imageUrl: "some/url/somewhere",
      });
    expect(response1.statusCode).to.be.equal(201);

          const response2 = await request(app)
      .post("/admin/article")
      .set("token", token)
      .send({
        title: "A title2",
        content: "Some Content",
        imageUrl: "some/url/somewhere",
      });
    expect(response2.statusCode).to.be.equal(201);

          const response3 = await request(app)
      .post("/admin/article")
      .set("token", token)
      .send({
        title: "A title3",
        content: "Some Content",
        imageUrl: "some/url/somewhere",
      });
    expect(response3.statusCode).to.be.equal(201);

    const allArticlesRes = await request(app).get("/articles");
    const allArticles = await allArticlesRes.body;
    expect(allArticles.length).to.be.equal(3);
    }
  )
    it(
    "Should update 3 articles", async()=>{
      const allArticlesRes = await request(app).get("/articles");

      allArticlesRes.body.map(async (article)=>{
            const response = await request(app)
      .patch("/admin/article")
      .set("token", token)
      .send(
        article.title =  "Updated title"
      );
    expect(response.statusCode).to.be.equal(201);
      })


    }
  )
});
