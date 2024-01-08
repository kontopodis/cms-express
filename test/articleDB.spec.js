import articleDB from "../admin/articles/data-access/index.js"
import {expect} from "chai"
import modules from "../admin/modules/index.js"
import makeArticle from "../admin/articles/article/index.js"
const validArticle={
    id:modules.createId(),
    authorId:modules.createId(),
    title:"Sample title",
    content:"Sample Content",
    imageUrl:"sample/url",

}
const invalidArticle={
    id:modules.createId(),
    authorId:modules.createId(),
    title: false,
    content:"Sample Content",
    imageUrl:"sample/url",

}

describe("Articles Database Tests",()=>{
    after(async ()=>{
        const articles = await articleDB.findAll()
        for (let i=0;i<articles.length;i++){
            await articleDB.deleteArticle(articles[i].id)
        } 
        const ar = await articleDB.findAll()
        expect(ar).to.be.empty
    })
    it("should insert an article",async ()=>{
 
        const article = makeArticle(validArticle)
        const res = await articleDB.addArticle(article)
        expect(res.changes).to.be.equal(1)
    })
    it("Should get all articles",async ()=>{
        const res = await articleDB.findAll()
       expect(res).to.be.a("array")
    })
    it("Should get an article by id",async ()=>{
        const res = await articleDB.findById(validArticle.id)
       expect(res).to.be.a("object")
       expect(res.id).to.be.equal(validArticle.id)
    })
    it("Should update an article",async ()=>{
const article = makeArticle(validArticle)
article.setLastEditedOn()
article.setContent("Updated content")
        const res = await articleDB.updateArticle(article)
        expect(res.changes).to.be.equal(1)
        const updatedArticle = await articleDB.findById(article.getId())
        expect(updatedArticle.content).to.be.equal("Updated content")
    })
    it("Should delete an article ",async ()=>{
        const res = await articleDB.deleteArticle(validArticle.id)
        expect(res.changes).to.be.equal(1)
    })
})


